function ElementFactory(_document) {
	ElementFactory.Document = _document;
}

ElementFactory.Document = null;

ElementFactory.CraeteElement = function(type) {
	var element = ElementFactory.Document.createElement(type);
	Assert(element != null, "CraeteElement: " + type + " failed");
	return element;
};

ElementFactory.LoadCSS = function(href) {
	var css = jQuery("<link>");
	css.attr({
		rel : "stylesheet",
		type : "text/css",
		href : href
	});
	Assert(css != null, "Load css failed");
	$("head").append(css);
	return css;
};

ElementFactory.LoadScript = function(href) {
	var script = $.getScript(href, function(data, textStatus, jqxhr) {
	});
	Assert(script != null, "Load script failed");
	return script;
};

ElementFactory.FindElement = function(id) {
	var element = ElementFactory.Document.getElementById(id);
	Assert(element != null, "can't find element with" + id);
	return element;
};

ElementFactory.CreateTextNode = function(str) {
	var ele = ElementFactory.Document.createTextNode(str);
	return ele;
};

function AddDiv(objTo) {
	var divtest = ElementFactory.CraeteElement("div");
	objTo.appendChild(divtest);
	return divtest;
};

function CreateSection () {
  var section = ElementFactory.CraeteElement("section");
  return section;
}

ElementFactory(document);


