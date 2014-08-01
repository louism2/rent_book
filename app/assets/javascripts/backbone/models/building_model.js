backbone_data.Models.Building = Backbone.Model.extend({
	defaults: {
		name: "",
		street_address: "",
		city: "",
		state: "",
		zip_code: "",
		data:"",
		filename:""
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
		// if(attributes.name.length === 0){
		// 	buildMessage(errors,'name',"the name can't be blank");	
		// }
		// 	if(attributes.street_address.length === 0){
		// 		buildMessage(errors,'street_address',"the address can't be blank");	
		// 	}
		// 	if(attributes.street_address.length > 50){
		// 		buildMessage(errors,'street_address',"the address can't be more than 50 characters");	
		// 	}
		if(Object.size(errors)){
			return errors;
		}else{
			// do something else on successful validation
		}
	}
	
})