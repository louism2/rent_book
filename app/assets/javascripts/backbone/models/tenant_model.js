backbone_data.Models.Tenant = Backbone.Model.extend({
	defaults: {
		name: '',
		email: '',
		date_of_birth: '',
		stripe_token: '',
		password: ''
	},
	validate: function(attributes){
		var errors = {};
		var buildMessage = backbone_data.Helpers.buildMessage;
		var testPassword = backbone_data.Helpers.testPassword; 
		var testEmail    = backbone_data.Helpers.testEmail;
		if(attributes.name.length === 0){
			buildMessage(errors,'name',"your name can't be blank");
		}
		if(attributes.name.length > 50){
			buildMessage(errors,'name','your name can\'t be more than 50 characters');
		}
		if(attributes.email.length === 0){
			buildMessage(errors,'email',"your email can't be blank");
		}
		if(this.hasChanged("password")){
			if(!testPassword(attributes.password)){
				buildMessage(errors,'password',"your account must have a password in the proper format");
			}
			if(attributes.password_confirmation != attributes.password){
				buildMessage(errors,'password',"your password and password confimation must match");
			}	
		}
		if(this.hasChanged("email")){
			if(!testEmail(attributes.email)){
				buildMessage(errors,'email',"your account must have an email in the proper format");
			}
			if(attributes.email_confirmation != attributes.email){
				buildMessage(errors,'email',"your email and email confimation must match");
			}	
		}
		if(attributes.date_of_birth === ''){
			buildMessage(errors,'date_of_birth',"your date of birth can't be blank");
		}
		if(Object.size(errors)){
			return errors;
		}else{
			// do something else on successful validation
		}
		
	}
	
})