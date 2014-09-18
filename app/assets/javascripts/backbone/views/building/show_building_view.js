backbone_data.Views.ShowBuildingView = Backbone.View.extend({
	template: JST['buildings/show'],
	events: {
		'keyup #search_box':'filterRows'
	},
	initialize: function(){
		this.unitsCollection = null;
	},
	render: function(){
		this.$el.html(this.template(this.model.attributes));
		this.fetchBuildingData();
		return this;
	},
	fetchBuildingData: function(){
		var self = this;
		var unitsList = new backbone_data.Collections.UnitsCollection([], {building_id: this.model.id})
		unitsList.fetch({success: function(){
			if(unitsList.length){
				var unitsListView = new backbone_data.Views.UnitsListView({collection: unitsList});
				self.$el.append(unitsListView.render().el);
				this.unitsList = unitsListView.unitsList;
			}else{
				self.$el.append('<p id="no_units_message">This building has no units to display</p>');		
			}
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