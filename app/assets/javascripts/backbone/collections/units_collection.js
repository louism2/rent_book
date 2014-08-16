backbone_data.Collections.UnitsCollection = Backbone.Collection.extend({
	initialize: function(models, options){
		this.url = '/buildings/'+options.building_id;
		this.model = backbone_data.Models.Unit;
	},
	parse: function(response) {
		return response.units;
	},
	
});