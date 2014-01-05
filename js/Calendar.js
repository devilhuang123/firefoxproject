function InitializeCalendarLayoutArea(areaToShow) {//layout class Constructor

	var calendarId = "datepicker";
	var messageId = "myMessage";
	var _this = this;
	var section = ElementFactory.CraeteElement("section");
	areaToShow.appendChild(section);
	this.area = section;

	this.calendarDiv = AddDiv(this.area);
	this.calendarDiv.id = calendarId;

	this.messageDiv = AddDiv(this.area);
	this.messageDiv.id = messageId;
	this.messageDiv.className = "dateArea";

}

function CalendarView(areaToShow) {//CalendarView class Constructor
	var schedualTasks;
	var g_globalObject2;

	this.OnDateSelected = function(date, inst) {//Date(),object
	};
	this.BeforeShowDay = function(date) {
		var ret = [];
		ret[0] = true;
		ret[1] = "";
		ret[2] = "";
		return ret;
	};

	var _this = this;
	_this.showArea = areaToShow;

	var onDatePicked = function(dateStr, inst) {
		var date = stringToDate(dataStr);
		_this.OnDateSelected(date, inst);
	};

	var Initialize = function() {
		var calendarDB = new IndexDBObject("tasks");
		calendarDB.OnDbReaady = function(indexDbObject) {
			indexDbObject.AllTask().OnAllTasksGot = function(arr) {
				schedualTasks = arr;
				$(function() {
					$("#" + _this.showArea.id).datepicker({
						autoSize : true,
						onSelect : onDatePicked,
						dateFormat : "yy-mm-dd",
						beforeShowDay : beforeShowDay
					});
				});
				console.log(schedualTasks);
			};
		};
	};

	var beforeShowDay = function(date) {
		return _this.BeforeShowDay(date);
	};

	function showTasks(date) {
		var ret = [];
		ret[0] = true;
		ret[1] = "";
		ret[2] = "";
		if (isDateMeached(date, schedualTasks))
			ret[1] = "ui-state-datepicker-scheduled";
		else
			ret[1] = "ui-state-datepicker-unscheduled";
		return ret;
	}

	function isDateMeached(date1, schedTasks) {
		schedTasks.forEach(function(entry) {

		});

		return false;
	}

	Initialize();
}

function MessageView(areaToShow) {//MessageView class Constructor
	var _this = this;
	_this.area = areaToShow;
	this.SetText = function(message) {
		_this.area.innerHTML = message;
	};
	var Initialize = function() {
		_this.SetText("Pick a date");
	};

	Initialize();
}

