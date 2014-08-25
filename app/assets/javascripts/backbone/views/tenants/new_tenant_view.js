backbone_data.Views.NewTenantView = Backbone.View.extend({
	template: JST['tenants/new'],
	events: {
		'submit #tenant_form':'createTenant'
	},
	initialize: function(){
		var self = this;
		self.model.on('sync', function(model, response, options){
			console.log('sync called');
			if(response.errors){	
				// render errors in view
				// if landlord_id is nil then someone tried
				// to access the app in an unauthorized way
			}else{
				model.set({id: response.id});
				self.displayTenant();
			}
		});
		self.model.on('invalid', function(model){
			// render errors in view
		});
	},
	render: function(){
		this.model = new backbone_data.Models.Tenant();
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
		model.save(model.attributes, {error: function(res){
			console.log('error in new tenant');
		}});
		return false;
	},
	displayTenant: function(){
		var tenantShowView = new backbone_data.Views.TenantShowView({model: this.model});
		$container.html(tenantShowView.render().el);
	}
	
});