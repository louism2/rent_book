describe('the sign_in form', function(){
	
	it('should default to signing a user in as a tenant', function(){
		var view = new backbone_data.Views.SignInView();
		view.render();
		expect(view.$el.find('.toggle_sign_in_form').length).toBe(1);
		expect(view.$el.find('#sign_in_form > input[type="hidden"]').val()).toEqual('tenant');
	});
	
	it('should switch the link and form value to landlord if the link is clicked', function(){
		var view = new backbone_data.Views.SignInView();
		view.render();
		var link = view.$el.find('.toggle_sign_in_form');
		var hidden_field = view.$el.find('#sign_in_form > input[type="hidden"]');
		link.click();
		expect(link.text()).toEqual('Sign in as Tenant');
		expect(link.data('id')).toEqual('tenant')
		expect(hidden_field.val()).toEqual('Landlord');
	});
	
	it('should switch the link and form value to tenant if the link is clicked', function(){
		var view = new backbone_data.Views.SignInView();
		view.render();
		var link = view.$el.find('.toggle_sign_in_form');
		var hidden_field = view.$el.find('#sign_in_form > input[type="hidden"]');
		link.click();
		link.click();
		expect(link.text()).toEqual('Sign in as Landlord');
		expect(link.data('id')).toEqual('landlord');
		expect(hidden_field.val()).toEqual('Tenant');
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