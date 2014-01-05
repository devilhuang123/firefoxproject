var color_arr = ["#00FF21", "#FFAA00"];  
var text_arr = ["Success", "Fail"]; 

//在选单中显示现有任务类型
function his_init()
{	
	var type = document.getElementById("history_type");
	
	for(var i=type.options.length-1; i>=0; i--)
	{
		type.options[i].remove();
	}
	for (var i = 0; i < task_list.length; i++) 
	{
		if(task_list[i] != "undefine")
			type.add(new Option(task_list[i], task_list[i]));			
	}
}


function getSelectedChange()
{
	var canvas = document.getElementById('canvas_circle');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
	
	//document.getElementById('circle').innerHTML="";
	var selected = document.getElementById('history_type');
	showCircle(selected.value);		
}


function showCircle(selectedType)
{	
	var sum = 0;
	var data_rate = new Array("0","0");
	var data = new Array("0","0");
	var arr1 = new Array();
	
	createCptIndexDb().OnDbReaady = function(indexDbObject) 
	{		
		indexDbObject.AllTask().OnAllTasksGot = function(arr) {
			console.log("array length:"+arr.length);
			if (arr.length > 0) {
				console.log(arr);
				for (var i=0; i<arr.length; i++)
				{
					arr1[i] = arr[i];					
				}

			} else {
				console.log("nothing in DB");
			}
			
			for (var i = 0; i <arr1.length; i++) 
				{
					console.log(arr1[i].Type);
					if (selectedType == arr1[i].Type)
					{
						sum = sum +1;
						console.log(arr1[i].result);
						if (arr1[i].result == "SUCCESS")
						{
							data[0]++;
						}
						else if(arr1[i].result == "FAIL")
						{
							data[1]++;
						}	
						else {}											
					}
					else {}
				}	
	
	
	
	
			if (sum == 0)
			{
				alert("no task");
			}
			else
			{
				data_rate[0] = data[0] / sum;
				data_rate[1] = data[1] / sum;
			
				drawCircle("canvas_circle", data_rate, color_arr, text_arr);
			}
		};
	};
	
		/*		for (var i = 0; i <arr1.length; i++) 
				{
					console.log(arr1[i].Type);
					if (selectedType == arr1[i].Type)
					{
						sum = sum +1;
						console.log(arr1[i].result);
						if (arr1.result == "SUCCESS")
						{
							data[0]++;
						}
						else if(arr1.result == "FAIL")
						{
							data[1]++;
						}	
						else {}											
					}
					else {}
				}	
	
	
	
	
	if (sum == 0)
	{
		alert("no task");
	}
	else
	{
		data_rate[0] = data[0] / sum;
		data_rate[1] = data[1] / sum;
	
		drawCircle("canvas_circle", data_rate, color_arr, text_arr);
	}*/

}

//绘制饼图  
function drawCircle(canvasId, data_arr, color_arr, text_arr)  
{  
    var c = document.getElementById(canvasId);  
    var ctx = c.getContext("2d");  
  
    var radius = c.height / 2 - 20;  
    var ox = radius + 20, oy = radius + 20; //圆心  
  
    var width = 30, height = 10; //图例宽和高  
	var posX = ox * 2 + 20, posY = 30;   //  
    var textX = posX + width + 5, textY = posY + 10;  
  
    var startAngle = 0; //起始弧度  
	var endAngle = 0;   //结束弧度
	  
    for (var i = 0; i < data_arr.length; i++)  
    {  
        //绘制饼图  
        endAngle = endAngle + data_arr[i] * Math.PI * 2; //结束弧度  
        ctx.fillStyle = color_arr[i];  
        ctx.beginPath();  
        ctx.moveTo(ox, oy); //移动到到圆心  
        ctx.arc(ox, oy, radius, startAngle, endAngle, false);  
        ctx.closePath();  
        ctx.fill();  
        startAngle = endAngle; //设置起始弧度  
  
        //绘制比例图及文字  
        ctx.fillStyle = color_arr[i];  
        ctx.fillRect(posX, posY + 20 * i, width, height);  
        ctx.moveTo(posX, posY + 20 * i);  
        ctx.font = '12px';    //30像素  
        ctx.fillStyle = color_arr[i]; //"#000000";  
        var percent = text_arr[i] + "：" + 100 * data_arr[i] + "%";  
        ctx.fillText(percent, textX, textY + 20 * i);  
    }  
}  



//delete history
function hisdel(){
	if (confirm("確定要刪除所有歷史記錄嗎？"))
	{
		//deleteAllCptTask();
	}
	else
	{
		document.getElementById(panel3).style.display = "";
	}
}