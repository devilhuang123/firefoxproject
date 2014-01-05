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
	var listLayout;
	var calendarLayout;
	function UpdateMissionArea(headerArea, mainArea) {

		calendarLayout = new InitializeCalendarLayoutArea(mainArea);
		calendarLayout.area.id = tabData[0]["elementId"];
		listLayout = new InitializeListLayoutArea(mainArea);
		listLayout.area.id = tabData[1]["elementId"];

		calendarView = calendarLayout.CalendarView;
		calendarView.OnDateSelected = onSelectedDate;
		messageView = calendarLayout.MessageView;

		var header = new HeaderView(headerArea);
		header.OnButtonClick = function() {
			AddTaskDialog();
		};

	}

	function Refresh() {
		listLayout.Refresh();
		calendarLayout.Refresh();
		alert("should refresh");
	}

	function onSelectedDate(date, inst) {
		var dates = [1, 8, 12, 7, 24, 19, 28, 29, 30];
		var str = "無任務";
		if (dates.indexOf(date.getDate()) >= 0) {
			str = "任務：" + (date.getMonth() + 1) + "月" + date.getDate() + "日 ,揪團打宥均";
		}

		messageView.SetText(str);
	}


	this.Show = function() {
		UpdateMissionArea(_this.HeadArea, _this.MainArea);
	};

	function AddTaskDialog() {
		// var contain = ElementFactory.CreateTextNode("DEMO");
		var contain = ElementFactory.CraeteElement('div');
		var p = createP("任務類型");
		var selectSchedualTaskType = createSelection("schedualTaskType");
		p.appendChild(selectSchedualTaskType);
		contain.appendChild(p);

		p = ElementFactory.CraeteElement('p');
		var schedualTaskstartDate = ElementFactory.CraeteElement('input');
		schedualTaskstartDate.setAttribute('id', "schedualTaskstartDate");
		schedualTaskstartDate.setAttribute('type', "text");
		p.appendChild(ElementFactory.CreateTextNode("開始時間"));
		p.appendChild(schedualTaskstartDate);
		contain.appendChild(p);
		$("#schedualTaskstartDate").datepicker();

		p = createP("持續時長：");
		var schedualTaskDuringHour = createSelection("schedualTaskstartDate");
		var schedualTaskDuringMins = createSelection("schedualTaskDuringMins");
		p.appendChild(ElementFactory.CraeteElement('br'));
		p.appendChild(schedualTaskDuringHour);
		p.appendChild(ElementFactory.CreateTextNode("時"));
		p.appendChild(schedualTaskDuringMins);
		p.appendChild(ElementFactory.CreateTextNode("分"));
		contain.appendChild(p);

		p = createP("週期");
		var schedualTaskRoutine = createSelection("schedualTaskRoutine");
		p.appendChild(schedualTaskRoutine);
		contain.appendChild(p);

		task_list.forEach(function(entry) {
			selectSchedualTaskType.add(new Option(entry, entry));
		});

		for (var i = 0; i < 24; i++) {
			schedualTaskDuringHour.add(new Option(i, i));
		}

		for (var i = 0; i < 60; i++) {
			schedualTaskDuringMins.add(new Option(i, i));
		}

		TaskPeriod.fotEach(function(entry) {
			schedualTaskRoutine.add(new Option(entry, TaskPeriod[entry]));
		});

		var buttons = [{
			text : "OK",
			click : function() {
				var task = {
					StartTime : stringToDate(schedualTaskstartDate.value),
					During : schedualTaskDuringHour.value * 60 * 60 + schedualTaskDuringMins * 60,
					Type : selectSchedualTaskType.value,
					Period : schedualTaskRoutine.value,
					AlramId : 150,
					Exclude : null
				};
				var calendarDB = new IndexDBObject("tasks");
				calendarDB.OnDbReaady = function(indexDbObject) {
					indexDbObject.Add(task).onsuccess = function(evt) {
						console.log("added:" + task);
						Refresh();
					};
				};
				$(this).dialog("close");
			}
		}];
		var d = new Dialog("Add Task", contain, buttons);

		d.Open();
		smallDatePicker("#schedualTaskstartDate");

		function smallDatePicker(id) {
			$(id).datepicker({
				dateFormat : "yy-mm-dd",
			});
		}

		function createSelection(id) {
			var select = ElementFactory.CraeteElement('select');
			select.setAttribute('id', id);
			return select;
		}

		function createP(text) {
			var p = ElementFactory.CraeteElement('p');
			p.appendChild(ElementFactory.CreateTextNode(text));
			return p;
		}

	}

}

function HeaderView(areaToShow) {//HeaderView class Constructor
	var _this = this;
	this.area = areaToShow;
	var onButtonClick = function() {
		_this.OnButtonClick();
	};

	this.OnButtonClick = function() {

	};

	function Initialize() {
		var menu = ElementFactory.CraeteElement('menu');
		areaToShow.appendChild(menu);
		var a = ElementFactory.CraeteElement('a');
		menu.appendChild(a);
		menu.setAttribute('type', "toolbar");
		a.innerHTML = "+";
		a.onclick = onButtonClick;

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

