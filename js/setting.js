var mode = "sweet";

function setting(){
	document.getElementById("mode_table").style.display = "none";
	document.getElementById("task_type_table").style.display = "none";
	document.getElementById("history_manage_table").style.display = "none";
}
function Mode(){
	document.getElementById("mode_table").style.display = null;
}

function getMode(){
	if(mode == "sweet")
		document.getElementById("td_mode").textContent = "溫柔模式";
	else
		document.getElementById("td_mode").textContent = "剽悍模式";
}

function setMode(){
	var index = document.getElementById("select_mode").selectedIndex;
	var option = document.getElementById("select_mode").options;
	
	if(option[index].text == "溫柔模式"){
		document.getElementById("td_mode").textContent = "溫柔模式";
		alert("您選擇了"+option[index].text);
	}else{
		document.getElementById("td_mode").textContent = "剽悍模式";
		alert("您選擇了"+option[index].text);
	}
}