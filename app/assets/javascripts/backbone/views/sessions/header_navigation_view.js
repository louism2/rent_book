backbone_data.Views.HeaderNavigationView = Backbone.View.extend({
	tagName: 'span',
	template: JST['sessions/_header_nav'],
	events: {
		
	},
	render: function(){
		this.$el.html(this.template(this.attributes));
		return this;
	}
});