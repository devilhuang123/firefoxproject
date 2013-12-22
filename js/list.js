function InitializeListLayoutArea(areaToShow) {//layout class Constructor
	ElementFactory.LoadCSS("css/ui-darkness/jquery-ui-1.10.3.custom.css");
	ElementFactory.LoadCSS("css/calendarPage.css");

	var _this = this;
	this.div = AddDiv(areaToShow);
	this.div.innerHTML = "LISTLISTLISTLISTLISTLISTLISTLISTLISTLISTLISTLISTLISTLISTLISTLISTLISTLIST";
}