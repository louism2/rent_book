describe("Building", function(){
	
	describe('A valid building object', function(){
		
		it('should be valid given properly formatted values', function(){
			var attrs = factories.building;
			var building = new backbone_data.Models.Building(attrs);
			building.isValid();
			expect(Object.size(building.validationError)).toEqual(0);
		});
	
	});
	
	describe('building validations', function(){
		
		var attrs = factories.building;
		var building;
		
		beforeEach(function(){
			building = new backbone_data.Models.Building(attrs);	
		});
		
		it('should not be valid if the name attribute is over 50 characters', function(){
			var long_name = new Array(52).join('a');
			building.set({name: long_name});
			building.isValid();
			expect(building.validationError['name']).toBeDefined();
		});
		
		it('should not be valid if the name attribute is blank', function(){
			var blank_name = '';
			building.set({name: blank_name});
			building.isValid();
			expect(building.validationError['name']).toBeDefined();
		});		
		
		it('should not be valid if street_address attribute is blank', function(){
			var blank_address = '';
			building.set({street_address: blank_address});
			building.isValid();
			expect(building.validationError['street_address']).toBeDefined();
		});
		
		it('should not be valid if street_address attribute is longer than 50 characters', function(){
			var long_address = new Array(52).join('a');
			building.set({street_address: long_address});
			building.isValid();
			expect(building.validationError['street_address']).toBeDefined();
		});
		
		it('should not be valid if city attribute is longer than 40 characters', function(){
			var long_city = new Array(42).join('a');
			building.set({city: long_city});
			building.isValid();
			expect(building.validationError['city']).toBeDefined();
		});
		
		it('should not be valid if city attribute is blank', function(){
			var blank_city = '';
			building.set({city: blank_city});
			building.isValid();
			expect(building.validationError['city']).toBeDefined();
		});
		
		it('should not be valid if state attribute is longer than 2 characters', function(){
			var long_state = new Array(4).join('a');
			building.set({state: long_state});
			building.isValid();
			expect(building.validationError['state']).toBeDefined();
		});
		
		it('should not be valid if state attribute is blank', function(){
			var blank_state = '';
			building.set({state: blank_state});
			building.isValid();
			expect(building.validationError['state']).toBeDefined();
		});		
		
		it('should not be valid if address attribute is longer than 5 characters', function(){
			var long_zip = new Array(7).join('a');
			building.set({zip_code: long_zip});
			building.isValid();
			expect(building.validationError['zip_code']).toBeDefined();
		});
		
		it('should not be valid if zip_code attribute is blank', function(){
			var blank_zip = '';
			building.set({zip_code: blank_zip});
			building.isValid();
			expect(building.validationError['zip_code']).toBeDefined();
		});		
		
	});
	
	
	
	
});