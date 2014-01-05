var TaskPeriod = {
	ONCE : 0,
	DAILY : 1,
	WORKDAY : 2,
	WEEKLY : 3,
	MONTHLY : 4,
	YEARLY : 5
};
TaskPeriod.toString = function(value) {
	for (var key in TaskPeriod) {
		if (value == TaskPeriod[key])
			return key;
	}
	return "Go to DMC!";
};


TaskPeriod.fotEach = function(callBack) {
	for (var key in TaskPeriod) {
		if (TaskPeriod[key] <= 5 && TaskPeriod[key] >= 0)
			callBack(key);
	}
};

var mode = "sweet";
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

///
// Task type Function
///
var task_list = new Array();
// Task Type List
getTasktype(task_list);

function getTasktype(task_list) {
	var request = indexedDB.open("db_type", 3);
	request.onerror = function(event) {
		alert("connect to database db_type has a wrong!");
	};
	request.onsuccess = function(event) {
		var db = request.result;
		if (db.objectStoreNames.length > 0) {
			var objectStore = db.transaction("task_type").objectStore("task_type");
			objectStore.openCursor().onsuccess = function(event) {
				var cursor = event.target.result;
				if (cursor) {
					task_list.push(cursor.value);
					cursor.
					continue();
				}
			};
		} else {
			task_list.push("吃飯");
			task_list.push("睡覺");
			task_list.push("上課");
			db.close();
			indexedDB.deleteDatabase("db_type");
			new_db();
		}
	};
	return task_list;
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

	/*request.onsuccess = function(event){
	 var db = request.result;
	 var objectStore = db.transaction("task_type").objectStore("task_type");

	 objectStore.openCursor().onsuccess = function(event){
	 var cursor = event.target.result;
	 if (cursor){
	 var option = document.createElement('option');
	 option.text = cursor.value;
	 option.value = cursor.value;

	 select_type.appendChild(option);
	 cursor.continue();
	 }
	 };
	 };*/
}

function createCptIndexDb() 
{
	var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
	var db;
	var name = "cpt_tasks";
	var _this = this;
	this.DB;
	this.OnDbReaady = function(_db) {
	};
	if (!indexedDB)
		alert("cpt indexedDB not support!");

	var request = indexedDB.open(name, 1);
	request.onsuccess = function(evt) {// 將db暫存起來供以後操作
		db = request.result;
		_this.DB=db;
		console.log("cpt IndexedDB success");
		_this.OnDbReaady(_this);
	};

	request.onerror = function(evt) {
		console.log("cpt IndexedDB error: " + evt.target.errorCode);
	};

	request.onupgradeneeded = function(evt) {
		var objectStore = evt.currentTarget.result.createObjectStore("cpt_tasks", {
			keyPath : "Id",
			autoIncrement : true
		});

		objectStore.createIndex("StartTime", "StartTime", {
			unique : false
		});
		objectStore.createIndex("During", "During", {
			unique : false
		});
		objectStore.createIndex("Type", "Type", {
			unique : false
		});
		objectStore.createIndex("lastTime", "lastTime", {
			unique : false
		});
		objectStore.createIndex("result", "result", {
			unique : false
		});
		console.log("cpt onupgradeneeded");
	};

	this.Add = function(task) {
		var transaction = db.transaction(name, "readwrite");
		var objectStore = transaction.objectStore("cpt_tasks");
		var request = objectStore.add(task);
		request.onsuccess = function(evt) {
			console.log("add:" + task);
		};
		return request;
	};
	this.AddArray = function(_array) {
		var transaction = db.transaction(name, "readwrite");
		var objectStore = transaction.objectStore("cpt_tasks");
		var request = null;
		_array.forEach(function(entry) {
			request = objectStore.add(entry);
		});
		return request;
	};
	this.AllTask = function() {
		var transaction = db.transaction(name, "readwrite");
		var objectStore = transaction.objectStore("cpt_tasks");
		var _tasks = [];
		var _this = this;
		objectStore.openCursor().onsuccess = function(event) {
			var cursor = event.target.result;
			if (cursor) {
				_tasks.push(cursor.value);
				cursor.continue();
			} else {
				console.log("GetAllTask all");
				_this.OnAllTasksGot(_tasks);
				//alert("Got all customers: " + tasks);
			}
		};
		this.OnAllTasksGot = function(tasks) {
		};
		return this;
	};
	return this;
}
