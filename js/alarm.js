/*=====================
 Alarm -- by pmkw52525
 ======================*/

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
				changeTaskPage("divRunTask");
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
