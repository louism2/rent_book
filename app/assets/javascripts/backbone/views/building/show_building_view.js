backbone_data.Views.ShowBuildingView = Backbone.View.extend({
	template: JST['buildings/show'],
	events: {
		
	},
	initialize: function(){
		this.unitsCollection = null;
		this.tenantsCollection = null;
	},
	render: function(){
		this.$el.html(this.template(this.model.attributes));
		this.fetchBuildingData();
		return this;
	},
	fetchBuildingData: function(){
		this.model.fetch({success: function(data){
			this.buildUnitsCollection(data.units);
			this.buildTenantsCollection(data.tenants);
		}, failure: function(){
			
		}});
	},
	buildUnitsCollection: function(units){
		
	},
	buildTenantsCollection: function(tenants){
		
	}
})