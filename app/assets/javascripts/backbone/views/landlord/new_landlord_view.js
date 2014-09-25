backbone_data.Views.NewLandlordView = Backbone.View.extend({
	template: JST["landlords/new"],	
	events: {
		'submit #landlord_form':'createLandlord'
	},
	initialize: function(options){
		var self = this;
		self.model.on('sync', function(model, response, options){
			if(response.errors){
				self.displayErrors(response.errors);
			}else{
				model.set({id: response.id});
				self.displayLandlord(model, response);
			}
		});
		self.model.on('invalid', function(model){
			self.displayErrors(model);
		});
	},
	render: function(){
		this.$el.html(this.template(this.model.attributes));
		return this
	},
	createLandlord: function(event){
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
	displayLandlord: function(model, response){	
		ns.landlord = model;
		ns.buildingsCollection = new backbone_data.Collections.BuildingsCollection();
		var showLandlordView = new backbone_data.Views.ShowLandlordView({model: model, response: response});
		$container.html(showLandlordView.render().el);
		router.navigate('/landlords/'+model.id);
	},
	displayErrors: function(model_object){
		
	}
});