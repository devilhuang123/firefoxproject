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
		//console.log(dateStr);
		var dateArr = dateStr.split("-");
		Assert(dateArr.length == 3, "convert Date error!");
		var date = new Date();
		date.setFullYear(dateArr[0], dateArr[1]-1, dateArr[2]);
		//console.log(date.toDateString());
		_this.OnDateSelected(date, inst);
	};

	var Initialize = function() {
		$(function() {
			$("#" + _this.showArea.id).datepicker({
				autoSize : true,
				onSelect : onDatePicked,
				dateFormat : "yy-mm-dd",
				//showButtonPanel: true,
				beforeShowDay : beforeShowDay
				//,direction: "up"
			});
		});
	};

	var beforeShowDay = function(date) {
		return _this.BeforeShowDay(date);
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
