function CreateRadioButtons(radioData) {
	var inputs = [];
	var _this = this;
	function CraeteInput(checked, id) {
		var input = ElementFactory.CraeteElement("input");
		input.setAttribute("type", "radio");
		input.setAttribute("id", "radio" + inputs.length);
		input.setAttribute("name", "radio");
		input.setAttribute("tag", id);
		if (checked)
			input.setAttribute("checked", "checked");
		input.addEventListener("change", this.OnRadioChange, false);
		return input;
	}


	this.OnRadioChange = function() {
		inputs.forEach(function(entry) {
			var checked = entry.checked;
			var id = entry.getAttribute("tag");
			if (checked)
				$("#" + id).slideDown(400);
			else
				$("#" + id).slideToggle(400);
		});
	};
	function CraeteLabel(labelText) {
		var label = ElementFactory.CraeteElement("label");
		label.setAttribute("for", "radio" + inputs.length);
		label.innerHTML = labelText;
		return label;
	}

	var form = ElementFactory.CraeteElement("div");

	radioData.forEach(function(entry) {
		var label = entry["label"];
		var elementId = entry["elementId"];
		var checked = entry["checked"];
		var i = inputs.length;
		var id = elementId;
		var input = CraeteInput(checked, id);
		var label = CraeteLabel(label);
		inputs.push(input);
		form.appendChild(input);
		form.appendChild(label);
	});
	this.OnRadioChange();
	return form;
}