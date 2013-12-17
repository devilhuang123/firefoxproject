

//tasks and cptTasks Elements are all start in Upper Case
//tasks = { Id, StartTime, TargetTime, Type, Period, Exclude }		
//cptTask =	{Id, StartTime, TargetTime, Type, LastTime, Result } 
var tasks = new Array();
var cptTasks = new Array();
var orderId;
var cptId;
var taskTypes = new Array();

window.onload = function()
{
	//initial variable here
	orderId = 0;
	cptId = 0;
}

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
	var newId = parseInt(orderId) + 1;
	orderId = newId;
	
	var task = 
	{
		Id : newId,
		StartTime : startTime,
		TargetTime : targetTime,
		Type : type,
		Period : period,
		Exclude : null		
	};
	
	tasks[newId] = task;
	alert("id = "+tasks[newId].Id + ",\nstartTime = " + tasks[newId].StartTime.getTime() + ",\ntargetTime = " + tasks[newId].TargetTime + ",\ntype = " +  tasks[newId].Type);
	
	return newId;
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
	tasks[taskId] = null;
}


/*=========================
 * Task Completed
 =========================*/

//when the end of a task(whaever success or fail), add a task complete record
function addTaskCpt(startTime, targetTime, type, lastTime, result)
{
	var newId = parseInt(cptId) + 1;
	cptId = newId;
	
	var cptTask = 
	{
		Id : newId,
		StartTime : startTime,
		TargetTime : targetTime,
		Type : type,
		LastTime : lastTime,
		Result : result 
	};
	
	
	cptTasks[newId] = cptTask;
	alert("id:"+cptTasks[newId].Id+",\nStart:"+cptTasks[newId].StartTime+",\nTarget:"+cptTasks[newId].TargetTime+",\ntype:"+cptTasks[newId].Type+",\nlastTime:"+cptTasks[newId].LastTime+",\nresult:"+cptTasks[newId].Result);
	
	return newId;
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



/*=========================
 * Task Type
 =========================*/


/*=========================
 * Mode
 =========================*/







