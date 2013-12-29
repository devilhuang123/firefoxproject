var listDataTest = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var tasksDemo = [{
	Id : "1",
	StartTime : "5999900",
	During : "99999",
	Type : "Study",
	Period : TaskPeriod.DAILY,
	Exclude : null
}, {
	Id : "1",
	StartTime : "5999900",
	During : "99999",
	Type : "Study",
	Period : TaskPeriod.ONCE,
	Exclude : null
}];
function InitializeListLayoutArea(areaToShow) {//layout class Constructor
	var _this = this;
	var section = CreateSection();
	this.area = section;
	areaToShow.appendChild(section);
	var list = CreateList(listDataTest);
	section.appendChild(list);
	section.setAttribute('class', "list-scrollable");
	// var p = ElementFactory.CraeteElement("p");
	// p.setAttribute('id', "select-result");
	// section.appendChild(p);

	$("#listView").selectable();

	var taskDB = new IndexDBObject("tasks");
	taskDB.OnDbReaady = function() {
		tasksDemo.forEach(function(entry) {
			taskDB.Add(entry);
		});
		var arr = taskDB.GetAllTask();
		console.log(arr);
	};

}

function CreateTasks(tasks) {
	tasks.forEach(function(entry) {

	});
}

function CreateList(arr) {
	var list = ElementFactory.CraeteElement("ol");
	list.setAttribute('id', "listView");
	//list.setAttribute('class', "list-tasks");
	arr.forEach(function(entry) {
		var item = CreateListItem(entry);
		list.appendChild(item);
	});
	return list;
}

function CreateListItem(content) {
	var item = ElementFactory.CraeteElement("li");
	item.setAttribute('class', "ui-widget-content");
	if (content != null)
		item.innerHTML = content;
	//item.appendChild(content);
	return item;
}
