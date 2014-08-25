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

});