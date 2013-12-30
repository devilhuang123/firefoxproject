//tasks and cptTasks Elements are all start in Upper Case
//tasks = { Id, StartTime, TargetTime, Type, Period, Exclude }
//cptTask =	{Id, StartTime, TargetTime, Type, LastTime, Result }

var mode = "sweet"; //Task Mode

var tasks = new Array();
var orderId = 0;

var cptTasks = new Array();
var cptId = 0;

/*=========================
 * Task Order
 *=========================/

/* addTaskOrder:
 * 		action that user request for add new task, return this order task Id
 * 
 * Input:
 * startTime:Date(), 
 * targetTime:int/string(seconds), 
 * type:string (Excercise, Study, Sleep, etc...)
 * period:string (ONCE, DAILY, WORKDAY, WEEKLY, MONTHLY, YEARLY)
 * 
 * Output:
 * this new order task Id
 * 
 * Content:
 * Id:
 * Exclude:Array of Date() that won't obey this task's period rule
 * */

function addTaskOrder(startTime, targetTime, type, period){
	var task = 
	{
		Id : parseInt(orderId),
		StartTime : startTime,
		TargetTime : targetTime,
		Type : type,
		Period : period,
		Exclude : null		
	};
	
	tasks[orderId] = task;
	alert("成功加入\nid = "+tasks[orderId].Id + ",\nstartTime = " + tasks[orderId].StartTime.getTime() + ",\ntargetTime = " + tasks[orderId].TargetTime + ",\ntype = " +  tasks[orderId].Type);
	
	return orderId;
	
	var nextId = parseInt(orderId) + 1;
	orderId = nextId;
}

//add the exclusion date of the periodically task
function addTaskExclude(taskOrderId, ExDate){
	//add exclude date into task.Exclude
	var excludeDate = new Array();
	excludeDate[excludeDate.length] = ExDate;
	tasks[taskOrderId].Exclude = excludeDate;
}

/* Input: string/int
 * Output: task
 */
function getTask(taskId){
	return tasks[parseInt(taskId)];
}

function deleteTask(taskId){
	tasks[parseInt(taskId)] = null;
}


/*=========================
 * Task Completed
 =========================*/

//when the end of a task(whaever success or fail), add a task complete record
function addTaskCpt(startTime, targetTime, type, lastTime, result){	
	var cptTask = 
	{
		Id : parseInt(cptId),
		StartTime : startTime,
		TargetTime : targetTime,
		Type : type,
		LastTime : lastTime,
		Result : result 
	};
	cptTasks[cptId] = cptTask;
	alert("成功加入\nid:"+cptTasks[cptId].Id+",\nStart:"+cptTasks[cptId].StartTime+",\nTarget:"+cptTasks[cptId].TargetTime+",\ntype:"+cptTasks[cptId].Type+",\nlastTime:"+cptTasks[cptId].LastTime+",\nresult:"+cptTasks[cptId].Result);
	
	return cptId;
	
	var nextId = parseInt(cptId) + 1;
	cptId = nextId;
}

function getCptTask(id){
	return cptTask[id];
}

function deleteAllCptTask(){
	//here should go to database to delete all completed task data
	cptTasks = null;
	var cptTasks = new Array();
}

///
// Task type Function
///	
function getOption(select_type){
	/*for(var i=0;i<3;i++){
		var option = document.createElement('option');

		option.text = "1";//nodelist[i].childNodes[0].nodeValue;
		option.value = "1";//nodelist[i].childNodes[0].nodeValue;
		
		select_type.appendChild(option);
	}*/
	var type_list = [];
	var request = indexedDB.open("db_type", 3);
	request.onerror = function(event) {
		alert("connect to database db_type has a wrong!");
	};
	request.onsuccess = function(event) {
		var db = request.result;
		if(db.objectStoreNames.length > 0){
			var objectStore = db.transaction("type").objectStore("type");
			objectStore.openCursor().onsuccess = function(event){
				var cursor = event.target.result;
				if(cursor){
					type_list.push(cursor.value);
					cursor.continue();
				}else{
					alert("got all customers: " + type_list);
				}
			};		
		}else{
			db.close();
			indexedDB.deleteDatabase("db_type");
			new_db();
		}
	};
}

function new_db(){
	var request = indexedDB.open("db_type", 3);
	
	request.onerror = function(event){
		alert("connect to database db_type has a wrong!");
	};
	
	request.onupgradeneeded = function(event){
		const type_list = [{name:"吃飯"}, {name:"睡覺"}, {name:"上課"}];
		var db = event.target.result;
		var objectStore = db.createObjectStore("task_type", {autoIncrement : true});

		for (var i in type_list) {
			objectStore.add(type_list[i].name);
		}
	};
	
	request.onsuccess = function(event){
		var db = request.result;
		var objectStore = db.transaction("task_type").objectStore("task_type");

		objectStore.openCursor().onsuccess = function(event) {
			var cursor = event.target.result;
			if (cursor) {
				alert("Name for id " + cursor.key + " is " + cursor.value);
				cursor.continue();
			}else{
				alert("No more entries!");
			}
		};
	};
}
///
// Task Type Function End
///


	/*var sdcard = navigator.getDeviceStorage("sdcard");
	var request = sdcard.get("task_type.xml");
	var fname;
	request.onsuccess = function () {
		fname = this.result.name;
		alert("File "+fname+" successfully retrieved from the sdcard storage area");
		alert("test" + this.result.name);
		xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", this.result.name, false);
		xmlhttp.send();
		
		doc = xmlhttp.responseXML;

	var nodelist = doc.getElementsByTagName("type");
	
	for(var i=0;i<nodelist.length;i++){
		var option = document.createElement('option');

		option.text = nodelist[i].childNodes[0].nodeValue;
		option.value = nodelist[i].childNodes[0].nodeValue;
		
		select_type.appendChild(option);
	}
		
	}
	request.onerror = function () {
		alert("Unable to get the file: "+this.error);
	}*/
	
	//xmlhttp = new XMLHttpRequest();
	//xmlhttp.open("GET", file.mozFullPath, false);
	//xmlhttp.send();

	/*doc = xmlhttp.responseXML;

	var nodelist = doc.getElementsByTagName("type");
	//var select_type = document.getElementById('select_type');
	for(var i=0;i<nodelist.length;i++){
		var option = document.createElement('option');

		option.text = nodelist[i].childNodes[0].nodeValue;
		option.value = nodelist[i].childNodes[0].nodeValue;
		
		select_type.appendChild(option);
	}*/

