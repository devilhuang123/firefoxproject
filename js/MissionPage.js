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

	function UpdateMissionArea(headerArea, mainArea) {

		var calendarLayout = new InitializeCalendarLayoutArea(mainArea);
		calendarLayout.div.id = tabData[0]["elementId"];
		var calendarView = new CalendarView(calendarLayout.calendarDiv);
		calendarView.OnDateSelected = function(dateText, inst) {
			messageView.SetText(dateText);
		};
		var messageView = new MessageView(calendarLayout.messageDiv);

		var listLayout = new InitializeListLayoutArea(mainArea);
		listLayout.div.id = tabData[1]["elementId"];

		var header = new HeaderView(headerArea);

	}


	this.Show = function() {
		UpdateMissionArea(_this.HeadArea, _this.MainArea);
	};

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

function CreateRadioButtons(radioData) {
	var inputs = [];
	var _this = this;
	function CraeteInput(checked, id) {
		var input = ElementFactory.CraeteElement("input");
		input.setAttribute("type", "radio");
		input.setAttribute("id", "radio" + inputs.length);
		input.setAttribute("name", "radio");
		input.setAttribute("tag", id);
		if (checked)
			input.setAttribute("checked", "checked");
		input.addEventListener("change", this.OnRadioChange, false);
		return input;
	}


	this.OnRadioChange = function() {
		inputs.forEach(function(entry) {
			var checked = entry.checked;
			var id = entry.getAttribute("tag");
			if (checked)
				$("#" + id).slideDown(400);
			else
				$("#" + id).slideToggle(400);
		});
	};
	function CraeteLabel(labelText) {
		var label = ElementFactory.CraeteElement("label");
		label.setAttribute("for", "radio" + inputs.length);
		label.innerHTML = labelText;
		return label;
	}

	var form = ElementFactory.CraeteElement("div");

	radioData.forEach(function(entry) {
		var label = entry["label"];
		var elementId = entry["elementId"];
		var checked = entry["checked"];
		var i = inputs.length;
		var id = elementId;
		var input = CraeteInput(checked, id);
		var label = CraeteLabel(label);
		inputs.push(input);
		form.appendChild(input);
		form.appendChild(label);
	});
	this.OnRadioChange();
	return form;
}

