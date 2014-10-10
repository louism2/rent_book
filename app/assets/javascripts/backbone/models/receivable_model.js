backbone_data.Models.Receivable = Backbone.Model.extend({
	defaults: {
		unit_id: '',
		balance: ''
	},
	toJSON: function() {
	    return {receivable: _.clone(this.attributes)}
	},
	parse: function(response){
		return response.receivable;
	},
	validate: function(attributes){
		var errors = {};
		if(attributes.unit_id == ''){
			errors.unit_id = 'unit id is blank';
		}
		if(attributes.balance == ''){
			errors.balance = 'balance is blank';
		}
		if(Object.size(errors)){
			return errors;
		}else{
			// do something else on successful validation
		}
	}
});	