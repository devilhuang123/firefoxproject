function his_print(){
	
	if(cptTasks.length==0)
	{
		document.write("現在沒有完成任何任務" + "<br>");
	}
	else
	{
		document.write("現已完成" + cptTasks.length + "次任務" + "<br>");
			
		for (var i=0; i<taskTypes.length; i++)
		{
			printType(taskTypes[i]);
		}

	}
}

//print everytype result
function printType(type){
	
	var sum = 0；
	var successNo = 0;
	var failNo = 0;
	
	for (var i=0; i<cptTasks.length; i++){	
		
		if(cptTasks[i].Type == type)
		{
			sum = sum + 1;
			if(cptTasks[i].Result == "SUCCESS")
			{
				successNo = successNo + 1;
			}
			else if(cptTasks[i].Result == "FAIL")
			{
				failNo = failNo + 1;
			}
			else
			{
			assert();
			}
		}
		else
		{
			assert();
		}
	}
	
	document.write("任務類型：" + type + "<br>");
	if (sum == 0)
	{
		document.write("尚未進行本類型任務")
	}
	else
	{
		document.write("其中成功" + successNo + "次，失敗" + failNo + "次，任務成功率為" + successNo/sum。)
	}
}

	
//delete history
function hisdel(){
	if (confirm("確定要刪除所有歷史記錄嗎？"))
	{
		deleteAllCptTask();
	}
	else
	{
		document.getElementById(panel3).style.display = "";
	}
}
