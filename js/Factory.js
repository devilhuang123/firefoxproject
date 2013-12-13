function ElementFactory(_document){
	ElementFactory.Document=_document;
}

ElementFactory.Document=null;

ElementFactory.CraeteElement=function(type){
		return ElementFactory.Document.createElement(type);
};



ElementFactory(document);
