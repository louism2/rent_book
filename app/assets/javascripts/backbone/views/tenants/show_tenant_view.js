backbone_data.Views.ShowTenantView = Backbone.View.extend({
	template: JST['tenants/show'],
	render: function(){
		this.$el.html(this.template(this.model.attributes));
		this.drawReceivablesList();
		return this;
	},
	drawReceivablesList: function(){
		var self = this.$el;
		var units = ns.tenant.units;
		if(units.length){
			for(unit in units){
				// {id: "17", name: "The Kennedy", unit_number: "23A", unit_id: "2"} 
				var unit_info = units[unit];
				var $list = $('<ul></ul>');
				$list.append(JST['tenants/_unit_list_header'](unit_info));
				var receivables = ns.receivablesCollection.where({unit_id: unit_info.unit_id})
				if(receivables.length){
					for(receivable in receivables){
						var rec = receivables[receivable];
						$list.append(JST['tenants/_rec_line_item'](rec.attributes));
						var payments = ns.paymentsCollection.where({receivable_id: rec.id});
						if(payments.length){
							for(payment in payments){
								var payment = payments[payment];
								$list.append(JST['tenants/_payment_line_item'](payment.attributes))
							}
						}else{
							//$list.append('<p>no payments made for this month</p>');
						}
					}
				}else{
					//$list.append('<p>no history for this unit</p>');
				}
				self.append( $list.css({display: 'block'}) );
			}// end unit loop
		}else{
			//$list.append('<p>no rental history</p>');
		}	
		
		
		
	}
});