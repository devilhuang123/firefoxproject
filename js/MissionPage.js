ElementFactory.LoadCSS("css/ui-darkness/jquery-ui-1.10.3.custom.css");
ElementFactory.LoadCSS("css/calendarPage.css");
var tabData = [{
	"label" : "Calendar",
	"elementId" : "tabs-1",
	"checked" : true
}, {
	"label" : "List",
	"elementId" : "tabs-2",
	"checked" : false
}];

function MissionPage(headerArea, mainArea) {
	var calenderArea;
	var listArea;
	var _this = this;
	this.HeadArea = headerArea;
	this.MainArea = mainArea;
	var calendarView;
	var messageView;

	function UpdateMissionArea(headerArea, mainArea) {
		var calendarLayout = new InitializeCalendarLayoutArea(mainArea);
		calendarLayout.area.id = tabData[0]["elementId"];
		calendarView = new CalendarView(calendarLayout.calendarDiv);
		calendarView.OnDateSelected = onSelectedDate;
		calendarView.BeforeShowDay = showTasks;

		messageView = new MessageView(calendarLayout.messageDiv);

		var listLayout = new InitializeListLayoutArea(mainArea);
		listLayout.area.id = tabData[1]["elementId"];

		var header = new HeaderView(headerArea);

	}


	this.Show = function() {
		UpdateMissionArea(_this.HeadArea, _this.MainArea);
	};

	function onSelectedDate(date, inst) {
		var dates = [1, 8, 12, 7, 24, 19, 28, 29, 30];
		var str="無任務";
		if (dates.indexOf(date.getDate()) >= 0){
			 str="任務："+(date.getMonth()+1)+"月"+date.getDate()+"日 ,揪團打宥均";
		}
		
		messageView.SetText(str);
	}

	function showTasks(date) {
		var dates = [1, 8, 12, 7, 24, 19, 28, 29, 30];
		var ret = [];
		ret[0] = true;
		ret[1] = "";
		ret[2] = "";
		if (dates.indexOf(date.getDate()) >= 0)
			ret[1] = "ui-state-datepicker-scheduled";
		else
			ret[1] = "ui-state-datepicker-unscheduled";
		return ret;
	}

}

function HeaderView(areaToShow) {//HeaderView class Constructor
	var _this = this;
	this.area = areaToShow;

	function Initialize() {
		var radioButtons = CreateRadioButtons(tabData);
		radioButtons.id = "radio";
		var h1 = ElementFactory.CraeteElement("h1");
		areaToShow.appendChild(h1);
		h1.appendChild(ElementFactory.CreateTextNode('Calendar'));
		areaToShow.appendChild(radioButtons);
		$("#radio").buttonset();
		h1.setAttribute("style", "display: inline;");
		radioButtons.setAttribute("style", "display: inline;");
	}

	Initialize();
}

