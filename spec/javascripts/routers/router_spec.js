describe('Application Router', function(){

	var router = new backbone_data.Routers.ApplicationRouter();
	Backbone.history.start({pushState: true});
	
	describe('expected function for matching route', function(){
		
		it("should match 'home' to the 'homepage' function", function () {
	        expect(router.routes['homepage']).toEqual('home');
	    });
		
		it("should match 'landlords/new' to the 'new_landlord' function", function () {
	        expect(router.routes['landlords/new']).toEqual('new_landlord');
	    });	
	
	});
	
	describe('functions being triggered by a matching route', function(){
		
		it('should trigger the home function', function(){
			testRouteTriggerOnUrlMatch(router, 'homepage', 'home');
		});
		
		it('should trigger the new_landlord function', function(){
			loadFixtures('base.html');
			window.$container = $('#content_container');
			testRouteTriggerOnUrlMatch(router, 'landlords/new', 'new_landlord');
		});
		
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