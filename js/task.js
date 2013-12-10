var mode = "sweet";
var remainSnd = 0;
var task = 
{
	startTime : 0,
	targetTime : 0,
	lastTime : 0,
	type : "none",
	status : "UNDO"
};

function showTable(tblName)
{
	document.getElementById("tblRunTask").style.display = "none";
	document.getElementById("tblUnstart").style.display = "none";
	document.getElementById("tblTaskResult").style.display = "none";
	
	document.getElementById(tblName).style.display = "";
}

function tas_init()
{
	//document.getElementById("tblRunTask").style.display = "none";
	//document.getElementById("tblUnstart").style.display = "";
	showTable("tblUnstart");
	
	var lstHours = document.getElementById("lstHour");	
	var lstMins = document.getElementById("lstMins");
	
	for(var i=0; i<24; i++)
	{
		lstHours.add(new Option(i, i));
	}
	
	for(var i=0; i<60; i++)
	{
		lstMins.add(new Option(i, i));
	}
}

function startImdTask()
{
	var hours = document.getElementById("lstHour").value;
	var mins = document.getElementById("lstMins").value;

	if( parseInt(hours)===0 && parseInt(mins)===0 )
	{
		alert("任務時長不可為0時0分!");
	}
	else if( (hours == 0 && mins == 0 ))
	{
		alert("請選擇持續時長");
	}
	else if( (hours == 0 && parseInt(hours) !== 0))
	{
		alert("請選擇持續小時");
	}
	else if( (mins == 0 && parseInt(mins) !== 0))
	{
		alert("請選擇持續分鐘");
	}
	else if((parseInt(hours)!==0 || parseInt(mins)!==0) && hours != null && mins != null)
	{
		//successfully add a new task and start running it!
		showTable("tblRunTask");	
		
		switch(mode)
		{
			case "strict":
				document.getElementById("btnQuit").style.display = "none";
			break;
			
			case "sweet":
				//do anything sweet mode do
			break;
			
			default:
				assert();//should not here
			break;
		}
		document.getElementById("divCntDnd").innerHTML = "從" + hours + "時" + mins + "分開始倒數!";
		
		remainSnd = (parseInt(hours) *3600 + parseInt(mins)*60);
		addNewTask();
		countdown();
		
		///////// function that other button event wouldn't trigger
	}
	else
	{
		assert();
	}
}

function addNewTask()
{
	var now = new Date();
	var type = document.getElementById("lstTaskType").value;
	var targetTime = remainSnd;
	var status = "RUNNING";
	
	task.startTime = now.getTime;
	task.targetTime = targetTime;
	task.type = type;
	task.status = status;
	alert("任務開始時間：" + now.getTime() + "\n任務類型：" + type + "\n持續時長：" + targetTime + "秒\n任務狀態：" + status);
	//alert(task);
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
	//var seconds = parseInt(totalSnd);
	if(remainSnd!=0)
	{
		remainSnd--;
		setTimeout('countdown()',1000);
	}
	else	//success!
	{
		task.lastTime = task.targetTime;
		task.status = "SUCCESS";
		//document.getElementById("cpltRateDiv").innerHTML = "任務完成率:" + Math.round(task.lastTime/task.targetTime) + "%";
		document.getElementById("cpltRateDiv").innerHTML = "任務完成率:" + (task.lastTime/task.targetTime) + "%";
		document.getElementById("taskCmdDiv").innerHTML = "幹的好!你真是人生勝利組!";
		
		showTable("tblTaskResult");
	}
}

function quitTask()
{
	if(confirm("確定要放棄任務嗎?在堅持一下吧!"))
	{
		task.lastTime = parseInt(task.targetTime) - remainSnd;
		task.status = "FAIL";
		//document.getElementById("cpltRateDiv").innerHTML = "任務完成率:" + Math.round(task.lastTime/task.targetTime) + "%";
		document.getElementById("cpltRateDiv").innerHTML = "任務完成率:" + (task.lastTime/task.targetTime) + "%";
		document.getElementById("taskCmdDiv").innerHTML = "這樣就不行了?!你的未來呢?!";
		showTable("tblTaskResult");
	}
	else{}//do nothing
}

function taskReturn()
{
	tas_init();
}

function poFB()
{
	alert("發文到FB!");
	tas_init();
}

/*
function task_varify()
{
	var x=2;
	var y=3;
	var z=x+y;
	//alert("z = "+z);
	document.write(x*z);
	/*var x = document.getElementById("inNum").value;
	if(x=="" || isNaN(x))
	{
		alert("不合法！");
	}
}

function task_array()
{
	var arrTest = new Array();
	arrTest[0] = 0;
	arrTest[100] = "str";
	
	document.write(arrTest);
}

function task_jsonTest()
{
	var dinner =
	{
		price : 60,
		restaurant : "yun-yi",
		evaluation : 3,
		comment : "something good eating but not what i want! bit of pitty!"
	};
	document.write(dinner.comment);
}
*/