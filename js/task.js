//var mode = "sweet";	//Must remove -- JoeyC
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
var
taskForm;

/*================
 Task Page
 =================*/

function changeTaskPage(tblName) {
	document.getElementById("tblRunTask").style.display = "none";
	document.getElementById("tblUnstart").style.display = "none";
	document.getElementById("tblTaskResult").style.display = "none";

	document.getElementById(tblName).style.display = "";
}

function tas_init() {

	changeTaskPage("tblUnstart");

	var lstHours = document.getElementById("lstHour");
	var lstMins = document.getElementById("lstMins");

	var lstTaskType = document.getElementById("lstTaskType");

	///////////////////////////////////////////////////
	taskForm = document.getElementById("frmImdTask");
	taskForm.addEventListener('submit', setAlarm, false);
	///////////////////////////////////////////////////

	for (var i = 0; i < 24; i++) {
		lstHours.add(new Option(i, i));
	}

	for (var i = 0; i < 60; i++) {
		lstMins.add(new Option(i, i));
	}

	var types = getAllType();
	for (var i = 0; i < types.length; i++) {
		////////////////////////////////////
		if (types[i] != "undefine")
			lstTaskType.add(new Option(types[i].Name, types[i].Value));
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

		var nowMode = getNowMode();
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
		changeTaskPage("tblRunTask");
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

	document.getElementById("divCntDnd").innerHTML = rmdHour + " : " + rmdMin + " : " + rmdSnd;

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

	changeTaskPage("tblTaskResult");

	//add task complete data into database
	addTaskCpt(runningTask.StartTime, runningTask.TargetTime, runningTask.Type, lastTime, result);

	//print result
	document.getElementById("cpltRateDiv").innerHTML = "任務完成率:" + (parseInt(lastTime) / parseInt(runningTask.TargetTime)) * 100 + "%";
	if (result == "SUCCESS")
		document.getElementById("taskCmdDiv").innerHTML = "幹的好!你真是人生勝利組!";
	else if (result == "FAIL")
		document.getElementById("taskCmdDiv").innerHTML = "加把勁啊！";
	else
		console.log("End task false!");

	changeTaskPage("tblTaskResult");
}

//use in index.html
function taskReturn() {
	bottomVisibility("");
	changeTaskPage("tblUnstart");

}

function poFB() {
	alert("發文到FB!");
	bottomVisibility("");
	changeTaskPage("tblUnstart");

}

function bottomVisibility(visibility) {
	document.getElementById("panel1").style.display = visibility;
	document.getElementById("panel3").style.display = visibility;
	document.getElementById("panel4").style.display = visibility;

}

/*================
 Alarm
 =================*/

function setAlarm(e) {
	// prevent default - we don't want the form to submit in the conventional way
	e.preventDefault();

	//here we get any information we want to put into the alarm data for what we have to do after alarm ring! ex.during->for how long the task is
	/*
	 * taskType: sleep, study...
	 * alarmType: "notify", "start"
	 * period: ONCE, DAILY...
	 * during
	 *  */
	var now = new Date();
	var alarmTypeStr = "";
	//////////////////Here get the alarm time from the input data in task page, date is today
	var h = document.getElementById("h");
	var m = document.getElementById("m");
	var Period = document.getElementById("m").value;
	var testAlarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h.value, m.value, 0);
	var testTargetTime = 20;
	//sec
	var testTaskType = "sleep";
	/////////////////////////////////

	if (navigator.mozAlarms) {
		//if the time set alarm is within 10 mins, we won't set the notify alarm. Only the start alarm will be set.
		if (testAlarmTime.getTime() - now.getTime() > preNotify) {
			alarmTypeStr = "notify";
			testAlarmTime.setTime(testAlarmTime.getTime() - preNotify);
		} else
			alarmTypeStr = "start";

		var alarmData = {
			taskType : testTaskType,
			alarmType : alarmTypeStr,
			period : Period,
			during : testTargetTime,
			//msg : testAlarmTime
		};

		//new alarm
		var request = navigator.mozAlarms.add(testAlarmTime, "ignoreTimezone", alarmData);
		request.onsuccess = function() {
			notifyMe();
			console.log("Alarm sucessfully scheduled");
			var alarmRequest = navigator.mozAlarms.getAll();
			alarmRequest.onsuccess = function() {
				//this is the new alarm Id and it should be store into task data
				newAlarmId = this.result[(this.result.length) - 1].id;
				console.log("this is the new alarm Id and it should be store into task data : " + newAlarmId);
			};

			alarmCallback();
		};

		request.onerror = function() {
			console.log("An error occurred: " + this.error.name);
		};
	} else {
		console.log("An error occurred: " + this.error.name);
	};

}

function alarmCallback() {
	if (navigator.mozSetMessageHandler) {
		navigator.mozSetMessageHandler("alarm", function(alarm) {
			//if not a tast start alarm, set a start alarm for it
			if (alarm.data.alarmType == "notify") {
				new Notification(preNotify / 60000 + " minutes to " + alarm.data.taskType + "!");

				var AlarmTime = new Date();
				AlarmTime.setTime(AlarmTime.getTime() + preNotify);

				var alarmData = {
					taskType : alarm.data.taskType,
					alarmType : "start",
					during : alarm.data.during,
					time : AlarmTime.getMinutes,
				};

				var request = navigator.mozAlarms.add(AlarmTime, "ignoreTimezone", alarmData);

				request.onsuccess = function() {
					console.log("Alarm 2 sucessfully scheduled");
				};
				request.onerror = function() {
					console.log("An error occurred: " + this.error.name);
				};
			} else if (alarm.data.alarmType == "start")//if the task start alarm ring
			{
				//////page will go into task page when app open
				new Notification(alarm.data.taskType + " task start now!");

				setRunningTask(new Date(), alarm.data.during, alarm.data.taskType);
				changeTaskPage("tblRunTask");
				countdown();

				//////if alarm is periodically, set the next time alarm and change the AlarmId in task list
				switch(alarm.data.period) {
					case "ONCE":
						break;

					case "DAILY":
						break;

					case "WORKDAY":
						break;

					case "WEEKLY":
						break;

					case "MONTHLY":
						break;

					case "YEARLY":
						break;
				}
			} else {
				console.log("alarm.data.alarmType error");
			}
		});
	}
}

function notifyMe() {
	if (!("Notification" in window)) {
		alert("This browser does not support desktop notification");
	} else if (Notification.permission === "granted") {
		var notification = new Notification("Hi there!");
	} else if (Notification.permission !== 'denied') {
		Notification.requestPermission(function(permission) {
			if (!('permission' in Notification)) {
				Notification.permission = permission;
			}

			if (permission === "granted") {
				var notification = new Notification("Alarm add success!");
			}
		});
	}
}
