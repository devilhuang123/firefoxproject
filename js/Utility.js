//tasks and cptTasks Elements are all start in Upper Case
//tasks = { Id, StartTime, TargetTime, Type, Period, Exclude }		
//cptTask =	{Id, StartTime, TargetTime, Type, LastTime, Result } 

var mode; //Task Mode
var tasks = new Array();
var cptTasks = new Array();
var orderId = 0;
var cptId = 0;
var taskTypes = new Array();
var typeId = 0;
var isLogin = new Boolean();
initType();
//changeMode("sweet");	//remove recommend -- JoeyC

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
function addTaskOrder(startTime, targetTime, type, period)
{
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
function addTaskExclude(taskOrderId, ExDate)
{
	//add exclude date into task.Exclude
	var excludeDate = new Array();
	excludeDate[excludeDate.length] = ExDate;
	tasks[taskOrderId].Exclude = excludeDate;
}

/* Input: string/int
 * Output: task
 */
function getTask(taskId)
{
	return tasks[parseInt(taskId)];
}

function deleteTask(taskId)
{
	tasks[parseInt(taskId)] = null;
}


/*=========================
 * Task Completed
 =========================*/

//when the end of a task(whaever success or fail), add a task complete record
function addTaskCpt(startTime, targetTime, type, lastTime, result)
{	
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

function getCptTask(id)
{
	return cptTask[id];
}

function deleteAllCptTask()
{
	//here should go to database to delete all completed task data
	cptTasks = null;
	var cptTasks = new Array();
}


//area remove recommend -- JoeyC

/*=========================
 * Task Type
 =========================*/

/*
function initType()
{
	typeId = 0;
	addTaskType("用功讀書","study");
	addTaskType("早點睡覺","sleep");
	addTaskType("努力運動","exercise");
}

function addTaskType(name, value)
{	
	var tastType = 
	{
		Name: name,
		Value: value
	};
	taskTypes[typeId] = tastType;
	typeId = typeId + 1;	
}

function deleteTaskType(value)
{
	for(var i=0; i<taskTypes.length; i++)
	{
		if(taskTypes[i].Value == value)
		{
			taskTypes[i] = null;
		}
	}
}

function getAllType()
{
	return taskTypes;
}
*/
///
// area remove recommend end -- JoeyC
///


///
// Task type Function
///
function getOption(select_type){
	xmlhttp = new XMLHttpRequest();

	xmlhttp.open("GET", "./task_type.xml", false);
	xmlhttp.send();

	doc = xmlhttp.responseXML;

	var nodelist = doc.getElementsByTagName("type");
	//var select_type = document.getElementById('select_type');
	for(var i=0;i<nodelist.length;i++){
		var option = document.createElement('option');

		option.text = nodelist[i].childNodes[0].nodeValue;
		option.value = nodelist[i].childNodes[0].nodeValue;
		
		select_type.appendChild(option);
	}
}
///
// Task Type Function End
///

/////Remove recommend -- JoeyC
/*=========================
 * Mode
 =========================*/
/*
function changeMode(Mode)
{
	this.mode = Mode;
}

function getMode()
{
	return this.mode;	
}
*/