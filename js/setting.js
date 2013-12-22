//Constructor

function setting(){
	document.getElementById("mode_table").style.display = "none";
	document.getElementById("task_type_table").style.display = "none";
	document.getElementById("history_manage_table").style.display = "none";
}

function Mode(){
	document.getElementById("mode_table").style.display = null;
	document.getElementById("task_type_table").style.display = "none";
	document.getElementById("history_manage_table").style.display = "none";
	getMode();
}

function Type(){
	document.getElementById("mode_table").style.display = "none";
	document.getElementById("task_type_table").style.display = null;
	document.getElementById("history_manage_table").style.display = "none";
}

///
//Mode functions -- getMode(),setMode().
///

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

///
//Mode Functions end
///

///
//Type Functions
///

function appendOption(){
	var option = document.createElement('option');
	option.text = document.getElementById("text_type").value;
	option.value = document.getElementById("text_type").value;
	
	var select_type = document.getElementById('select_type');
	select_type.appendChild(option);
}

function removeOption(){
	var select_type = document.getElementById('select_type');
	var index = document.getElementById("select_type").selectedIndex;
	var option = document.getElementById("select_type").options;
	
	select_type.removeChild(option[index]);
}

///
//Type Functions end
///