describe('Application Router', function(){
	
	var router = new backbone_data.Routers.ApplicationRouter();
	Backbone.history.start({pushState: true});
	setupNamespace('landlord', 2);
	var container;
	
	beforeEach(function(){
		loadFixtures('base.html');
		$container = $('#content_container');	
	});
	
	afterEach(function(){
		router.navigate('');
	});
	
	describe('expected function for matching route', function(){
		
		it("should match 'home' to the 'homepage' function", function () {
	        expect(router.routes['homepage']).toEqual('home');
			testRouteTriggerOnUrlMatch(router, 'homepage', 'home');
		});
		
		it("should match 'landlords/new' to the 'new_landlord' function", function () {
	        expect(router.routes['landlords/new']).toEqual('new_landlord');
			testRouteTriggerOnUrlMatch(router, 'landlords/new', 'new_landlord');
	    });	
	
		it("should match 'landlords/:landlord_id/new_building' to the 'new_building' function", function(){
			expect(router.routes['landlords/:landlord_id/new_building']).toEqual('new_building');
			testRouteTriggerOnUrlMatch(router, 'landlords/1/new_building', 'new_building');
		});
		
		it("should match 'tenants/new' to the 'new_tenant' function", function(){
			expect(router.routes['tenants/new']).toEqual('new_tenant');
			testRouteTriggerOnUrlMatch(router, 'tenants/new', 'new_tenant');	
		});
	
	});
	
	describe('view function being rendered', function(){
		
		it('should render the "new" template for the "landlords/new" url', function(){
			var viewSpy = spyOn(backbone_data.Views.NewLandlordView.prototype,'render').and.callThrough();
			router.navigate('landlords/new',{trigger: true});
			expect(viewSpy).toHaveBeenCalled();
		});
		
		it('should render the "home" template for the "homepage" url', function(){
			var viewSpy = spyOn(backbone_data.Views.NewLandlordView.prototype,'render').and.callThrough();
			router.navigate('landlords/new',{trigger: true});
			expect(viewSpy).toHaveBeenCalled();
		});
		
		it('should render the "new" template for the "landlords/:id/new_building" url', function(){
			var viewSpy = spyOn(backbone_data.Views.NewBuildingView.prototype,'render').and.callThrough();
			router.navigate('landlords/1/new_building',{trigger: true});
			expect(viewSpy).toHaveBeenCalled();
		});
		
		it('should render the "new" template for the "tenants/new" url', function(){
			var viewSpy = spyOn(backbone_data.Views.NewTenantView.prototype,'render').and.callThrough();
			router.navigate('tenants/new',{trigger: true});
			expect(viewSpy).toHaveBeenCalled();
		});
		
		
	});

});