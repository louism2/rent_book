backbone_data.Views.NewTenantView = Backbone.View.extend({
	template: JST['tenants/new'],
	events: {
		'submit #tenant_form':'createTenant'
	},
	initialize: function(options){
		var self = this;
		self.model.on('sync', function(model, response, options){
			if(response.errors){	
				self.displayErrors(response.errors);
			}else{
				model.set({id: response.id});
				self.displayTenant();
			}
		});
		self.model.on('invalid', function(model){
			// invalid tenant
		});
	},
	render: function(){
		this.$el.html(this.template(this.model.attributes));
		return this
	},
	createTenant: function(event){
		var self = this;
		var model = this.model;
		for(x=0;x < event.target.length-1; x++){
			var key = event.target[x].name; 
			var val = event.target[x].value;	
			model.set(key, val);		
		}
		model.save(model.attributes);
		return false;
	},
	displayTenant: function(){
		var showTenantView = new backbone_data.Views.ShowTenantView({model: this.model});
		$container.html(showTenantView.render().el);
	}, 
	displayErrors: function(errros){
		
	}
	
});