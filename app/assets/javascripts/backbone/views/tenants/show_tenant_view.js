backbone_data.Views.ShowTenantView = Backbone.View.extend({
	template: JST['tenants/show'],
	render: function(){
		this.$el.html(this.template(this.model.attributes));
		return this;
	}
});