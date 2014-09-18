backbone_data.Collections.UnitsCollection = Backbone.Collection.extend({
	model: backbone_data.Models.Unit,
	initialize: function(models, options){
		this.url = '/buildings/'+options.building_id;
		this.model = backbone_data.Models.Unit;
	},
	parse: function(response) {
		return response.units;
	},
	
});