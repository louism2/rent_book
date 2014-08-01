backbone_data.Views.ShowLandlordView = Backbone.View.extend({
	template: JST['landlords/show'],
	initialize: function(options){
	},
	render: function(){
		this.$el.html(this.template(this.model.attributes));
		return this
	}
});	