var  g_globalObject2;
var calenderDiv;
var messageDiv;
var calendarId="datepicker";
var messageId="myMessage";

function ShowCalendar(_div){
	//var _div=ElementFactory.CraeteElement("div");
	calenderDiv = _div;
	calendarDiv=addDiv(_div,'#A2A1EF');
	calendarDiv.id=calendarId;

    messageDiv =_div;
    messageDiv = addDiv(_div,'#E76DA9');
	messageDiv.id=messageId;
	Initialize();
}


function addDiv(objTo,_color) {
    var divtest = ElementFactory.CraeteElement("div");
    objTo.appendChild(divtest);
    divtest.style.background = _color; 
    // divtest.style.overflow="hidden";
    // divtest.style.clear="both";
    // divtest.style.height="100%";
    // divtest.style.width="100%";
     //divtest.style.width=width;
    // divtest.style.height=height;
    return divtest;
}

function Initialize(){
		
		// g_globalObject2 = new JsDatePick({
			// useMode:1,
			// isStripped:true,
			// target:calenderDiv.id
			// //cellColorScheme:"armygreen"
			// /*selectedDate:{				This is an example of what the full configuration offers.
				// day:5,						For full documentation about these settings please see the full version of the code.
				// month:9,
				// year:2006
			// },
			// yearsRange:[1978,2020],
			// limitToToday:false,
			// dateFormat:"%m-%d-%Y",
			// imgPath:"img/",
			// weekStartDay:1*/
		// });
		// g_globalObject2.setOnSelectedDelegate(OnDateSelected);	
		
		 $(function() {
    		$( "#datepicker" ).datepicker(
    			{ autoSize: true, 
    			onSelect:OnDateSelected
    			
    			}
    		);
    		
  		});
			
		
}

function OnDateSelected(dateText, inst){
	//var obj = g_globalObject2.getSelectedDay();
			//alert("a date was just selected and the date is : " + obj.day + "/" + obj.month + "/" + obj.year);
			//messageDiv.innerHTML = obj.day + "/" + obj.month + "/" + obj.year;
			messageDiv.innerHTML = dateText;
}

	

