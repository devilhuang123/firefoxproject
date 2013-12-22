function InitializeCalendarLayoutArea(areaToShow) {//layout class Constructor
	ElementFactory.LoadCSS("css/ui-darkness/jquery-ui-1.10.3.custom.css");
	ElementFactory.LoadCSS("css/calendarPage.css");
	var calendarId = "datepicker";
	var messageId = "myMessage";
	var _this = this;

	this.div = AddDiv(areaToShow);

	this.calenderDiv = areaToShow;
	this.calendarDiv = AddDiv(this.div);
	this.calendarDiv.id = calendarId;

	this.messageDiv = areaToShow;
	this.messageDiv = AddDiv(this.div);
	this.messageDiv.id = messageId;
	this.messageDiv.className = "dateArea";
}

function CalendarView(areaToShow) {//CalendarView class Constructor

	var g_globalObject2;

	this.OnDateSelected = function(date, inst) {//Date(),object

	};
	var _this = this;
	_this.showArea = areaToShow;

	var onDatePicked = function(dateStr, inst) {
		var dateArr = dateStr.split("-");
		Assert(dateArr.length == 3, "convert Date error!");
		var date = new Date();
		date.setFullYear(dateArr[0], dateArr[1], dateArr[2]);
		_this.OnDateSelected(date, inst);
	};

	var Initialize = function() {
		$(function() {
			$("#" + _this.showArea.id).datepicker({
				autoSize : true,
				onSelect : onDatePicked,
				dateFormat : "yy-mm-dd"
			});
		});
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

