/*function mm_includejs(jsFile) {
	document.write('<script type="text/javascript" src="' + jsFile + '"></script>');
}

mm_includejs('js/Utility.js');
*/

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
			CreateTasksList(indexDbObject);
			/*if (arr.length > 0) {
				CreateTasksList(indexDbObject);
			} else {
				indexDbObject.AddArray(tasksDemo).onsuccess = function(evt) {
					CreateTasksList(indexDbObject);
				};
			}*/
		};
	};

	function CreateTasksList(indexDbObject) {
		indexDbObject.AllTask().OnAllTasksGot = function(arr) {
			var list = CreateList(arr);
			//			console.log("CreateList");
			section.appendChild(list);
			section.setAttribute('class', "list-scrollable");
		};
	}

	this.Refresh=function () {
		var list = ElementFactory.FindElement(listId);
		section.removeChild(list);
		IndexDBObject("tasks").OnDbReaady = function(indexDbObject) {
			CreateTasksList(indexDbObject);
		};
	};

	this.OnUpdateEvent = function() {
		_this.Refresh();
	};

	function deleteTask(recordId) {
		var deleteDB = new IndexDBObject("tasks");
		deleteDB.OnDbReaady = function(indexDbObject) {
			var arr = [recordId];
			indexDbObject.DeleteArray(arr).onsuccess = function(evt) {
				//alert("task:" + recordId + " deleted!");
				_this.OnUpdateEvent();
			};
		};
	}

	function CreateTaskItem(task) {
		var p = ElementFactory.CraeteElement('p');
		var textNode = "Null";
		if (task != null) {
			var id = task.Id;
			var startDate = task.StartTime;
			var during = getTime(task.During);
			var type = task.Type;
			var period = TaskPeriod.toString(task.Period);

			textNode = ElementFactory.CreateTextNode("開始於："+startDate.toLocaleString() + ", 持續：" + during + ", 類型：" + type + ", 週期：" + period);
			p.onclick = function() {
				var buttons = [{
					text : "Delete",
					click : function() {
						deleteTask(id);
						$(this).dialog("close");
					}
				}];
				var containStr="開始於："+startDate.toLocaleString() +
				 "<br>持續：" + during + 
				 "<br>類型：" + type + 
				 ", 週期：" + period;
				var contain = ElementFactory.CraeteElement('p');
				contain.innerHTML=containStr;
				Dialog.Open("排程任務", contain, buttons);
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
			//		console.log("entry:" + entry);
			var item = CreateListItem(entry);
			list.appendChild(item);
		});
		return list;
	}

	function CreateListItem(content) {
		//		console.log(content);
		var item = ElementFactory.CraeteElement("li");
		item.appendChild(CreateTaskItem(content));
		item.setAttribute('class', "ui-widget-content");
		return item;
	}

}

