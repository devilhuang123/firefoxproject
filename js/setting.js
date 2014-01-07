///
// Constructor
///

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
	getOption();
}

///
// Constructor End
///

///
// Mode functions -- getMode(),setMode().
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
		mode = "sweet";
		document.getElementById("td_mode").textContent = "溫柔模式";
		alert("您選擇了"+option[index].text);
	}else{
		mode = "strict";
		document.getElementById("td_mode").textContent = "剽悍模式";
		alert("您選擇了"+option[index].text);
	}
}

///
// Mode Functions end
///

///
// Type Functions
///

function appendOption(){
	var option = document.createElement('option');
	option.text = document.getElementById("text_type").value;
	option.value = document.getElementById("text_type").value;
	
	var select_type = document.getElementById('select_type');
	select_type.appendChild(option);
	task_list.push(document.getElementById('text_type').value);
	alert("已新增任務： " + document.getElementById('text_type').value);
	
	var request = indexedDB.open("db_type", 3);
	request.onsuccess = function(event){
		var db = event.target.result;
		var transaction = db.transaction(["task_type"], "readwrite");
		var objectStore = transaction.objectStore("task_type");
		var request = objectStore.add(document.getElementById('text_type').value);
	}		
}

function getOption(){
	var select_type = document.getElementById('select_type');

	if(select_type.length > 0){
		for(var i=(select_type.length-1);i>=0;i--){
			select_type.remove(i);
		}
	}

	for(var i=0;i<task_list.length;i++){
		var option = document.createElement('option');
		option.text = task_list[i];
		option.value = task_list[i];
		select_type.appendChild(option);
	}
}

function removeOption(){
	var select_type = document.getElementById('select_type');
	var index = document.getElementById("select_type").selectedIndex;
	var option = document.getElementById("select_type").options;
	var item = option[index].value;
	
	select_type.removeChild(option[index]);
	task_list.splice(index, 1);
	alert("已刪除任務： " + item);
	
	var request = indexedDB.open("db_type", 3);
	request.onsuccess = function(event){
		var db = event.target.result;
		var transaction = db.transaction(["task_type"], "readwrite");
		var objectStore = transaction.objectStore("task_type");
		var request = objectStore.delete(item);
	}	
}

///
// Type Functions end
///