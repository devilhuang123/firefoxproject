function getSelectedChange()
{
	var selected = document.getElementById('history_type');
	//alert(selected.value);
	//showCircle(selected.value);
	if(selected.value == "吃飯")
		drawCircle("canvas_circle", data_arr_eat, color_arr, text_arr);
	else if	(selected.value == "睡覺")
		drawCircle("canvas_circle", data_arr_sleep, color_arr, text_arr);
	else 
		drawCircle("canvas_circle", data_arr_class, color_arr, text_arr);
		
}


	var color_arr = ["#00FF21", "#FFAA00", "#00AABB"];  
	var text_arr = ["Success", "Fail", "Undo"]; 
	var data_arr_eat = [0.8, 0.1, 0.1];
	var data_arr_sleep = [0.5, 0.5, 0];
	var data_arr_class = [0, 0, 0];

/*function showCircle(type)
{
	var color_arr = ["#00FF21", "#FFAA00", "#00AABB"];  
	var text_arr = ["Success", "Fail", "Undo"]; 
	var data_arr;
	
	//抓某一type的完成任务中的资料，写入data_arr中
	
	drawCircle("canvas_circle", data_arr, color_arr, text_arr);
}*/

//绘制饼图  
function init() {  
	
	var data_arr = [0.15, 0.25, 0.6];  
	var color_arr = ["#00FF21", "#FFAA00", "#00AABB"];  
	var text_arr = ["success", "fail", "第三季度"]; 
	
    drawCircle("canvas_circle", data_arr, color_arr, text_arr);  //绘制饼图  比例数据和颜色 
} 

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
        ctx.font = '12px';    //斜体 30像素 微软雅黑字体  
        ctx.fillStyle = color_arr[i]; //"#000000";  
        var percent = text_arr[i] + "：" + 100 * data_arr[i] + "%";  
        ctx.fillText(percent, textX, textY + 20 * i);  
    }  
}  


/*
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
}*/