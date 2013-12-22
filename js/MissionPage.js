function MissionPage(headerArea, mainArea) {
	var calenderArea;
	var listArea;
	var _this = this;
	this.HeadArea = headerArea;
	this.MainArea = mainArea;

	function UpdateMissionArea(headerArea, mainArea) {

		var header = new HeaderView(headerArea);

		var calendarLayout = new InitializeCalendarLayoutArea(mainArea);
		calendarLayout.div.id = "tabs-1";
		var calendarView = new CalendarView(calendarLayout.calendarDiv);
		var messageView = new MessageView(calendarLayout.messageDiv);

		var listLayout = new InitializeListLayoutArea(mainArea);
		listLayout.div.id = "tabs-2";

		calendarView.OnDateSelected = function(dateText, inst) {
			messageView.SetText(dateText);
		};

		// $("#tabpanel").tabs();
	}


	this.Show = function() {
		UpdateMissionArea(_this.HeadArea, _this.MainArea);
	};

}

function HeaderView(areaToShow) {//HeaderView class Constructor
	var _this = this;
	this.area = areaToShow;
	var tabData = [{
		"label" : "Calendar",
		"elementId" : "tabs-1"
	}, {
		"label" : "List",
		"elementId" : "tabs-2"
	}];

	function Initialize() {
		var tabs = CreateTabs(tabData);
		areaToShow.appendChild(tabs);
		var h1 = ElementFactory.CraeteElement("h1");
		areaToShow.appendChild(h1);
		h1.appendChild(document.createTextNode('Calendar'));
	}

	Initialize();
}

function CreateTabs(tabData) {
	var tabs = [];
	var _this = this;
	function CraeteTab(label, elementId) {
		var counter = tabs.length + 1;
		var li = ElementFactory.CraeteElement("li");
		var a = ElementFactory.CraeteElement("a");
		var identifier = "tab-" + counter.toString();
		a.setAttribute("href", "#" + elementId);
		a.innerHTML = label;
		li.appendChild(a);
		tabs[counter - 1] = {
			"id" : identifier,
			"label" : label,
			"element" : elementId
		};
		return li;
	}

	var ul = ElementFactory.CraeteElement("ul");
	tabData.forEach(function(entry) {
		label = entry["label"];
		elementId = entry["elementId"];
		var li = CraeteTab(label, elementId);
		ul.appendChild(li);
	});
	return ul;
}

