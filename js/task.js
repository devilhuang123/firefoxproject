var remainSnd = 0;
var isRunning = new Boolean();
//not used now
isRunning = false;
var countdownMeter;
var successFeedback = new Array();
var failFeedback = new Array();
var preNotify = 1000 * 60;
//the time before the task to notify user
var runningTask = {
	StartTime : null,
	TargetTime : 0,
	Type : null
};

///////////get the submit event, use in alarm
var btnTest;
var btnDeleteTest;

/*================
 Task Page
 =================*/

var cptTasksDemo = 
[
	{
		StartTime : 111,
		TargetTime : 60,
		Type : "sleep",
		LastTime : 55,
		Result : "fail"
	}
];

function changeTaskPage(tblName) {
	document.getElementById("divRunTask").style.display = "none";
	document.getElementById("tblUnstart").style.display = "none";
	document.getElementById("divTaskResult").style.display = "none";

	document.getElementById(tblName).style.display = "";
}

function tas_init() {

	document.getElementById("tblUnstart").style.display = "";
	
	var lstHours = document.getElementById("lstHour");
	var lstMins = document.getElementById("lstMins");

	var lstTaskType = document.getElementById("lstTaskType");

	///////////////////////////////////////////////////	
	btnTest = document.getElementById("btnTest");
	btnTest.addEventListener('click', setAlarm, false);
	
	btnDeleteTest = document.getElementById("btnDelete");
	btnDeleteTest.addEventListener('click', deleteAlarm, false);
	///////////////////////////////////////////////////
	
	
	if(lstHours.options.length == 0)
	{
		for (var i = 0; i < 24; i++) {
			lstHours.add(new Option(i, i));
		}
	}

	if(lstMins.options.length == 0)
	{
		for (var i = 0; i < 60; i++) {
			lstMins.add(new Option(i, i));
		}
	}
	

	for(var i=lstTaskType.options.length-1; i>=0; i--)
	{
		lstTaskType.options[i].remove();
	}
	for (var i = 0; i < task_list.length; i++) 
	{
		if(task_list[i] != "undefine")
			lstTaskType.add(new Option(task_list[i], task_list[i]));			
	}

}

function initImdTask() {
	var hours = document.getElementById("lstHour").value;
	var mins = document.getElementById("lstMins").value;

	//validate
	if (parseInt(hours) === 0 && parseInt(mins) === 0) {
		alert("任務時長不可為0時0分!");
	} else if (parseInt(hours) !== 0 || parseInt(mins) !== 0) {
		//successfully add a new task and start running it!

		var nowMode = mode;
		switch(nowMode) {
			case "sweet":

				break;

			case "strict":
				//do not show quit button
				document.getElementById("btnQuit").style.display = "none";
				break;

			default:
				console.log("!");
				break;

		}

		addTaskOrder(new Date(), (parseInt(hours) * 3600 + parseInt(mins) * 60), document.getElementById("lstTaskType").value, "ONCE");
		setRunningTask(new Date(), (parseInt(hours) * 3600 + parseInt(mins) * 60), document.getElementById("lstTaskType").value);
		changeTaskPage("divRunTask");
		countdown();

	} else {
		console.log("!");
	}
}

function setRunningTask(startTime, targetTime, type) {
	runningTask.StartTime = startTime;
	runningTask.TargetTime = targetTime;
	runningTask.Type = type;

	remainSnd = parseInt(targetTime);

	bottomVisibility("none");
	document.getElementById("divCntDnd").style.display = "";
	//alert("任務開始時間：" + now.getTime() + "\n任務類型：" + type + "\n持續時長：" + targetTime);
}

//immediate task or preordered task info is stored in the runningTask object in this .js
function countdown() {
	var rmdHour = Math.floor(remainSnd / 3600);
	var rmdMin = Math.floor((remainSnd - rmdHour * 3600) / 60);
	var rmdSnd = remainSnd % 60;

	if (rmdHour < 10) {
		rmdHour = "0" + rmdHour;
	}
	if (rmdMin < 10) {
		rmdMin = "0" + rmdMin;
	}
	if (rmdSnd < 10) {
		rmdSnd = "0" + rmdSnd;
	}

	document.getElementById("divCntDnd").innerHTML = "<br><br><br>" + rmdHour + " : " + rmdMin + " : " + rmdSnd;
	

	if (!isRunning) {
		isRunning = true;
		countdown();
	} else if (remainSnd != 0 && isRunning) {
		remainSnd--;
		countdownMeter = setTimeout('countdown()', 1000);
		//do it once 1 sec
	} else if (remainSnd == 0 && isRunning)//success!
	{
		endTask(runningTask.TargetTime, "SUCCESS");
	} else {
		console.log("countdown Error");
	}
}

function quitTask() {
	if (confirm("確定要放棄任務嗎?在堅持一下吧!")) {
		var lastTime = parseInt(runningTask.TargetTime) - remainSnd;
		endTask(lastTime, "FAIL");
	} else {
	}//do nothing
}

function endTask(lastTime, result) {
	isRunning = false;
	remainSnd == 0;
	clearTimeout(countdownMeter);

	
	changeTaskPage("divTaskResult");

	//add task complete data into database
	addTaskCpt(runningTask.StartTime, runningTask.TargetTime, runningTask.Type, lastTime, result);

	//print result
	document.getElementById("cpltRateDiv").innerHTML = "任務完成率:" + (parseInt((parseInt(lastTime) / parseInt(runningTask.TargetTime)) * 100,10)/100) * 100 + "%";
	if (result == "SUCCESS")
	{
		document.getElementById("returnBtn").style.display = "";
		document.getElementById("taskCmdDiv").innerHTML = "幹的好!你真是人生勝利組!";
	}
	else if (result == "FAIL")
	{
		if(mode == "strict")
			document.getElementById("returnBtn").style.display = "none";
		document.getElementById("taskCmdDiv").innerHTML = "加把勁啊！";
	}
	else
		console.log("End task false!");

	changeTaskPage("divTaskResult");
}

//use in index.html
function taskReturn() {
	//bottomVisibility("");
	changeTaskPage("tblUnstart");
	bottomVisibility("");

}

function poFB() {
	alert("發文到FB!");
	do_post();
	bottomVisibility("");
	changeTaskPage("tblUnstart");
}

function bottomVisibility(visibility) {
	document.getElementById("panel1").style.display = visibility;
	document.getElementById("panel2").style.display = visibility;
	document.getElementById("panel3").style.display = visibility;
	document.getElementById("panel4").style.display = visibility;

}

