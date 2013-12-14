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
	var options = ["吃飯","睡覺","寫作業","打林宥均","親鄭永斌教授"];
	
	/*
	var doc = new ActiveXObject("Msxml2.DOMDocument");
	doc.load("./task_type.xml");
	alert(doc.xml);
	var root = doc.documentElement;
	var nodelist = root.childNodes;

	for(var i=0;i<nodelist.length;i++){
		alert(nodelist[i].value);
	}
	*/
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