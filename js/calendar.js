var g_globalObject2;
var calenderDiv;
var messageDiv;
var calendarId = "datepicker";
var messageId = "myMessage";

function ShowCalendar(_div) {
	ElementFactory.LoadCSS("css/ui-darkness/jquery-ui-1.10.3.custom.css");
	ElementFactory.LoadCSS("css/calendarPage.css");
	//ElementFactory.LoadScript("js/jquery-ui-1.10.3.custom.min.js");
	//var _div=ElementFactory.CraeteElement("div");
	calenderDiv = _div;
	calendarDiv = AddDiv(_div);
	calendarDiv.id = calendarId;

	messageDiv = _div;
	messageDiv = AddDiv(_div);
	messageDiv.id = messageId;
	messageDiv.className ="dateArea";
	
	var header=ElementFactory.FindElement("pageHeader");
	var h1=ElementFactory.CraeteElement("h1");
	header.appendChild(h1);
	h1.appendChild(document.createTextNode('Calendar'));
	Initialize();
}

function AddDiv(objTo) {
	var divtest = ElementFactory.CraeteElement("div");
	objTo.appendChild(divtest);
	return divtest;
}

function Initialize() {
	$(function() {
		$("#datepicker").datepicker({
			autoSize : true,
			onSelect : OnDateSelected
		});
	});
}

function OnDateSelected(dateText, inst) {
	messageDiv.innerHTML = dateText;
}

