describe('NewTenantView', function(){
	
	var tenant = new backbone_data.Models.Tenant();
	var newTenantView = new backbone_data.Views.NewTenantView({model: tenant});
	
	it('should render the proper template', function(){
		expect(newTenantView.template).toEqual(JST['tenants/new']);
	});
	
	it('should have the proper form fields', function(){
		newTenantView.render();
		expect(newTenantView.$el.find('#name').length).toBe(1);
		expect(newTenantView.$el.find('#email').length).toBe(1);
		expect(newTenantView.$el.find('#email_confirmation').length).toBe(1)
		expect(newTenantView.$el.find('#date_of_birth').length).toBe(1);	
		expect(newTenantView.$el.find('#password').length).toBe(1);
		expect(newTenantView.$el.find('#password_confirmation').length).toBe(1);
		expect(newTenantView.$el.find('input[type="submit"]').length).toBe(1);
	});
	
	describe('new tenant form submittal', function(){
		
		var attrs = factories.tenant;
		delete attrs['stripe_token'];
		
		it('should set the form values on the view\'s associated tenant object', function(){
			var tenant = new backbone_data.Models.Tenant();
			var spy = spyOn(jQuery, 'ajax');
			spyOn(backbone_data.Views.NewTenantView.prototype, 'createTenant').and.callThrough();
			
			var newTenantView = new backbone_data.Views.NewTenantView({model: tenant});
			var view = newTenantView.render();
			
			for(key in attrs){
				view.$('#'+key).val(attrs[key]);
			}
			view.$('#tenant_form').submit();
			expect(spy).toHaveBeenCalled();
			expect(backbone_data.Views.NewTenantView.prototype.createTenant).toHaveBeenCalled();
			expect(view.model.attributes).toEqual(attrs);
		});
		
		// it('should send an ajax request if the tenant is valid', function(){
		// 	var viewSpy = spyOn(backbone_data.Views.ShowTenantView.prototype,'render');
		// 	var tenant = new backbone_data.Models.Tenant();
		// 	var newTenantView = new backbone_data.Views.NewTenantView({model: tenant});
		// 	var $dom = newTenantView.render().$el;
		// 	
		// 	var server = sinon.fakeServer.create();
		// 	
		// 	for(key in attrs){
		// 		$dom.find('#'+key).val(attrs[key]);
		// 	}
		// 	
		// 	$dom.find('#tenant_form').submit();
		// 	
		// 	server.requests[0].respond(
		// 		200, 
		// 		{ "Content-Type": "application/json" },
		// 		JSON.stringify({tenant: {id: 1}})
		// 	);
		// 	
		// 	expect(viewSpy).toHaveBeenCalled();
		// 	
		// });
		
		it('should not send an ajax request if the tenant is not valid', function(){
			var spy = spyOn(jQuery, 'ajax');
			var newtenantView = new backbone_data.Views.NewTenantView({model: tenant});
			var view = newTenantView.render();
			for(key in attrs){
				view.$('#'+key).val(attrs[key]);
			}
			view.$('#name').val('');
			view.$('#tenant_form').submit();
			expect(spy).not.toHaveBeenCalled();
		});
		
	});
	
	describe('error messages', function(){
		//it('should not ') 
	});
	
	describe('tenant show page', function(){
		
		it('should display the Tenant\'s general info', function(){
			var tenant = new backbone_data.Models.Tenant(factories.tenant);
			var view = new backbone_data.Views.TenantShowView({tenant: tenant});
			view.render();
			var header = view.find('h2');
			expect(header.text()).toEqual('Louie Manicni');
			expect(header.next('span').text()).toEqual('louiscmancini@gmail.com');
		});
		
		
	
		
	});
	
});