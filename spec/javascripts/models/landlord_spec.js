describe('Landlord', function(){
	
	// 	   t.string   "name",               limit: 50
	//     t.string   "email",              limit: 70
	//     t.datetime "created_at"
	//     t.datetime "updated_at"
	//     t.string   "salt"
	//     t.string   "encrypted_password"
	//     t.string   "stripe_token"
	
	describe('Validations', function(){
		
		describe('a valid landlord object', function(){
		
			it('should be valid given properly formatted values', function(){
				var attrs = factories.landlord;
				var landlord = new backbone_data.Models.Landlord(attrs);
				landlord.isValid();
				expect(Object.size(landlord.validationError)).toEqual(0);												
			});
			
		});
		
		describe('an invalid landlord object', function(){
			
			var attrs = factories.landlord;
			var landlord;
			
			beforeEach(function(){
				landlord = new backbone_data.Models.Landlord(attrs);	
			});
			
			it('should not have a name attribute that is greter than 50 characters', function(){
				var long_name = new Array(52).join('a');
				landlord.set({name: long_name},{});
				landlord.isValid();
				expect(landlord.validationError['name']).toBeDefined();
			});

			it('should not have a blank name attribute', function(){
				landlord.set({name: ''},{});
				landlord.isValid();
				expect(landlord.validationError['name']).toBeDefined();
			});

			it('should not have a blank email attribute', function(){
				landlord.set({email: ''},{});
				landlord.isValid();
				expect(landlord.validationError['email']).toBeDefined();
			});

			it('should not have an invalid email format', function(){
				landlord.set({email: 'invalidemail'});
				landlord.isValid();
				expect(landlord.validationError['email']).toBeDefined();
			});

			it('should have a matching email and email confirmation', function(){
				landlord.set({email: 'valid@email.com', email_confirmation: 'notmatching@email.com'});
				landlord.isValid();
				expect(landlord.validationError['email']).toBeDefined();
			});
			
		});
		
	});
});