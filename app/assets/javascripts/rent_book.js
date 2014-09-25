backbone_data = { Models: {}, Collections: {}, Views: {}, Routers: {}, Helpers: {} }

// store the landlord and buildings collection so that you don't continually have to fetch them.
// values for this are set using the function 'backbone_data.Helpers.defineObjects' which is defined below.


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

backbone_data.Helpers.testPassword = function(password){
	var myRe = /\b(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}\b/;
	return myRe.test(password);
}

backbone_data.Helpers.testEmail = function(email){
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

backbone_data.Helpers.initializeUser = function(){
	var $header = $('#header_nav');
	var headerNavigationView = new backbone_data.Views.HeaderNavigationView({attributes: {}});
	if(!document.cookie){
		headerNavigationView.attributes.signed_in = false;
		$header.append(headerNavigationView.render().$el);
		router.navigate('');
		router.navigate('/sign_in', {trigger: true});
	}else if(backbone_data.Helpers.hasKey('remember_token_landlord')){
		backbone_data.Helpers.createLandlordNamespace();
		$.get('/landlords/current_user', {
					async: false, 
				    contentType: "application/json; charset=utf-8",
			        dataType: "json",
		}).done(function(data){
			headerNavigationView.attributes = {signed_in:true,type:'landlord'};
			$header.append(headerNavigationView.render().$el);
			backbone_data.Helpers.setAndShowLandlord(data);
		}).error(function(){

		});	
	}else if(backbone_data.Helpers.hasKey('remember_token_tenant')){
		backbone_data.Helpers.createTenantNamespace();
		$.get('/tenants/current_user', {
					async: false, 
				    contentType: "application/json; charset=utf-8",
			        dataType: "json",
		}).done(function(data){
			headerNavigationView.attributes = {signed_in:true,type:'tenant'};
			$header.append(headerNavigationView.render().$el);
			backbone_data.Helpers.setAndShowTenant(data);
		}).error(function(){

		});	
	}
}

backbone_data.Helpers.setAndShowLandlord = function(response){
	window.object_namespace.landlord = new backbone_data.Models.Landlord(response.landlord);
	backbone_data.Helpers.setBuildings(response.data.buildings);
	var landlord = ns.landlord;
	var showLandlordView = new backbone_data.Views.ShowLandlordView({model: landlord});
	$container.html(showLandlordView.render().el);
	router.navigate('/landlords/'+landlord.id);
}

backbone_data.Helpers.createLandlordNamespace = function(){
	window.object_namespace = {
		landlord: null,
		buildingsCollection: null
	}
}

backbone_data.Helpers.createTenantNamespace = function(){
	window.object_namespace = {
		tenant: null,
		paymentsCollection: null
	}
}

backbone_data.Helpers.setAndShowTenant = function(response){
	backbone_data.Helpers.setLandlord({});
	backbone_data.Helpers.setBuildings([{}]);
	window.object_namespace.tenant = new backbone_data.Models.Landlord(response).tenant);
	backbone_data.Helpers.setPayments(response.data);
	var landlord = ns.landlord;
	var showLandlordView = new backbone_data.Views.ShowLandlordView({model: landlord});
	$container.html(showLandlordView.render().el);
	router.navigate('/landlords/'+landlord.id);
	headerNavigationView.attributes.signed_in = true;
	$header.append(headerNavigationView.render().$el);
}

backbone_data.Helpers.setBuildings = function(response){
	window.ns.buildingsCollection = new backbone_data.Collections.BuildingsCollection();
	for(key in response){
		console.log(response[key])
		var building = new backbone_data.Models.Building(response[key]);
		ns.buildingsCollection.add(building);
	}
}

backbone_data.Helpers.setPayments = function(key_name){
	p
	
}	


backbone_data.Helpers.hasKey = function(key_name){
	if (!key_name) { return false; }
	return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(key_name).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
}

// allows for calling 'size' on an object to see if any properties have been set on the object
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};







