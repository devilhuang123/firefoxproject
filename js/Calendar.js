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

	this.Refresh = function() {
		$("." + _this.calendarDiv.id).datepicker("refresh");
		_this.MessageView.SetText("123456");
	};

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
		var date = stringToDate(dateStr);
		_this.OnDateSelected(date, inst);
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
				console.log(schedualTasks);
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
		//console.log("schedualTasks");
		//console.log(schedualTasks);
		var tasks = tasksMeached(date, schedualTasks);
		console.log("tasks.length"+tasks.length);
		if (tasks.length > 0) {
			console.log("tasksMeached:"+tasks);
			ret[1] = "ui-state-datepicker-scheduled";
		} else
			ret[1] = "ui-state-datepicker-unscheduled";

		return ret;
	}

	function tasksMeached(date, schedTasks) {
		var _tasks = [];
		schedTasks.forEach(function(task) {
			switch(task.Period) {
				case TaskPeriod.ONCE:
					if (sameDay(date, task.StartTime))
						_tasks.push(task);
					break;
				case TaskPeriod.DAILY:
					if (date.getTime() > task.StartTime.getTime())
						_tasks.push(task);
					break;
				case TaskPeriod.WORKDAY:
					if (date.getTime() > task.StartTime.getTime() && task.StartTime.getDay() < 5)
						_tasks.push(task);
					break;
				case TaskPeriod.WEEKLY:
					if (date.getTime() > task.StartTime.getTime() && date.getDay() == task.StartTime.getDay())
						_tasks.push(task);
					break;
				case TaskPeriod.MONTHLY:
					if (date.getTime() > task.StartTime.getTime() && date.getDate() == task.StartTime.getDate())
						_tasks.push(task);
					break;
				case TaskPeriod.YEARLY:
					if (date.getTime() > task.StartTime.getTime() && task.StartTime.getDate() == date.getDate() && task.StartTime.getMonth() == date.getMonth())
						_tasks.push(task);
					break;
			}
		});

		function sameDay(date0, date1) {
			return (date0.getDate() == date1.getDate() && date0.getMonth() == date1.getMonth() && date0.getFullYear() == date1.getMonth());
		}

		return _tasks;
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
