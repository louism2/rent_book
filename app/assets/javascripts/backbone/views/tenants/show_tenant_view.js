backbone_data.Views.ShowTenantView = Backbone.View.extend({
	template: JST['tenants/show'],
	render: function(){
		this.$el.html(this.template(this.attributes));
		return this;
	}
});