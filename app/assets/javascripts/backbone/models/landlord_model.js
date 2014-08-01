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
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if(!re.test(attributes.email)){
				buildMessage(errors,'email',"your account must have an email in the proper format");
			}
			if(attributes.email_confirmation != attributes.email){
				buildMessage(errors,'email',"your email and email confimation must match");
			}	
		}
		if(this.hasChanged("password")){
			var re = /\A(?=.*\d)(?=.*[a-zA-Z]).{8,}\Z/i;
			if(!re.test(attributes.password)){
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