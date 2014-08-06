describe('Application Router', function(){

	var router = new backbone_data.Routers.ApplicationRouter();
	Backbone.history.start({pushState: true});
	
	describe('expected function for matching route', function(){
		
		it("should match 'home' to the 'homepage' function", function () {
	        expect(router.routes['homepage']).toEqual('home');
			//testRouteTriggerOnUrlMatch(router, 'homepage', 'home');
			
	    });
		
		it("should match 'landlords/new' to the 'new_landlord' function", function () {
	        expect(router.routes['landlords/new']).toEqual('new_landlord');
	    });	
	
		it("should match 'landlords/:landlord_id/new_building' to the 'new_building' function", function(){
			expect(router.routes['landlords/:landlord_id/new_building']).toEqual('new_building');
		});
		
		it("should match 'landlords/:landlord_id' to the 'show_landlord' function", function(){
			expect(router.routes['landlords/:landlord_id']).toEqual('show_landlord');
		});
	
	});
	
	describe('functions being triggered by a matching route', function(){
		
		it('should work', function(){
			var routeSpy = jasmine.createSpy('dummy')
			router.navigate("elsewhere");
			router.bind("route:home", routeSpy);
		   	router.navigate("homepage", true);
		    expect(routeSpy).toHaveBeenCalled();
		    //expect(routeSpy).toHaveBeenCalled();	
		})
		
		it('should work', function(){
			var routeSpy = jasmine.createSpy('dummy')
			router.navigate("elsewhere");
			router.bind("route:home", routeSpy);
		   	router.navigate("something else", true);
		    expect(routeSpy).toHaveBeenCalled();
		    //expect(routeSpy).toHaveBeenCalled();	
		})
		
		
		// it('should trigger the home function', function(){
		// 
		// });
		// 
		// it('should trigger the new_landlord function', function(){
		// 	loadFixtures('base.html');
		// 	window.$container = $('#content_container');
		// 	testRouteTriggerOnUrlMatch(router, 'landlords/new', 'new_landlord');
		// });
		// 
		// it("should trigger the new_building function", function(){
		// 	loadFixtures('base.html');
		// 	window.$container = $('#content_container');
		// 	testRouteTriggerOnUrlMatch(router, 'landlords/1/new_building', 'new_building');	
		// });
		
	});
	
	describe('view function being rendered', function(){
		
		// it('should render the "new" template for the "landlords/new" url', function(){
		// 	loadFixtures('base.html');
		// 	//window.$container = $('#content_container');
		// 	router.navigate('landlords/new',{trigger: true});
		// 	var d = $('#content_container');
		// });
		
	});

});