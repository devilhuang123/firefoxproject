function mm_includejs (jsFile){
	document .write('<script type="text/javascript" src="' + jsFile + '"></script>');
}
mm_includejs('js/Utility.js');

var listDataTest = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var tasksDemo = [/*{
	StartTime : 755775872,
	During : 77777,
	Type : "Study",
	Period : TaskPeriod.ONCE,
	Exclude : null
}, {
	StartTime : 7257827,
	During : 7777222,
	Type : "Study",
	Period : TaskPeriod.YEARLY,
	Exclude : null
}, {
	StartTime : 725527362,
	During : 1125252,
	Type : "Study",
	Period : TaskPeriod.MONTHLY,
	Exclude : null
}, {
	StartTime : 7752788,
	During : 77752025,
	Type : "Study",
	Period : TaskPeriod.WORKDAY,
	Exclude : null
}*/];
function InitializeListLayoutArea(areaToShow) {//layout class Constructor
	var _this = this;
	var section = CreateSection();
	this.area = section;
	areaToShow.appendChild(section);

	$("#listView").selectable();

	IndexDBObject("tasks").OnDbReaady = function(indexDbObject) {
		indexDbObject.AddArray(tasksDemo).onsuccess = function(evt) {
			indexDbObject.AllTask().OnAllTasksGot = function(arr) {
				var list = CreateList(arr);
				console.log("CreateList");
				section.appendChild(list);
				section.setAttribute('class', "list-scrollable");
			};
		};
	};

}

function deleteTask(argument) {

}

function CreateTask(task) {
	var p = ElementFactory.CraeteElement('p');
	var text = "Null";
	if (task != null) {
		var id = task.Id;
		var startDate = new Date(task.StartTime * 1000);
		var during = task.During / (60);
		var type = task.Type;
		var period = TaskPeriod.toString(task.Period);
		text = ElementFactory.CreateTextNode("id:" + id + "," + startDate + "," + during + "," + type + "," + period);
		p.onclick = function() {
			alert(id);
		};
	}
	p.appendChild(text);

	return p;
}

function Dialog(dialogId) {
	var id=dialogId;
	this.Open= function() {

	};
}

function CreateList(arr) {
	var list = ElementFactory.CraeteElement("ol");
	list.setAttribute('id', "listView");
	//list.setAttribute('class', "list-tasks");
	arr.forEach(function(entry) {
		console.log("entry:" + entry);
		var item = CreateListItem(entry);
		list.appendChild(item);
	});
	return list;
}

function CreateListItem(content) {
	console.log(content);
	var item = ElementFactory.CraeteElement("li");
	item.appendChild(CreateTask(content));
	item.setAttribute('class', "ui-widget-content");
	return item;
}
