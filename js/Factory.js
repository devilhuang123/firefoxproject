function ElementFactory(_document) {
	ElementFactory.Document = _document;
}

ElementFactory.Document = null;

ElementFactory.CraeteElement = function(type) {
	var element = ElementFactory.Document.createElement(type);
	Assert(element != null, "CraeteElement: " + type + " failed");
	return element;
};

ElementFactory.LoadCSS = function(href) {
	var css = jQuery("<link>");
	css.attr({
		rel : "stylesheet",
		type : "text/css",
		href : href
	});
	Assert(css != null, "Load css failed");
	$("head").append(css);
	return css;
};

ElementFactory.LoadScript = function(href) {
	var script = $.getScript(href, function(data, textStatus, jqxhr) {
	});
	Assert(script != null, "Load script failed");
	return script;
};

ElementFactory.FindElement = function(id) {
	var element = ElementFactory.Document.getElementById(id);
	Assert(element != null, "can't find element with " + id);
	return element;
};

ElementFactory.CreateTextNode = function(str) {
	var ele = ElementFactory.Document.createTextNode(str);
	return ele;
};

function AddDiv(objTo) {
	var divtest = ElementFactory.CraeteElement("div");
	objTo.appendChild(divtest);
	return divtest;
};

function CreateSection() {
	var section = ElementFactory.CraeteElement("section");
	return section;
}

//tasks = { Id, StartTime, During, Type, Period, Exclude }
function IndexDBObject(dbName) {
	var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
	var db;
	var name = dbName;
	var _this = this;
	_this.DB;
	this.OnDbReaady = function(_db) {
	};
	if (!indexedDB)
		alert("indexedDB not support!");

	var request = indexedDB.open(name, 1);
	request.onsuccess = function(evt) {// 將db暫存起來供以後操作
		db = request.result;
		_this.DB = db;
		console.log("IndexedDB success");
		_this.OnDbReaady(_this);
	};

	request.onerror = function(evt) {
		console.log("IndexedDB error: " + evt.target.errorCode);
	};

	request.onupgradeneeded = function(evt) {
		var objectStore = evt.currentTarget.result.createObjectStore("tasks", {
			keyPath : "Id",
			autoIncrement : true
		});

		objectStore.createIndex("StartTime", "StartTime", {
			unique : false
		});
		objectStore.createIndex("During", "During", {
			unique : false
		});
		objectStore.createIndex("Type", "Type", {
			unique : false
		});
		objectStore.createIndex("Period", "Period", {
			unique : false
		});
		objectStore.createIndex("Exclude", "Exclude", {
			unique : false
		});
		objectStore.createIndex("AlramId", "AlramId", {
			unique : false
		});
		console.log("onupgradeneeded");
	};

	this.AllTask = function() {
		var transaction = db.transaction(name, "readwrite");
		var objectStore = transaction.objectStore("tasks");
		var _tasks = [];
		var _this = this;
		objectStore.openCursor().onsuccess = function(event) {
			var cursor = event.target.result;
			if (cursor) {
				_tasks.push(cursor.value);
				cursor.
				continue();
			} else {
				//	console.log("GetAllTask all");
				_this.OnAllTasksGot(_tasks);
				//alert("Got all customers: " + tasks);
			}
		};
		this.OnAllTasksGot = function(tasks) {
		};
		return this;
	};

	this.Add = function(task) {
		var transaction = db.transaction(name, "readwrite");
		var objectStore = transaction.objectStore("tasks");
		var request = objectStore.add(task);
		request.onsuccess = function(evt) {
		};
		return request;
	};

	this.AddArray = function(_array) {
		var transaction = db.transaction(name, "readwrite");
		var objectStore = transaction.objectStore("tasks");
		var request = null;
		_array.forEach(function(entry) {
			request = objectStore.add(entry);
		});
		return request;
	};

	this.DeleteArray = function(ids) {
		var transaction = db.transaction(name, "readwrite");
		var objectStore = transaction.objectStore("tasks");
		var request = null;
		ids.forEach(function(entry) {
			request = objectStore.
			delete (entry);
			request.onerror = function(evt) {
				console.log("IndexedDB error: " + evt.target.errorCode);
			};
		});

		return request;
	};

	return this;
}

function Dialog(title, content, _buttons) {

	var parentNote = ElementFactory.Document.body;
	var id = "dialog_" + title.replace(/ /g, "");
	var div = ElementFactory.CraeteElement("div");
	div.appendChild(content);
	div.setAttribute('id', id);
	div.setAttribute('title', title);
	parentNote.appendChild(div);

	function onclose(event, ui) {
		$(this).dialog('destroy').remove();
	}


	$("#" + id).dialog({
		autoOpen : false,
		closeOnEscape : false,
		beforeclose : function(event, ui) {
			return false;
		},
		buttons : _buttons,
		close : onclose
	});
	this.Id = id;

	this.Open = function() {
		$("#" + id).dialog("open");
	};

}

Dialog.Open = function(title, content, _buttons) {
	var dialog = new Dialog(title, content, _buttons);
	$("#" + dialog.Id).dialog("open");
};

function getTime(sec) {
	//console.log(sec);
	var tm = parseInt(sec / 60);
//	console.log(tm);
	var hr = parseInt(tm / 60);
	var min = parseInt(tm % 60);
	return hr + "小時" + min+"分";
}

function stringToDate(dateStr) {
	var dateArr = dateStr.split("-");
	Assert(dateArr.length == 3, "convert Date error!");
	var date = new Date();
	date.setFullYear(dateArr[0], dateArr[1] - 1, dateArr[2]);
	return date;
}

ElementFactory(document);

