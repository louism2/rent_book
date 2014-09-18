backbone_data.Views.UnitsListView = Backbone.View.extend({
	tagName: 'table',
	template: JST['units/capsule'],
	events: {
		'click tr':'showUnit'
	},
	initialize: function(){
		
	},
	render: function(){
		this.$el.html(JST['units/units_list_view']());
		var $header_row = this.$el.find('tr:first-child');
		var unitsList = this.collection.models;
		var self = this;
		for(unit in unitsList){
			var unit = unitsList[unit];
			$header_row.after(self.template(unit.attributes));	
		}
		return this;
	},
	showUnit: function(event){
		var id = $(event.currentTarget).data()['search-term']['unit-id'];
		//console.log(this);
		var unit = this.collection.get(id);
		//console.log(unit);
		unit.fetch({success: function(){
			//console.log('success');
		}, error: function(){
			//console.log('errors');
		}})
		
	}

});