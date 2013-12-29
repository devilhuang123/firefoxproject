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
	Assert(element != null, "can't find element with" + id);
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
	this.OnDbReaady = function() {
	};
	if (!indexedDB)
		alert("indexedDB not support!");

	var request = indexedDB.open(name, 1);
	request.onsuccess = function(evt) {// 將db暫存起來供以後操作
		db = request.result;
		console.log("IndexedDB success");
		_this.OnDbReaady();
	};

	request.onerror = function(evt) {
		console.log("IndexedDB error: " + evt.target.errorCode);
	};

	request.onupgradeneeded = function(evt) {
		var objectStore = evt.currentTarget.result.createObjectStore("tasks", {
			keyPath : "Id",
			autoIncrement : true
		});

		objectStore.createIndex("Id", "Id", {
			unique : true
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
		console.log("onupgradeneeded");
	};

	this.GetAllTask = function() {
		var transaction = db.transaction(name, IDBTransaction.READ_WRITE);
		var objectStore = transaction.objectStore("tasks");
		console.log("GetAllTask");
		objectStore.openCursor().onsuccess = function(event) {
			var cursor = event.target.result;
			if (cursor) {
				tasks.push(cursor.value);
				cursor.
				continue();
			} else {
				alert("Got all customers: " + tasks);
			}
		};
		return tasks;
	};

	this.Add = function(task) {
		var transaction = db.transaction(name, IDBTransaction.READ_WRITE);
		var objectStore = transaction.objectStore("tasks");
		var request = objectStore.add(task);
		request.onsuccess = function(evt) {
			console.log("add:" + task);
		};
		return request;
	};

}

ElementFactory(document);

