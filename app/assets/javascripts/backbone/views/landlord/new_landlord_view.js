backbone_data.Views.NewLandlordView = Backbone.View.extend({
	template: JST["landlords/new"],	
	events: {
		'submit #landlord_form':'createLandlord'
	},
	initialize: function(options){
		var self = this;
		this.model.on('sync', function(model, response, options){
			if(response.errors){
				// render errors in view
			}else{
				self.displayLandlord(model, response);
			}
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
		if(!model.save(model.attributes)){
			this.displayErrors(model);
		};
		return false;
	},
	displayLandlord: function(model, response){	
		var showLandlordView = new backbone_data.Views.ShowLandlordView({model: model, response: response});
		$container.html(showLandlordView.render().el);
	},
	displayErrors: function(model_object){
		
	}
});