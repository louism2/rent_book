describe('NewLandlordView', function(){
	
	it('should render the proper template', function(){
		var landlord = new backbone_data.Models.Landlord();
		var newLandlordView = new backbone_data.Views.NewLandlordView({model: landlord});
		expect(newLandlordView.template).toEqual(JST['landlords/new']);
	});
	
	describe('conditional values in the new view', function(){
		
		var landlord = new backbone_data.Models.Landlord();
		var newLandlordView = new backbone_data.Views.NewLandlordView({model: landlord});
		newLandlordView.render();
		
		it('should display a form with the proper text_fields', function(){		
			loadFixtures('base.html');
			var $container = $('#content_container');
			$container.html(newLandlordView.el);
			expect($container.find('h1')[0].innerHTML).toEqual('Create a new account');
			expect($container.find('#name')).toBeInDOM();
			expect($container.find('#email')).toBeInDOM();
			expect($container.find('#email_confirmation')).toBeInDOM();
			expect($container.find('#password')).toBeInDOM();
			expect($container.find('#password_confirmation')).toBeInDOM();
		});
		
	});
	
	describe('new landlord form submittal', function(){
		
		var attrs = factories.landlord;
		var landlord;

		beforeEach(function(){
			landlord = new backbone_data.Models.Landlord();			
		});

		it('should set the form values on the view\'s associated landlord object', function(){
			var spy = spyOn(jQuery, 'ajax');
			spyOn(backbone_data.Views.NewLandlordView.prototype, 'createLandlord').and.callThrough();
			var newLandlordView = new backbone_data.Views.NewLandlordView({model: landlord});
			var view = newLandlordView.render();
			for(key in attrs){
				view.$('#'+key).val(attrs[key]);
			}
			view.$('#landlord_form').submit();
			expect(backbone_data.Views.NewLandlordView.prototype.createLandlord).toHaveBeenCalled();
			expect(landlord.attributes).toEqual(attrs);
		});
		
		it('should display error messages if the user inputs invalid data', function(){
			var spy = spyOn(backbone_data.Views.NewLandlordView.prototype, 'displayErrors');
			var newLandlordView = new backbone_data.Views.NewLandlordView({model: landlord});
			var view = newLandlordView.render();
			for(key in attrs){
				view.$('#'+key).val(attrs[key]);
			}
			view.$('#name').val('');
			view.$('#landlord_form').submit();
			expect(spy).toHaveBeenCalled();
		});
		
		describe('handling the response from the server', function(){
			
			var attrs = factories.landlord;
			var landlord = new backbone_data.Models.Landlord();			
					
			it('should display any errors recieved from the server', function(){
				var spy = spyOn(backbone_data.Views.NewLandlordView.prototype, 'displayErrors');
				var newLandlordView = new backbone_data.Views.NewLandlordView({model: landlord});
				var model = newLandlordView.model;
				var response = {errors: {key: 'value'}};
				newLandlordView.model.trigger('sync', model, response);
				expect(spy).toHaveBeenCalled();
			});
			
			it('should display the landlord given a response without an errors object', function(){
				var spy = spyOn(backbone_data.Views.NewLandlordView.prototype, 'displayLandlord');
				var newLandlordView = new backbone_data.Views.NewLandlordView({model: landlord});
				var model = newLandlordView.model;
				var response = {landlord: {id: 1}}
				newLandlordView.model.trigger('sync', model, response);
				expect(spy).toHaveBeenCalled();
			});
			
		});
		
	});

});


//server.requests[0].respond(
// describe('ShowLandlordView', function(){
// 	
// 	it('should render the proper template', function(){
// 		var attrs = factories.landlord;
// 		var landlord = new backbone_data.Models.Landlord(attrs);
// 		var showLandlordView = new backbone_data.Views.ShowLandlordView({model: landlord});
// 		expect(showLandlordView.template).toEqual(JST['landlords/show']);
// 	});
// 	
// 	describe('conditional values in the new view', function(){
// 		var attrs = factories.landlord;
// 		var landlord = new backbone_data.Models.Landlord(attrs);
// 		var showLandlordView = new backbone_data.Views.ShowLandlordView({model: landlord});
// 		showLandlordView.render();
// 		
// 		it('should display a form with the proper text_fields', function(){		
// 			loadFixtures('base.html');
// 			var $container = $('#content_container');
// 			$container.html(showLandlordView.el);
// 			expect($container.find('h1')[0].innerHTML).toEqual('Your Account');
// 		});
// 		
// 	});
// 
// });