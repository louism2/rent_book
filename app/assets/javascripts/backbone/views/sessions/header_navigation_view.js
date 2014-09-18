// All this does is render the the navigation link at the top of the page 
// depending on if the user is signed in or not.
backbone_data.Views.HeaderNavigationView = Backbone.View.extend({
	tagName: 'span',
	id: 'header_nav_links',
	template: JST['sessions/_header_nav'],
	render: function(){
		this.$el.html(this.template(this.attributes));
		return this;
	}

});