backbone_data.Routers.ApplicationRouter = Backbone.Router.extend({
	routes: {
		'homepage':'home',
		'landlords/new':'new_landlord',
		'landlords/:id/new_building':'new_building',
		'landlords/:id':'show_landlord',

	},
	home: function(){

	},
	new_landlord: function(){
		var landlord = new backbone_data.Models.Landlord();
		var newLandlordView = new backbone_data.Views.NewLandlordView({model: landlord});
		$container.html(newLandlordView.render().el);
	},
	new_building: function(id){
		var building = new backbone_data.Models.Building();
		var newBuildingView = new backbone_data.Views.NewBuildingView({model: building});
		$container.html(newBuildingView.render().el);
	},
	show_landlord: function(id,options){
		var landlord = new backbone_data.Models.Landlord({id: id});
		landlord.fetch({success: function(data){
			var showLandlordView = new backbone_data.Views.ShowLandlordView({model: landlord});
			$container.html(showLandlordView.render().el);
		}, failure: function(data){
			$container.html(insertConnectionError());
		}});

	}
});	
	
