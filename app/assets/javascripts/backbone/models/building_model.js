backbone_data.Models.Building = Backbone.Model.extend({
	defaults: {
		name: "",
		street_address: "",
		city: "",
		state: "",
		zip_code: "",
	},
	initialize: function(attributes, options){
		this.url = this.id ? '/buildings/'+this.id : '/buildings'; 	
	},
	toJSON: function() {
	    return {building: _.clone(this.attributes)}
	},
	parse: function(response){
		return response.building;
	},
	validate: function(attributes){
		var errors = {};
		var buildMessage = backbone_data.Helpers.buildMessage;
		if(attributes.name.length > 50){
			buildMessage(errors,'name',"the name can't be more than 50 characters");	
		}
		if(attributes.name.length === 0){
			buildMessage(errors,'name',"the name can't be blank");	
		}
		if(attributes.street_address.length === 0){
			buildMessage(errors,'street_address',"the address can't be blank");	
		}
		if(attributes.street_address.length > 50){
			buildMessage(errors,'street_address',"the address can't be more than 50 characters");	
		}
		if(attributes.city.length > 40){
			buildMessage(errors,'city',"the city can't be more than 40 characters");	
		}
		if(attributes.city.length === 0){
			buildMessage(errors,'city',"the city can't be blank");	
		}
		if(attributes.state.length > 2){
			buildMessage(errors,'state',"the state can't be more than 2 characters");	
		}
		if(attributes.state.length === 0){
			buildMessage(errors,'state',"the state can't be blank");	
		}		
		if(attributes.zip_code.length > 5){
			buildMessage(errors,'zip_code',"the zip code can't be more than 2 characters");	
		}
		if(attributes.zip_code.length === 0){
			buildMessage(errors,'zip_code',"the zip code can't be blank");	
		}		
		
		
		
		
		if(Object.size(errors)){
			return errors;
		}else{
			// do something else on successful validation
		}
	}
	
})