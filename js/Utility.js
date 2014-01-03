var TaskPeriod = {
	ONCE : 0,
	DAILY : 1,
	WORKDAY : 2,
	WEEKLY : 3,
	MONTHLY : 4,
	YEARLY : 5
};
TaskPeriod.toString = function(value) {
	for (var i in TaskPeriod) {
		if (value == TaskPeriod[i])
			return i;
	}
	return "Go to DMC!";
};

var mode = "strict";
//Task Mode
var tasks = new Array();
var orderId = 0;

var cptTasks = new Array();
var cptId = 0;

function addTaskOrder(startTime, targetTime, type, period) {
	var task = {
		Id : parseInt(orderId),
		StartTime : startTime,
		TargetTime : targetTime,
		Type : type,
		Period : period,
		Exclude : null
	};

	tasks[orderId] = task;
	alert("成功加入\nid = " + tasks[orderId].Id + ",\nstartTime = " + tasks[orderId].StartTime.getTime() + ",\ntargetTime = " + tasks[orderId].TargetTime + ",\ntype = " + tasks[orderId].Type);

	return orderId;

	var nextId = parseInt(orderId) + 1;
	orderId = nextId;
}

//add the exclusion date of the periodically task 立即任務
function addTaskExclude(taskOrderId, ExDate) {

	//add exclude date into task.Exclude
	var excludeDate = new Array();
	excludeDate[excludeDate.length] = ExDate;
	tasks[taskOrderId].Exclude = excludeDate;
}

/* Input: string/int
 * Output: task
 */
function getTask(taskId) {
	return tasks[parseInt(taskId)];
}

function deleteTask(taskId) {

	tasks[parseInt(taskId)] = null;
}

/*=========================
* Task Completed
=========================*/
//此function傳入參數只需要傳task跟result不就好了
//when the end of a task(whaever success or fail), add a task complete record

function addTaskCpt(startTime, targetTime, type, lastTime, result) {
	var cptTask = {
		Id : parseInt(cptId),
		StartTime : startTime,
		TargetTime : targetTime,
		Type : type,
		LastTime : lastTime,
		Result : result
	};
	cptTasks[cptId] = cptTask;
	alert("成功加入\nid:" + cptTasks[cptId].Id + ",\nStart:" + cptTasks[cptId].StartTime + ",\nTarget:" + cptTasks[cptId].TargetTime + ",\ntype:" + cptTasks[cptId].Type + ",\nlastTime:" + cptTasks[cptId].LastTime + ",\nresult:" + cptTasks[cptId].Result);

	return cptId;

	var nextId = parseInt(cptId) + 1;
	cptId = nextId;
}

function getCptTask(id) {
	return cptTask[id];
}

function deleteAllCptTask() {
	//here should go to database to delete all completed task data
	cptTasks = null;
	var cptTasks = new Array();
}

/*=========================
 * Task Type
 =========================*/

function initType() {
	typeId = 0;
	addTaskType("用功讀書", "study");
	addTaskType("早點睡覺", "sleep");
	addTaskType("努力運動", "exercise");
}

function addTaskType(name, value) {
	var tastType = {
		Name : name,
		Value : value
	};
	taskTypes[typeId] = tastType;
	typeId = typeId + 1;
}

function deleteTaskType(value) {
	for (var i = 0; i < taskTypes.length; i++) {
		if (taskTypes[i].Value == value) {
			taskTypes[i] = null;
		}
	}
}

///
// Task type Function
///	
function getOption(select_type){
	var request = indexedDB.open("db_type", 3);
	request.onerror = function(event) {
		alert("connect to database db_type has a wrong!");
	};
	request.onsuccess = function(event) {
		var db = request.result;
		if(db.objectStoreNames.length > 0){
			var objectStore = db.transaction("task_type").objectStore("task_type");
			objectStore.openCursor().onsuccess = function(event){
				var cursor = event.target.result;
				if(cursor){
					var option = document.createElement('option');
					option.text = cursor.value;
					option.value = cursor.value;
		
					select_type.appendChild(option);
					cursor.continue();
				}else{
					//alert("got all customers: " + type_list);
				}
			};
		} else {
			db.close();
			indexedDB.deleteDatabase("db_type");
			new_db(select_type);
		}
	};
}

function new_db() {
	var request = indexedDB.open("db_type", 3);

	request.onerror = function(event) {
		alert("connect to database db_type has a wrong!");
	};

	request.onupgradeneeded = function(event) {
		const type_list = [{
			name : "吃飯"
		}, {
			name : "睡覺"
		}, {
			name : "上課"
		}];
		var db = event.target.result;
		var objectStore = db.createObjectStore("task_type", {
			autoIncrement : true
		});

		for (var i in type_list) {
			objectStore.add(type_list[i].name);

		}
	};

	request.onsuccess = function(event) {
		var db = request.result;
		var objectStore = db.transaction("task_type").objectStore("task_type");

		objectStore.openCursor().onsuccess = function(event) {
			var cursor = event.target.result;
			if (cursor) {
				var option = document.createElement('option');
				option.text = cursor.value;
				option.value = cursor.value;
		
				select_type.appendChild(option);
				cursor.continue();
			}/*else{
>>>>>>> origin/setting
				alert("No more entries!");
			}*/
		};
	};
}

