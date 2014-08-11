backbone_data.Views.NewBuildingView = Backbone.View.extend({
	template: JST['buildings/new'],
	events: {
		'submit #building_form':'createBuilding'
	},
	render: function(){
		this.$el.html(this.template(this.model.attributes));
		return this;
	},
	initialize: function(options){
		var self = this;
		self.model.on('sync', function(model, response, options){
			if(response.errors){
				// render errors in view
			}else{
				model.set({id: response.id});
				console.log(model);
				ns.buildingsCollection.add(model);
				self.displayBuilding(model);
			}
		});
		self.model.on('invalid', function(model){
			console.log('invalid callback');
			// render errors in view
		});
	},
	createBuilding: function(event){
		var model = this.model;
		for(x=0;x < event.target.length-1; x++){
			var key = event.target[x].name;
			var val = event.target[x].value;
			model.set(key, val);
		}
		model.save(model.attributes, {error: function(res){
			console.log('error');
		}});
		return false;
	},
	displayBuilding: function(model){	
		console.log(model);	
		var landlord_id = ns.landlord.id;
		// var showBuildingdView = new backbone_data.Views.ShowBuildingView({model: model});
		// $container.html(showBuildingView.render().el);
		// router.navigate('landlords/'+landlord_id+'/buildings/'+model.id);	
	},
	displayErrors: function(model_object){

	}
});