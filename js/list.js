function InitializeListLayoutArea(areaToShow) {//layout class Constructor
	var _this = this;
	var section = CreateSection();
	this.area = section;
	areaToShow.appendChild(section);
	//section.setAttribute('data-type', "list");

}

function CreateTasks(tasks) {
	tasks.forEach(function(entry) {

	});

}

function CreateList (arr) {
  
}

function CreateListItem(content) {
	var item = ElementFactory.CraeteElement("li");
	if (content != null)
		item.appendChild(content);
	return item;
}
