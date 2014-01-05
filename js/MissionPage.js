ElementFactory.LoadCSS("css/ui-darkness/jquery-ui-1.10.3.custom.css");
ElementFactory.LoadCSS("css/calendarPage.css");
var tabData = [{
	"label" : "<img src='./img/calendar.png'  height='28'>",
	"elementId" : "tabs-1",
	"checked" : true
}, {
	"label" : "<img src='./img/calendar_list.png'  height='28'>",
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

		listLayout.OnUpdateEvent = Refresh;
		calendarLayout.OnUpdateEvent = Refresh;

		var header = new HeaderView(headerArea);
		header.OnButtonClick = function() {
			AddTaskDialog();
		};

	}

	function Refresh() {
		listLayout.Refresh();
		calendarLayout.Refresh();
		//alert("should refresh");
	}

	function onSelectedDate(date, tasks, inst) {
		var str = "無任務";
		if (tasks.length > 0) {
			str = "任務：" + (date.getMonth() + 1) + "月" + date.getDate() + "日";
			str += "<HR class='taskHeaderHR'>";
			tasks.forEach(function(task) {
				str += "開始日期：" + task.StartTime + "<br>";
				str += "持續：" + getTime(task.During) + "<br>";
				str += "類型：" + task.Type + "<br>";
				str += "週期：" + TaskPeriod.toString(task.Period);
				if (tasks.indexOf(task) < tasks.length - 1)
					str += "<HR class='taskItemHR'>";
			});
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
		schedualTaskstartDate.setAttribute('class', "schedualTaskstartDateInput");
		schedualTaskstartDate.disabled = true;
		schedualTaskstartDate.setAttribute('id', "schedualTaskstartDate");
		schedualTaskstartDate.setAttribute('type', "text");
		p.appendChild(ElementFactory.CreateTextNode("開始日期"));
		p.appendChild(ElementFactory.CraeteElement('br'));
		p.appendChild(schedualTaskstartDate);
		var schedualTaskStartHour = createSelection("schedualTaskStartHour");
		var schedualTaskStartMins = createSelection("schedualTaskStartMins");
		p.appendChild(ElementFactory.CraeteElement('br'));
		p.appendChild(schedualTaskStartHour);
		p.appendChild(ElementFactory.CreateTextNode("時"));
		p.appendChild(schedualTaskStartMins);
		p.appendChild(ElementFactory.CreateTextNode("分"));
		contain.appendChild(p);
		contain.appendChild(p);
		//$("#schedualTaskstartDate").datepicker();

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
			schedualTaskStartHour.add(new Option(i, i));
		}

		for (var i = 0; i < 60; i++) {
			schedualTaskDuringMins.add(new Option(i, i));
			schedualTaskStartMins.add(new Option(i, i));
		}

		TaskPeriod.fotEach(function(entry) {
			schedualTaskRoutine.add(new Option(entry, TaskPeriod[entry]));
		});

		var buttons = [{
			text : "OK",
			click : function() {
				var selectedDate = stringToDate(schedualTaskstartDate.value);
				selectedDate.setHours(schedualTaskStartHour.value);
				selectedDate.setMinutes(schedualTaskStartMins.value);
				selectedDate.setSeconds(0);
				var during=schedualTaskDuringHour.value * 60 * 60 + schedualTaskDuringMins.value * 60;
				
				//setAlarm(month, day, hour, minute, type, schedualTaskRoutine.value)
				var returnAlarmId = setAlarm(selectedDate, during, selectSchedualTaskType.value, schedualTaskRoutine.value);
				
				var task = {
					StartTime : selectedDate,
					During : during,
					Type : selectSchedualTaskType.value,
					Period : schedualTaskRoutine.value,
					AlramId : returnAlarmId,
					Exclude : null
				};

				var calendarDB = new IndexDBObject("tasks");
				calendarDB.OnDbReaady = function(indexDbObject) {
					indexDbObject.Add(task).onsuccess = function(evt) {
						Refresh();
						console.log("added:");
						console.log(task);
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
				autoSize : true,
				showOn : "button",
				buttonImage : "img/calendar.png",
				buttonImageOnly : true
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
		a.innerHTML = "<img src='./img/add.png' align='middle'>";
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

