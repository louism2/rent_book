// t.string   "name",       limit: 50
// t.string   "address",    limit: 50
// t.integer  "landlord_id"
// t.datetime "created_at"
// t.datetime "updated_at"

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
		
		it('should not be valid if address attribute is blank', function(){
			var blank_address = '';
			building.set({street_address: blank_address});
			building.isValid();
			expect(building.validationError['street_address']).toBeDefined();
		});
		
		it('should not be valid if address attribute is longer than 50 characters', function(){
			var long_address = new Array(52).join('a');
			building.set({street_address: long_address});
			building.isValid();
			expect(building.validationError['street_address']).toBeDefined();
		});
		
	});
	
	
	
	
});