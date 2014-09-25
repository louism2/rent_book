backbone_data.Routers.ApplicationRouter = Backbone.Router.extend({
	routes: {
		'homepage':'home',
		'sign_in':'sign_in',
		'landlords/new':'new_landlord',
		'landlords/:landlord_id/new_building':'new_building',
		'landlords/:landlord_id':'show_landlord',
		'tenants/new':'new_tenant'
	},
	initialize: function(options){
		// intialization here
	},
	sign_in: function(){
		var signInView = new backbone_data.Views.SignInView();	
		$container.html(signInView.render().el);
	},
	home: function(){

	},
	new_landlord: function(){
		var landlord = ns.landlord;
		var newLandlordView = new backbone_data.Views.NewLandlordView({model: landlord});
		$container.html(newLandlordView.render().el);
	},
	new_building: function(id){
		var landlord = ns.landlord;
		var building = new backbone_data.Models.Building();
		var newBuildingView = new backbone_data.Views.NewBuildingView({model: building});
		$container.html(newBuildingView.render().el);
	},
	show_landlord: function(id,options){
		var landlord = ns.landlord;
		var showLandlordView = new backbone_data.Views.ShowLandlordView({model: landlord});
		$container.html(showLandlordView.render().el);
	},
	new_tenant: function(){
		var tenant = new backbone_data.Models.Tenant();
		var newTenantView = new backbone_data.Views.NewTenantView({model: tenant});
		$container.html(newTenantView.render().el);
	}
});	
	
