backbone_data.Views.UnitsListView = Backbone.View.extend({
	tagName: 'table',
	template: JST['units/units_list_view'],
	unitsList: null,
	events: {
		//'click th':'sortTable'
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
	// sortTable: function(e){
	// 	var unitsList = this.unitsList;
	// 	//console.log(unitsList);
	// 	var len = this.unitsList.length;
	// 	var field = e.currentTarget.dataset.value;
	// 	this.sortLoop(unitsList, len, field);
	// 	
	// },
	// sortLoop: function(unitsList, len, field){
	// 	var swap = false
	// 	for(var i = 0; i < len; i++){
	// 		if(i < len -2){
	// 			var $first = $(unitsList[i]);
	// 			var $second = $(unitsList[i+1]);		
	// 			var f_val = $first.data().searchTerm[field];			
	// 			var s_val = $second.data().searchTerm[field];
	// 			console.log('f_val : '+f_val);
	// 			console.log('s_val : '+s_val)				
	// 			if(f_val > s_val){
	// 				swap = true;
	// 				unitsList[i] = $second.html();
	// 				unitsList[i+1] = $first.html();
	// 			}
	// 		}
	// 	}
	// 	if(swap){
	// 		this.sortLoop(unitsList)
	// 	}else{
	// 
	// 	}
	// }
});