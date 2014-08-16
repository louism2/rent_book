// create_table "tenants", force: true do |t|
//   t.string   "name",          limit: 50
//   t.string   "email",         limit: 70
//   t.date     "date_of_birth"
//   t.string   "stripe_token",  limit: 50
//   t.datetime "created_at"
//   t.datetime "updated_at"
// end

describe('Tenants Model --', function(){
	
	describe('a valid tenant object --', function(){
		
		it('should be valid given properly formatted values', function(){
			var attrs = factories.tenant;
			var tenant = new backbone_data.Models.Tenant(attrs);
			tenant.isValid();
			expect(Object.size(tenant.validationError)).toEqual(0);
		});
	
	});
	
	describe('validations --', function(){
		
		var tenant;
		
		beforeEach(function(){
			var attrs = factories.tenant;
			tenant = new backbone_data.Models.Tenant(attrs)		
		});

		it('should be invalid if the name is blank', function(){
			tenant.set('name', '');
			tenant.isValid();
			expect(tenant.validationError['name']).toBeDefined();
		});
		
		it('should be invalid if the name is more than 50 characters', function(){
			var long_name = new Array(52).join('a');
			tenant.set('name',long_name);
			tenant.isValid();
			expect(tenant.validationError['name']).toBeDefined();
		});
		
		it('should be invalid if the email is blank', function(){
			tenant.set('email', '');
			tenant.isValid();
			expect(tenant.validationError['email']).toBeDefined();
		});
		
		it('should be invalid if the password is too short', function(){
			tenant.set('password','');
			tenant.isValid();
			expect(tenant.validationError['password']).toBeDefined();
		});
		
		it('should be invalid if the password doesn\'t have a capitol letter in it', function(){
			tenant.set('password','music123');
			tenant.isValid();
			expect(tenant.validationError['password']).toBeDefined();			
		});
		
		it('should be invalid if the password doesn\'t have a number in it', function(){
			tenant.set('password','Musicabc');
			tenant.isValid();
			expect(tenant.validationError['password']).toBeDefined();			
		});
		
		it('should be invalid if the email doesn\'t have an @ sign', function(){
			tenant.set('email','louiscmancinigmail.com');
			tenant.isValid();
			expect(tenant.validationError['email']).toBeDefined();
		});
		
		it('should be invalid if the email does end in a url suffix', function(){
			tenant.set('email','louiscmancini@gmailcom');
			tenant.isValid();
			expect(tenant.validationError['email']).toBeDefined();			
		});
		
		it('should be invalid if the date of birth is blank',function(){
			tenant.set('date_of_birth','');
			tenant.isValid();
			expect(tenant.validationError['date_of_birth']).toBeDefined();			
		});
	
	
	});

});