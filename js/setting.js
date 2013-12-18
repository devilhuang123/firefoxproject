var mode = "sweet";

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
function getOption(){
	xmlhttp = new XMLHttpRequest();

	xmlhttp.open("GET","./task_type.xml",false);
	xmlhttp.send();

	doc = xmlhttp.responseXML;

	var nodelist = doc.getElementsByTagName("type");
	var select_type = document.getElementById('select_type');
	for(var i=0;i<nodelist.length;i++){
		var option = document.createElement('option');

		option.text = nodelist[i].childNodes[0].nodeValue;
		option.value = nodelist[i].childNodes[0].nodeValue;
		select_type.add(option, null);
	}
}

function appendOption(){
	var option = document.createElement('option');
	option.text = document.getElementById("text_type").value;
	option.value = document.getElementById("text_type").value;
	
	var select_type = document.getElementById('select_type');
	select_type.add(option, null);
}
///
//Type Functions end
///