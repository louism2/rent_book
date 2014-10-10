describe('receivable', function(){
	
	describe('A valid receivable object', function(){
		
		it('should be valid given properly formatted values', function(){
			var attrs = factories.receivable;
			var receivable = new backbone_data.Models.Receivable(attrs);
			receivable.isValid();
			expect(Object.size(receivable.validationError)).toEqual(0);
		});
	
	});
	
	describe('building validations', function(){
		
		var attrs = factories.receivable;
		var receivable;
		
		beforeEach(function(){
			receivable = new backbone_data.Models.Receivable(attrs);	
		});
		
		it('should not be valid if the unit_id is not present', function(){
			receivable.set({unit_id: ''});
			receivable.isValid();
			expect(receivable.validationError['unit_id']).toBeDefined();			
		});
		
		it('should not be valid if the balance is not present', function(){
			receivable.set({balance: ''});
			receivable.isValid();
			expect(receivable.validationError['balance']).toBeDefined();			
		});		

	});	
	
});