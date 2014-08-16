backbone_data.Views.ShowBuildingView = Backbone.View.extend({
	template: JST['buildings/show'],
	events: {
		'keyup #search_box':'filterRows'
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
		var self = this;
		var units = new backbone_data.Collections.UnitsCollection([], {building_id: this.model.id})
		units.fetch({success: function(){
			var unitsListView = new backbone_data.Views.UnitsListView({model: units});
			self.$el.append(unitsListView.render().el);
			self.unitsList = self.$el.find('table tr:not(:first)');
		},
		error: function(){
			
		}});
	},
	filterRows: function(e){
		this.unitsList.css('display','none');
		var search_text = e.currentTarget.value;
		var category = $('#search_select').val();
		self = this;
		self.unitsList.filter(function(){
			var res = self.findMatch($(this), search_text, category);
			return res;
		}).css('display','table-row');
	},
	findMatch: function($tr, search_text, data_attribute){
		var attribute_value = $tr.data().searchTerm[data_attribute];
		var re = new RegExp(search_text, 'i');
		return attribute_value.match(re);
	}
});