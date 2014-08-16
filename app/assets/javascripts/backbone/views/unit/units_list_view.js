backbone_data.Views.UnitsListView = Backbone.View.extend({
	tagName: 'table',
	template: JST['units/units_list_view'],
	unitsList: null,
	events: {
		'click th':'sortTable'
	},
	render: function(){
		this.$el.html(this.template());
		var units = this.model.models;
		var self = this;
		for(unit in units){
			var unit = units[unit]
			var view = new backbone_data.Views.UnitCapsuleView({model: unit});
			var $header_row = self.$el.find('tr:first-child');
			$header_row.after(view.render().el);		
		}
		this.unitsList = this.$el.find('tr:not(:first)');
		return this;
	},
	sortTable: function(e){
		
	}
});