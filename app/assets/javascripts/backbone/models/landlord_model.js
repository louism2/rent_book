backbone_data.Models.Landlord = Backbone.Model.extend({
	defaults: {
		name: '',
		email: '',
		password: ''
	},
	initialize: function(attributes, options){
		this.url = this.id ? '/landlords/'+this.id : '/landlords'; 	
	},
	toJSON: function() {
	    return {landlord: _.clone(this.attributes)}
	},
	parse: function(response){
		return response.landlord;
	},
	validate: function(attributes){
		var errors = {};
		var buildMessage = backbone_data.Helpers.buildMessage;
		var testPassword = backbone_data.Helpers.testPassword;
		var testEmail    = backbone_data.Helpers.testEmail;	
		if(attributes.name.length > 50){
			buildMessage(errors,'name',"your name can't be more than 50 characters");
		}
		if(attributes.name.length === 0){
			buildMessage(errors,'name',"your account must have a name");
		}
		if(attributes.email.length === 0){
			buildMessage(errors,'email',"your account must have an email");
		}
		if(this.hasChanged("email")){
			if(!testEmail(attributes.email)){
				buildMessage(errors,'email',"your account must have an email in the proper format");
			}
			if(attributes.email_confirmation != attributes.email){
				buildMessage(errors,'email',"your email and email confimation must match");
			}	
		}
		if(this.hasChanged("password")){
			if(!testPassword(attributes.password)){
				buildMessage(errors,'password',"your account must have a password in the proper format");
			}
			if(attributes.password_confirmation != attributes.password){
				buildMessage(errors,'password',"your password and password confimation must match");
			}	
		}
		if(Object.size(errors)){
			return errors;
		}else{
			// do something else on successful validation
		}
	}
	
});