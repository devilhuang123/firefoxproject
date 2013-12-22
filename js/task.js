//var mode = "sweet";	//Must remove -- JoeyC
var remainSnd = 0;
var isRunning = new Boolean();
isRunning = false;
var meter;
var successFeedback = new Array();
var failFeedback = new Array();

var runningTask = 
{
	StartTime : null,
	TargetTime : 0,
	Type : null,
	//LastTime : lastTime,
	//Result : result 
};

function changeTaskPage(tblName)
{
	document.getElementById("tblRunTask").style.display = "none";
	document.getElementById("tblUnstart").style.display = "none";
	document.getElementById("tblTaskResult").style.display = "none";
	
	document.getElementById(tblName).style.display = "";
}

function tas_init()
{
	//alarm();
	changeTaskPage("tblUnstart");
	
	var lstHours = document.getElementById("lstHour");	
	var lstMins = document.getElementById("lstMins");
	//var lstTaskType = document.getElementById("lstTaskType");	

	for(var i=0; i<24; i++)
	{
		lstHours.add(new Option(i, i));
	}
	
	for(var i=0; i<60; i++)
	{
		lstMins.add(new Option(i, i));
	}
	
	//Must remove -- JoeyC
	/*var types = getAllType();
	
	for(var i=0; i<types.length; i++)
	{
		if(types[i] != "undefine")
			lstTaskType.add(new Option(types[i].Name, types[i].Value));
	}*/
}

function initRsvTask()
{
	
}

function initImdTask()
{
	var hours = document.getElementById("lstHour").value;
	var mins = document.getElementById("lstMins").value;


	//validate
	if( parseInt(hours)===0 && parseInt(mins)===0 )
	{
		alert("任務時長不可為0時0分!");
	}
	else if( parseInt(hours)!==0 || parseInt(mins)!==0 )
	{
		//successfully add a new task and start running it!			
		var nowMode = getMode();
		switch(nowMode)
		{
			case "sweet":
				
			break;
			
			case "strict":
				//do not show quit button
				document.getElementById("btnQuit").style.display = "none";
			break;
			
			default:
				assert();
			break;
		}
		
		//switch to task running page
		changeTaskPage("tblRunTask");
		document.getElementById("divCntDnd").innerHTML = "從" + hours + "時" + mins + "分開始倒數!";
		remainSnd = (parseInt(hours) *3600 + parseInt(mins)*60);
		
		recordRunTask();
		
		countdown();
		
		
		///////// function that other button event wouldn't trigger
	}
	else
	{
		assert();
	}
}

function startTask(hours, mins)
{
	
}

function recordRunTask()
{
	var now = new Date();
	var type = document.getElementById("lstTaskType").value;
	var targetTime = remainSnd;
	var status = "RUNNING";
	
	runningTask.StartTime = now;
	runningTask.TargetTime = targetTime;
	runningTask.Type = type;
	
	addTaskOrder(now, targetTime, type, "ONCE");
	
	//alert("任務開始時間：" + now.getTime() + "\n任務類型：" + type + "\n持續時長：" + targetTime + "秒\n任務狀態：" + status);
}

function countdown()
{
	var rmdHour = Math.floor(remainSnd / 3600);
	var rmdMin = Math.floor((remainSnd - rmdHour*3600) / 60);
	var rmdSnd = remainSnd % 60;
	
	if(rmdHour < 10){rmdHour = "0" + rmdHour;}
	if(rmdMin < 10){rmdMin = "0" + rmdMin;}
	if(rmdSnd < 10){rmdSnd = "0" + rmdSnd;}
	
	
	document.getElementById("divCntDnd").innerHTML = rmdHour + " : " + rmdMin + " : " + rmdSnd;
	
	
	if(!isRunning)
	{
		isRunning = true;	
		countdown();
	}
	else if(remainSnd!=0 && isRunning)
	{
		remainSnd--;
		meter = setTimeout('countdown()',1000); 	//do it once 1 sec	
	}
	else if(remainSnd==0 && isRunning)	//success!
	{
		endTask(runningTask.TargetTime, "SUCCESS");
	}
	else
	{
		assert();
	}
}

function quitTask()
{
	if(confirm("確定要放棄任務嗎?在堅持一下吧!"))
	{
		var lastTime = parseInt(runningTask.TargetTime) - remainSnd;
		endTask(lastTime, "FAIL");
	}
	else{}//do nothing
}

function endTask(lastTime, result)
{
	isRunning = false;
	remainSnd == 0;
	clearTimeout(meter);
	
	changeTaskPage("tblTaskResult");
	
	//add task complete data into database
	addTaskCpt(runningTask.StartTime, runningTask.TargetTime, runningTask.Type, lastTime, result);
	
	//print result
	document.getElementById("cpltRateDiv").innerHTML = "任務完成率:" + (parseInt(lastTime)/parseInt(runningTask.TargetTime))*100 + "%";
	if(result =="SUCCESS")
		document.getElementById("taskCmdDiv").innerHTML = "幹的好!你真是人生勝利組!";
	else if(result == "FAIL")
		document.getElementById("taskCmdDiv").innerHTML = "加把勁啊！";
	else
		document.getElementById("taskCmdDiv").innerHTML = "should not go in here!";

	changeTaskPage("tblTaskResult");
}

function taskReturn()
{
	changeTaskPage("tblUnstart");
}

function poFB()
{
	alert("發文到FB!");
	tas_init();
}
