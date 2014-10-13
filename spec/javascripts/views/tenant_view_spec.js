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
		
		it('should send an ajax request if the tenant is valid', function(){
			var viewSpy = spyOn(backbone_data.Views.ShowTenantView.prototype,'render').and.callThrough();
			var tenant = new backbone_data.Models.Tenant();
			var newTenantView = new backbone_data.Views.NewTenantView({model: tenant});
			var $dom = newTenantView.render().$el;
			
			var server = sinon.fakeServer.create();
			
			for(key in attrs){
				$dom.find('#'+key).val(attrs[key]);
			}
			
			$dom.find('#tenant_form').submit();
			
			server.requests[0].respond(
				200, 
				{ "Content-Type": "application/json" },
				JSON.stringify({tenant: {id: 1}})
			);
			
			expect(viewSpy).toHaveBeenCalled();
			
		});
		
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
	
});	
	
describe('showTenantView', function(){
	
	var showTenantView;
	var $container;
	
	beforeEach(function(){
		setupNamespace('tenant', null);
		loadFixtures('base.html');
		$container = $('#content_container');

		var tenant = window.ns.tenant;
		showTenantView = new backbone_data.Views.ShowTenantView({model: tenant});
		$container.html(showTenantView.render().el);
	});
	
	it('should render the proper template', function(){
		expect(showTenantView.template).toEqual(JST['tenants/show']);		
	});

	it('should call the fetchBuildingData method on render', function(){
		var tenantSpy = spyOn(backbone_data.Views.ShowTenantView.prototype, 'drawReceivablesList');
		showTenantView.render();

		expect(tenantSpy).toHaveBeenCalled();
	});
	
	it('should display the Tenant\'s general info', function(){
		var header = showTenantView.$el.find('h2');
		expect(header.text()).toEqual('Louie Mancini');
		expect(header.next('span').text()).toEqual('louiscmancini@gmail.com');
	});
	
	describe("A tenant's list of receivables and payments", function(){
		
		describe("a list with multiple units and payments", function(){
			
			it('should display a list of recievables and payments if they exist', function(){
				var $lists = $container.find('ul');
				expect($lists.length).toEqual(2);
				expect($lists.first().find('li').length).toEqual(7);
				expect($lists.first().next().find('li').length).toEqual(7);					
			});
			
		});
		
		describe('receivables but no payments', function(){
			
			it('should display a "no payments made message"', function(){
				var tenant = 
			});
		
		
		});
		
		
	})
	
});

