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

	this.CalendarView = new CalendarView(_this.calendarDiv);
	this.MessageView = new MessageView(_this.messageDiv);

	this.OnUpdateEvent = function() {
		_this.Refresh();
	};

	this.Refresh = function() {
		_this.CalendarView.Refresh();
		_this.MessageView.SetText("Pick a date");
	};

}

function CalendarView(areaToShow) {//CalendarView class Constructor
	var schedualTasks;
	var g_globalObject2;

	this.OnDateSelected = function(date, tasks, inst) {//Date(),object
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
		var date = stringToDate(dateStr);
		var tasks = tasksMeached(date, schedualTasks);
		_this.OnDateSelected(date, tasks, inst);
	};

	var Initialize = function() {
		var calendarDB = new IndexDBObject("tasks");
		calendarDB.OnDbReaady = function(indexDbObject) {
			indexDbObject.AllTask().OnAllTasksGot = function(arr) {
				schedualTasks = arr;
				$("#" + _this.showArea.id).datepicker({
					autoSize : true,
					onSelect : onDatePicked,
					dateFormat : "yy-mm-dd",
					beforeShowDay : beforeShowDay
				});
			};
		};
		_this.BeforeShowDay = showTasks;
	};

	var beforeShowDay = function(date) {
		return _this.BeforeShowDay(date);
	};

	function showTasks(date) {
		var ret = [];
		ret[0] = true;
		ret[1] = "";
		ret[2] = "";
		var tasks = tasksMeached(date, schedualTasks);
		if (tasks.length > 0) {
			console.log("tasksMeached:" + tasks);
			ret[1] = "ui-state-datepicker-scheduled";
		} else
			ret[1] = "ui-state-datepicker-unscheduled";
		return ret;
	}

	function tasksMeached(date, schedTasks) {
		var _tasks = [];
		schedTasks.forEach(function(task) {

			switch(parseInt(task.Period)) {
				case TaskPeriod.ONCE:
					if (sameDay(date, task.StartTime))
						_tasks.push(task);
					break;
				case TaskPeriod.DAILY:
					if (afterOrSame(task.StartTime, date))
						_tasks.push(task);
					break;
				case TaskPeriod.WORKDAY:
					if (afterOrSame(task.StartTime, date) && date.getDay() > 0 && date.getDay() < 6)
						_tasks.push(task);
					break;
				case TaskPeriod.WEEKLY:
					if (afterOrSame(task.StartTime, date) && date.getDay() == task.StartTime.getDay())
						_tasks.push(task);
					break;
				case TaskPeriod.MONTHLY:
					if (afterOrSame(task.StartTime, date) && date.getDate() == task.StartTime.getDate())
						_tasks.push(task);
					break;
				case TaskPeriod.YEARLY:
					if (afterOrSame(task.StartTime, date) && task.StartTime.getDate() == date.getDate() && task.StartTime.getMonth() == date.getMonth())
						_tasks.push(task);
					break;
			}
		});

		function sameDay(date0, date1) {
			return (date0.getDate() == date1.getDate() && date0.getMonth() == date1.getMonth() && date0.getFullYear() == date1.getFullYear());
		}

		function afterOrSame(date0, date1) {
			var t0 = date0.getFullYear() * 365 + date0.getMonth() * 30 + date0.getDate();
			var t1 = date1.getFullYear() * 365 + date1.getMonth() * 30 + date1.getDate();
			return t1 >= t0;
		}

		return _tasks;
	}


	this.Refresh = function() {
		$("#" + _this.showArea.id).datepicker("destroy");
		Initialize();
	};
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
