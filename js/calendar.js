var  g_globalObject2;
var calenderDiv;
var messageDiv;
var calendarId="myCalender";
var messageId="myMessage";

function ShowCalendar(_div){
	calenderDiv = _div;
	calendarDiv=addDiv(_div,'#A2A1EF',"230px","250px");
	calendarDiv.id=calendarId;

    messageDiv =_div;
    messageDiv = addDiv(_div,'#E76DA9',"230px","50px");
	messageDiv.id=messageId;
	Initialize();
}


function addDiv(objTo,_color,width,height) {
    var divtest = document.createElement("div");
    objTo.appendChild(divtest);
    divtest.style.background = _color; 
    // divtest.style.overflow="hidden";
    // divtest.style.clear="both";
    // divtest.style.height="100%";
    // divtest.style.width="100%";
     divtest.style.width=width;
     divtest.style.height=height;
    return divtest;
}

function Initialize(){
		
		g_globalObject2 = new JsDatePick({
			useMode:1,
			isStripped:true,
			target:calenderDiv.id
			//cellColorScheme:"armygreen"
			/*selectedDate:{				This is an example of what the full configuration offers.
				day:5,						For full documentation about these settings please see the full version of the code.
				month:9,
				year:2006
			},
			yearsRange:[1978,2020],
			limitToToday:false,
			dateFormat:"%m-%d-%Y",
			imgPath:"img/",
			weekStartDay:1*/
		});
		g_globalObject2.setOnSelectedDelegate(OnDateSelected);		
		
}

function OnDateSelected(div){
	var obj = g_globalObject2.getSelectedDay();
			//alert("a date was just selected and the date is : " + obj.day + "/" + obj.month + "/" + obj.year);
			messageDiv.innerHTML = obj.day + "/" + obj.month + "/" + obj.year;
}

	

