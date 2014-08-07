backbone_data.Views.ShowLandlordView = Backbone.View.extend({
	template: JST['landlords/show'],
	events: {
		'click #add_property_link':'addProperty'
	},
	initialize: function(options){
	
	},
	render: function(){
		this.$el.html(this.template(this.model.attributes));
		var buildingListView = new backbone_data.Views.BuildingListView({model: ns.buildingsCollection});
		this.el.$('#add_property_link').after(buildingListView.render().el);
		return this
		// build collection here
		
	},
	addProperty: function(){
		var landlord_id = this.model.id;
		var building = new backbone_data.Models.Building();
		var newBuildingView = new backbone_data.Views.NewBuildingView({model: building});
		$container.html(newBuildingView.render().el);
		router.navigate('landlords/'+landlord_id+'/new_building');
		return false;
	}
});	