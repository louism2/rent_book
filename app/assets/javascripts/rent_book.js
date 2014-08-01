backbone_data = { Models: {}, Collections: {}, Views: {}, Routers: {}, Helpers: {} }

// alias 'EJS.Helpers.prototype' so that you can reference EJS view elements using the 'view_helpers' property
window.view_helpers = EJS.Helpers.prototype;

//  var form = $('#unit_spreadsheet')
//  form[0].files[0]
Backbone.Model.prototype.readFile = function(file) {
	var model = this; 
	model.file = true;
	var reader = new FileReader();
    reader.onload = (function(theFile){
        return function(e){
            model.set({filename: theFile.name, data: e.target.result});
			model.save(model.attributes);
		};
	})(file);
    reader.readAsDataURL(file);	
}

// allows for one line error message creation in the model validations
backbone_data.Helpers.buildMessage = function(obj, property, message){
	if(Array.isArray(obj.property)){
		obj[property].push(message);
	}else{
		obj[property] = [message];
	}
}

// allows for calling 'size' on an object to see if any properties have been set on the object
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

