describe('receivable', function(){
	
	describe('A valid receivable object', function(){
		
		it('should be valid given properly formatted values', function(){
			var attrs = factories.payment;
			var payment = new backbone_data.Models.Payment(attrs);
			payment.isValid();
			expect(Object.size(payment.validationError)).toEqual(0);
		});
	
	});
	
	describe('payment validations', function(){
		
		var attrs = factories.payment;
		var payment;
		
		beforeEach(function(){
			payment = new backbone_data.Models.Payment(attrs);	
		});
		
		it('should not be valid if the tenant_id attribute is blank', function(){
			payment.set({tenant_id: ''});
			payment.isValid();
			expect(payment.validationError['tenant_id']).toBeDefined();
		});
		
		it('should not be valid if the receivable_id attribute is blank', function(){
			payment.set({receivable_id: ''});
			payment.isValid();
			expect(payment.validationError['receivable_id']).toBeDefined();
		});
		
		it('should not be valid if the amount attribute is blank', function(){
			payment.set({amount: ''});
			payment.isValid();
			expect(payment.validationError['amount']).toBeDefined();
		});
	
	});
	
});	