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
		this.model.on('sync', function(model, response, options){
			if(response.errors){
				// render errors in view
			}else{
				self.displayBuilding(model, response);
			}
		});
		this.model.on('invalid', function(model){
			console.log('invalid callback');
		});
	},
	createBuilding: function(event){
		var model = this.model;
		this.assignValues(event);
		if(!model.file){
			model.save();
		};
		return false;
	},
	assignValues: function(event){
		var model = this.model;
		model.file = false;
		for(x=0;x < event.target.length-1; x++){
			var val, key = event.target[x].name;
			console.log(key);
			if(key === 'units_spreadsheet'){
				if(!event.target[x].value){
					break;
				}
				var file = event.target[x].files[0];
				val = model.readFile(file);
			}else{
				val = event.target[x].value;
				model.set(key, val);
			}
		}
	},
	displayBuilding: function(model, response){	
		var showBuildingdView = new backbone_data.Views.ShowBuildingView({model: model, response: response});
		$container.html(showBuildingView.render().el);
	},
	displayErrors: function(model_object){

	}
});