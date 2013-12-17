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
	$.getScript(href).fail(function( jqxhr, settings, exception ) {
    Assert(false,exception);
	});
};



ElementFactory(document);
