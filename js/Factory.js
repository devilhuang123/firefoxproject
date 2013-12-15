function ElementFactory(_document){
	ElementFactory.Document=_document;
}

ElementFactory.Document=null;

ElementFactory.CraeteElement=function(type){
		return ElementFactory.Document.createElement(type);
};

ElementFactory.LoadCSS=function(href){
	var css = jQuery("<link>");
    css.attr({
      rel:  "stylesheet",
      type: "text/css",
      href: href
    });
    Assert(css!=null,"Load css failed");
    $("head").append(css);
    return css;
};

ElementFactory.LoadScript=function(href){
	var script=$.getScript(href,function(data, textStatus, jqxhr){
	});
	Assert(script!=null,"Load script failed");
	return script;
};



ElementFactory(document);
