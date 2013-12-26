function his_print(){
	
	var task = doc.getElementsByTagName("Task");

	if(task.length==0)
	{
		document.write("現在沒有完成任何任務" + "<br>");
	}
	else
	{
		document.write("現已完成" + task.length + "次任務" + "<br>");
		//我這邊好像也需要吃到任務的type，否則無法判定每一個task裡面的Type和什麽做對比，決定每一種任務類型分別的成功失敗結果。
	}
	
}

function printtable(){
	
	document.write("<table border='1'>");
	var task = doc.getElementsByTagName("Task");
	
	document.write("<tr><td>");
	document.write("任務類型");
	document.write("</td><td>");
	document.write("完成狀態");
	document.write("</td></tr>");
	
	for (i=0;i<task.length;i++)
	{
  		document.write("<tr><td>");
  		document.write(task[i].getElementsByTagName("Type")[0].childNodes[0].nodeValue);
  		document.write("</td><td>");
  		if(task[i].getElementsByTagName("EndTime")==0)
  		{
  			document.write("未完成");
  		}
  		else
  		{
  			//保存那三個時間的時候具體是怎麼存？需要判斷是否完成
  		}
  		document.write("</td></tr>");
	}
	
	document.write("</table>");
}

/*function his_print(){
	if(cptTasks.length==0)
	{
		document.write("現在沒有完成任何任務" + "<br>");
	}
	else
	{
		n = cptTasks.length - 1;
		document.write("現已完成" + n + "次任務" + "<br>");
			
		typen = taskTypes.length - 1;
		for (var i=0; i<typen; i++)
		{
			printType(taskTypes[i]);
		}
	}
}


//print everytype result
function printType(type){
	
	var sum = 0;
	var successNo = 0;
	var failNo = 0;
	
	cptn = cptTasks.length - 1;
	for (var i=0; i<cptn; i++){	
		
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
	
	if (sum == 0)
	{
		document.write("尚未進行"+ type + "任務" + "<br>");
	}
	else
	{
		document.write("任務類型：" + type + "<br>");
		document.write("其中成功" + successNo + "次，失敗" + failNo + "次，任務成功率為" + successNo/sum + "。");
	}
}*/

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