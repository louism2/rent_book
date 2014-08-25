backbone_data.Views.UnitCapsuleView = Backbone.View.extend({
	template: JST['units/capsule'],
	tagName: 'tr',
	render: function(){
		var attrs = this.model.attributes;
		this.$el.data('search-term',{'unit-number': attrs.unit_number, balance: attrs.balance, 
					  'monthly-rent': attrs.monthly_rent, 'tenant-name': attrs.name}).html(this.template(attrs));
		return this;
	}
})