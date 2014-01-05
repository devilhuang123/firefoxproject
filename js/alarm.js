/*================================================
    Alarm -- by pmkw52525, student ID:101522094
 =================================================*/
var preNotify = 1000 * 60 *10;
function setAlarm(startTime, lastTime, type, period) {
	

	//here we get any information we want to put into the alarm data for what we have to do after alarm ring! ex.during->for how long the task is
	/*
	 * taskType: sleep, study...
	 * alarmType: "notify", "start"
	 * alarmPeriod: ONCE, DAILY...
	 * during
	 *  */
	var now = new Date();
	var alarmTypeStr = "";
	var returnAlarmId = "";
	
	if (navigator.mozAlarms) {
		//if the time set alarm is within 10 mins, we won't set the notify alarm. Only the start alarm will be set.
		if (startTime.getTime() - now.getTime() > preNotify) {
			alarmTypeStr = "notify";
			startTime.setTime(startTime.getTime() - preNotify);
		} else
			alarmTypeStr = "start";

		var alarmData = {
			taskType : type,
			alarmType : alarmTypeStr,
			alarmPeriod : period,
			during : lastTime,
		};

		//new alarm
		var request = navigator.mozAlarms.add(startTime, "ignoreTimezone", alarmData);
		request.onsuccess = function() 
		{
			notifyMe("successfully add alarm");
			var alarmRequest = navigator.mozAlarms.getAll();
			alarmRequest.onsuccess = function() 
			{
				//this is the new alarm Id and it should be store into task data
				returnAlarmId = this.result[(this.result.length) - 1].id;
				console.log(returnAlarmId);
			};

			/////Set Alarm Callback here!!
			alarmCallback();
		};

		request.onerror = function() {
			console.log("An error occurred: " + this.error.name);
		};
	} else {
		console.log("An error occurred: " + this.error.name);
	};
	
	return returnAlarmId;

}

function alarmCallback() {
	if (navigator.mozSetMessageHandler) {
		navigator.mozSetMessageHandler("alarm", function(alarm) {
			//if not a tast start alarm, set a start alarm for it
			if (alarm.data.alarmType == "notify")
			{
				new Notification(preNotify / 60000 + " minutes to " + alarm.data.taskType + "!");

				var AlarmTime = new Date();
				AlarmTime.setTime(AlarmTime.getTime() + preNotify);

				var alarmData = {
					taskType : alarm.data.taskType,
					alarmType : "start",
					during : alarm.data.during,
					alarmPeriod : alarm.data.alarmPeriod,
				};

				var request = navigator.mozAlarms.add(AlarmTime, "ignoreTimezone", alarmData);

				request.onsuccess = function() 
				{
					console.log("Alarm 2 sucessfully scheduled");
				};
				request.onerror = function() 
				{
					console.log("An error occurred: " + this.error.name);
				};
			}
			else if (alarm.data.alarmType == "start")//if the task start alarm ring
			{
				//////page will go into task page when app open
				new Notification(alarm.data.taskType + " task start now!");

				var now = new Date();
				setRunningTask( now, alarm.data.during, alarm.data.taskType);
				changeTaskPage("divRunTask");
				countdown();


				var nextAddTime = 0;
				var oneDayMsec = 1000*60*60*24;
				//////if alarm is periodically, set the next time alarm and change the AlarmId in task list
				//get the next time period
				switch(alarm.data.alarmPeriod) 
				{
					case TaskPeriod.ONCE :
						break;

					case TaskPeriod.DAILY:
						nextAddTime = oneDayMsec;
						break;

					case TaskPeriod.WORKDAY:
						if(now.getDay() == 5)
							nextAddTime = oneDayMsec*3;
						else if(now.getDay() == 1 || now.getDay() == 2 || now.getDay() == 3 || now.getDay() == 4)
							nextAddTime = oneDayMsec;
						else if(now.getDay() == 0 || now.getDay() == 6)
							console.log("workday alarm ring in HOLIDAY!!!!");
						else
							console.log("workday alarm error");
						break;

					case TaskPeriod.WEEKLY:
						nextAddTime = oneDayMsec*7;
						break;

					case TaskPeriod.MONTHLY:
						//31 days per month
						if(now.getMonth() == 0 || now.getMonth() == 2 || now.getMonth() == 4 || now.getMonth() == 6 || now.getMonth() == 7 || now.getMonth() == 9 || now.getMonth() == 11)
							nextAddTime = oneDayMsec*31;
						//30 days per month
						else if(now.getMonth() == 3 || now.getMonth() == 5 || now.getMonth() == 8 || now.getMonth() == 10)
							nextAddTime = oneDayMsec*30;
						//Febuary
						else if(now.getMonth() == 1 )
						{
							if(now.getFullYear() % 4 == 0)
								nextAddTime = oneDayMsec*29;
							else
								nextAddTime = oneDayMsec*28;
						}
						else console.log("month error");
						break;

					case TaskPeriod.YEARLY:
						if(now.getFullYear() % 4 == 0)
							nextAddTime = oneDayMsec*366;
						else
							nextAddTime = oneDayMsec*365;
						break;
				}
				
				//set the period alarm and modify the task DB alarmId
				if(alarm.data.alarmPeriod != TaskPeriod.ONCE)
				{
					var AlarmTime = new Date();
					AlarmTime.setTime(AlarmTime.getTime() + nextAddTime);
	
					var alarmData = {
						taskType : alarm.data.taskType,
						alarmType : "start",
						during : alarm.data.during,
						alarmPeriod : alarm.data.alarmPeriod
					};
	
					var request = navigator.mozAlarms.add(AlarmTime, "ignoreTimezone", alarmData);
	
					request.onsuccess = function() 
					{
						console.log("Alarm 2 sucessfully scheduled");
					};
					request.onerror = function() 
					{
						console.log("An error occurred: " + this.error.name);
					};
					///////////////////////////////////////////////////Go to modify the
				}
				 				
				
			} else {
				console.log("alarm.data.alarmType error");
			}
		});
	}
}

function notifyMe(notifyStr) {
	if (!("Notification" in window)) 
	{
		alert("This browser does not support desktop notification");
	}
	else if (Notification.permission === "granted") 
	{
		var notification = new Notification(notifyStr);
	}
	else if (Notification.permission !== 'denied') 
	{
		Notification.requestPermission(function(permission) 
		{
			if (!('permission' in Notification)) {
				Notification.permission = permission;
			}

			if (permission === "granted") {
				var notification = new Notification("Alarm add success!");
			}
		});
	}
}

function deleteAlarm(alarmId)
{
	if(navigator.mozAlarms) 
    {
    	notifyMe("delete Alarm" + newAlarmId);
      	navigator.mozAlarms.remove(newAlarmId);
    }
}
