var listDataTest = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var tasksDemo = [{
	StartTime : new Date(),
	During : 77777,
	Type : "Study",
	Period : TaskPeriod.ONCE,
	AlramId : 150,
	Exclude : null
}, {
	StartTime : new Date(),
	During : 7777222,
	Type : "Study",
	Period : TaskPeriod.YEARLY,
	AlramId : 150,
	Exclude : null
}, {
	StartTime : new Date(),
	During : 1125252,
	Type : "Study",
	Period : TaskPeriod.MONTHLY,
	AlramId : 150,
	Exclude : null
}, {
	StartTime : new Date(),
	During : 77752025,
	Type : "Study",IndexDBObject
	Period : TaskPeriod.WORKDAY,
	AlramId : 150,
	Exclude : null

}];

function InitializeListLayoutArea(areaToShow) {//layout class Constructor
	var _this = this;
	var listId = "listView";
	var section = CreateSection();
	this.area = section;
	areaToShow.appendChild(section);

	$("#" + listId).selectable();

	var listDB = new IndexDBObject("tasks");
	listDB.OnDbReaady = function(indexDbObject) {
		indexDbObject.AllTask().OnAllTasksGot = function(arr) {
			if (arr.length > 0) {
				CreateTasksList(indexDbObject);
			} else {
				indexDbObject.AddArray(tasksDemo).onsuccess = function(evt) {
					CreateTasksList(indexDbObject);
				};
			}
		};
	};

	function CreateTasksList(indexDbObject) {
		indexDbObject.AllTask().OnAllTasksGot = function(arr) {
			var list = CreateList(arr);
			console.log("CreateList");
			section.appendChild(list);
			section.setAttribute('class', "list-scrollable");
		};
	}

	function RefreshList() {
		var list = ElementFactory.FindElement(listId);
		section.removeChild(list);
		IndexDBObject("tasks").OnDbReaady = function(indexDbObject) {
			CreateTasksList(indexDbObject);
		};
	}


	this.Refresh = RefreshList;
	function deleteTask(recordId) {
		var deleteDB = new IndexDBObject("tasks");
		deleteDB.OnDbReaady = function(indexDbObject) {
			var arr = [recordId];
			indexDbObject.DeleteArray(arr).onsuccess = function(evt) {
				alert("task:" + recordId + " deleted!");
				RefreshList();
			};
		};
	}

	function CreateTaskItem(task) {
		var p = ElementFactory.CraeteElement('p');
		var textNode = "Null";
		if (task != null) {
			var id = task.Id;
			var startDate = new Date(task.StartTime * 1000);
			var during = getTime(task.During);
			var type = task.Type;
			var period = TaskPeriod.toString(task.Period);

			textNode = ElementFactory.CreateTextNode("id:" + id + "," + startDate + "," + during + "," + type + "," + period);
			p.onclick = function() {
				var buttons = [{
					text : "Delete:" + id,
					click : function() {
						deleteTask(id);
						$(this).dialog("close");
					}
				}];
				var contain = ElementFactory.CreateTextNode(startDate + "," + during + "," + type + "," + period);
				Dialog.Open("action", contain, buttons);
			};
		}
		p.appendChild(textNode);

		return p;
	}

	function CreateList(arr) {
		var list = ElementFactory.CraeteElement("ol");
		list.setAttribute('id', listId);
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
		item.appendChild(CreateTaskItem(content));
		item.setAttribute('class', "ui-widget-content");
		return item;
	}

}

