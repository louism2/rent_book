backbone_data = { Models: {}, Collections: {}, Views: {}, Routers: {}, Helpers: {} }

// store the landlord and buildings collection so that you don't continually have to fetch them.
// values for this are set using the function 'backbone_data.Helpers.defineObjects' which is defined below.
window.object_namespace = {
	landlord: null,
	buildingsCollection: null
}

// alias 'EJS.Helpers.prototype' so that you can reference EJS view elements using the 'view_helpers' property
window.view_helpers = EJS.Helpers.prototype;

Backbone.Model.prototype.readFile = function(file) {
	//  var form = $('#unit_spreadsheet')
	//  form[0].files[0]	
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

backbone_data.Helpers.fetchObjects = function(){
	if(!document.cookie){
		backbone_data.Helpers.setLandlord({});
		backbone_data.Helpers.setBuildings([{}]);
		router.navigate('');
		router.navigate('/sign_in', {trigger: true});
	}else{
		$.get('/landlords/current_user', {
					async: false, 
				    contentType: "application/json; charset=utf-8",
			        dataType: "json",
		}).done(function(data){
			backbone_data.Helpers.setLandlord(data.landlord);
			backbone_data.Helpers.setBuildings(data.buildings);
			var landlord = ns.landlord;
			var showLandlordView = new backbone_data.Views.ShowLandlordView({model: landlord});
			$container.html(showLandlordView.render().el);
			router.navigate('/landlords/'+landlord.id);
		}).error(function(){

		});	
	}
}

backbone_data.Helpers.setLandlord = function(attrs){
	window.object_namespace.landlord = new backbone_data.Models.Landlord(attrs);
}

backbone_data.Helpers.setBuildings = function(response){
	window.ns.buildingsCollection = new backbone_data.Collections.BuildingsCollection();
	for(key in response){
		var building = new backbone_data.Models.Building(response[key]);
		ns.buildingsCollection.add(building);
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

