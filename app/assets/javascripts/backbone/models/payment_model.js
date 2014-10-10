backbone_data.Models.Payment = Backbone.Model.extend({
	defaults: {
		tenant_id: '',
		receivable_id: '',
		amount: ''
	},
	toJSON: function() {
	    return {payment: _.clone(this.attributes)}
	},
	parse: function(response){
		return response.payment;
	},
	validate: function(attributes){
		errors = {};
		if(attributes.tenant_id == ''){
			errors.tenant_id = 'tenant_id cannot be blank';
		}
		if(attributes.receivable_id == ''){
			errors.receivable_id = 'receivable_id cannot be blank';
		}
		if(attributes.amount == ''){
			errors.amount = 'amount cannot be blank';
		}
		if(Object.size(errors)){
			return errors;
		}else{
			// do something else on successful validation
		}
		
	}	
});	