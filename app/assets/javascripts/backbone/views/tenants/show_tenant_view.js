backbone_data.Views.ShowTenantView = Backbone.View.extend({
	template: JST['tenants/show'],
	render: function(){
		this.$el.html(this.template(this.model.attributes));
		this.drawReceivablesList();
		return this;
	},
	drawReceivablesList: function(){
		var self = this.$el;
		var receivables = ns.receivablesCollection;
		if(receivables.length){
			for(var x=0; x < receivables.length; x++){
				var rec = receivables.models[x];
				var payments = ns.paymentsCollection.where({receivable_id: rec.id});
				var $list = $('<ul></ul>');
				$list.append(JST['tenants/_rec_line_item'](rec.attributes));
				if(payments.length){
					for(x in payments){
						$list.append( JST['tenants/_payment_line_item'](payments[x].attributes) );
					}	
				}else{
					$list.append('<li>no payments made for this bill</li>');
				}
				self.append($list);
			}
		}else{
			// display a no receivables message
		}
		
		
	}
});