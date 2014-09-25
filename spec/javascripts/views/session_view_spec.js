describe('the sign_in form', function(){ 
	
	var tenant = factories.tenant;
	var landlord = factories.landlord;
	
	var landlord_response = {
								status: 'success', 
								landlord: factories.landlord,
								data:{ buildings: [factories.building, factories.building_2] }
							}
							
	var tenant_response = {
								status: 'success',
								tenant: factories.tenant,
								data: {1: {unit_number:0, receivables: [{"unit_id"=>"1", "id"=>"1", "balance"=>"1000.00", "amount"=>"100.00", "tenant_id"=>"96", "created_at"=>"2014-09-23 03:58:13.387651"}, {"unit_id"=>"1", "id"=>"1", "balance"=>"1000.00", "amount"=>"100.00", "tenant_id"=>"96", "created_at"=>"2014-09-23 03:40:04.722676"}]}}}				
						  }
						
						
		

	describe('populating the user objects', function(){
	
		describe('a tenant', function(){
		
			it('should correctly populate a user on the call to initializeUser', function(){
				loadFixtures('base.html');
				var server = sinon.fakeServer.create();
				document.cookie = "remember_token_tenant=some_dummy_value";
				backbone_data.Helpers.initializeUser();
				server.requests[0].respond(
					200, 
					{ "Content-Type": "application/json" }, 
					JSON.stringify(tenant_response)
				);
				
				expect(window.object_namespace.tenant).not.toBe(null);
				expect(window.ns.paymentsCollection).not.toBe(null);
				expect(window.ns.paymentsCollection.length).toEqual(2);				
				
				delete_cookie('remember_token_tenant');
				server.restore();
				router.navigate('');
			});
			
		});
		
		describe('a landlord', function(){
			
			it('should correctly populate a user on the call to initializeUser', function(){
				loadFixtures('base.html');
				var server = sinon.fakeServer.create();
				document.cookie = "remember_token_landlord=some_dummy_value";
				backbone_data.Helpers.initializeUser();
				server.requests[0].respond(
					200, 
					{ "Content-Type": "application/json" }, 
					JSON.stringify(landlord_response)
				);
			
				expect(window.object_namespace.tenant).not.toBe(null);
				expect(window.ns.paymentsCollection).not.toBe(null);
				expect(window.ns.paymentsCollection.length).toEqual(2);

				delete_cookie('remember_token_tenant');
				server.restore();
				router.navigate('');
			});
			
		});
		
		
	});
	
	describe('signing in a user', function(){
		
		it('should sign in a landlord and call the showUser method on success', function(){
			var server = sinon.fakeServer.create();
			loadFixtures('base.html');
			$container = $('#content_container');
		
			var spy = spyOn(backbone_data.Views.SignInView.prototype, 'showUser');
			
			var view = new backbone_data.Views.SignInView();
			$container.html(view.render().el);
			
			// change form to landlord
			$('#toggle_sign_in_form').click();
			
			var fields = $container.find('input[type="text"]');
			for(var x = 0; x < fields.length; x++){
				$(fields[x]).val(tenant[fields[x].name])
			}		
			
			$('#sign_in_form').submit();
			server.requests[0].respond(
				200, 
				{ "Content-Type": "application/json" }, 
				JSON.stringify(landlord_response)
			);	
			
			expect(spy).toHaveBeenCalled();
			server.restore();
		});
		
		// it('should sign in a tenant and populate the given namespace objects', function(){
		// 
		// 
		// });
		
	});
	
	it('should default to signing a user in as a tenant', function(){
		var view = new backbone_data.Views.SignInView();
		view.render();
		expect(view.$el.find('#toggle_sign_in_form').length).toBe(1);
		expect(view.$el.find('#sign_in_form > input[type="hidden"]').val()).toEqual('Tenant');
	});
	
	it('should switch the link and form value to landlord if the link is clicked', function(){
		var view = new backbone_data.Views.SignInView();
		view.render();
		var link = view.$el.find('#toggle_sign_in_form');
		var hidden_field = view.$el.find('#sign_in_form > input[type="hidden"]');
		link.click();
		expect(link.text()).toEqual('Sign in as Tenant');
		expect(link.data('id')).toEqual('tenant')
		expect(hidden_field.val()).toEqual('Landlord');
	});
	
	it('should switch the link and form value to tenant if the link is clicked', function(){
		var view = new backbone_data.Views.SignInView();
		view.render();
		var link = view.$el.find('#toggle_sign_in_form');
		var hidden_field = view.$el.find('#sign_in_form > input[type="hidden"]');
		link.click();
		link.click();
		expect(link.text()).toEqual('Sign in as Landlord');
		expect(link.data('id')).toEqual('landlord');
		expect(hidden_field.val()).toEqual('Tenant');
	});
	
	describe('clicking the create a user link', function(){
		
		it('should take a user to the new tenant form if the user clicks the create new account link', function(){
			var spy = spyOn(backbone_data.Views.NewTenantView.prototype, 'render').and.callThrough();
			var view = new backbone_data.Views.SignInView();
			view.render();
			var $link = view.$el.find('#create_account_link');
			$link.click();
			expect(spy).toHaveBeenCalled();
		});
		
		it('should take a user to the new landlord form if the user clicks the create new account link', function(){
			loadFixtures('base.html');
			var $container = $('#content_container');
			var spy = spyOn(backbone_data.Views.NewLandlordView.prototype, 'render').and.callThrough();
			var view = new backbone_data.Views.SignInView();
			$container.html(view.render().el);
			var $toggle = $container.find('#toggle_sign_in_form'); 
			$toggle.click();  // now on landlord form
			var $link = $container.find('#create_account_link');
			$link.click();
			expect(spy).toHaveBeenCalled();
		});

		
	});
	
});

describe('the header navigation', function(){
	
	it('should display a sign_in link if there is no currently signed in user', function(){
		var view = new backbone_data.Views.HeaderNavigationView({ attributes: {signed_in: false} });
		view.render();
		expect(view.$el.find('#sign_in_link').length).toBe(1);
	});
	
	it('should display a sign_out link if the user is currently signed in', function(){
		var view = new backbone_data.Views.HeaderNavigationView({ attributes: {signed_in: true} });
		view.render();
		expect(view.$el.find('#sign_out_link').length).toBe(1);
	});
	
	// it('should sign the user out and redirect them to the homepage', function(){
	// 	var spy = spyOn(backbone_data.Views.HeaderNavigationView.prototype,'').and.callThrough();
	// 	var view = new backbone_data.Views.HeaderNavigationView({ attributes: {signed_in: true} });
	// 	view.render();
	// });

});