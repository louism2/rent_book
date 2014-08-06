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
		var landlord = new backbone_data.Models.Landlord();
		
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
		
		// it('should send an ajax request if the landlord is valid', function(){
		// 			var server = sinon.fakeServer.create();
		// 			var spy = spyOn(backbone_data.Views.ShowLandlordView.prototype,'render').and.callThrough();
		// 			
		// 			var t_landlord = new backbone_data.Models.Landlord();
		// 			var newLandlordView = new backbone_data.Views.NewLandlordView({model: t_landlord});
		// 			var view = newLandlordView.render();
		// 			for(key in attrs){
		// 				view.$('#'+key).val(attrs[key]);
		// 			}
		// 			view.$('#landlord_form').submit();
		// 			server.requests[0].respond(
		// 		        200,
		// 		        { "Content-Type": "application/json" },
		// 		        JSON.stringify([{ id: 1, text: "Provide examples", done: true }])
		// 			 );
		// 			expect(spy).toHaveBeenCalled();
		// 		});
		
		it('should not send an ajax request if the landlord is not valid', function(){
			var spy = spyOn(jQuery, 'ajax');
			var newLandlordView = new backbone_data.Views.NewLandlordView({model: landlord});
			var view = newLandlordView.render();
			for(key in attrs){
				view.$('#'+key).val(attrs[key]);
			}
			view.$('#name').val('');
			view.$('#landlord_form').submit();
			expect(spy).not.toHaveBeenCalled();
		});
		
	});
	
	describe('error messages', function(){
		
		//it('should not ') 
	
		
	});


});

describe('ShowLandlordView', function(){
	
	it('should render the proper template', function(){
		var attrs = factories.landlord;
		var landlord = new backbone_data.Models.Landlord(attrs);
		var showLandlordView = new backbone_data.Views.ShowLandlordView({model: landlord});
		expect(showLandlordView.template).toEqual(JST['landlords/show']);
	});
	
	describe('conditional values in the new view', function(){
		var attrs = factories.landlord;
		var landlord = new backbone_data.Models.Landlord(attrs);
		var showLandlordView = new backbone_data.Views.ShowLandlordView({model: landlord});
		showLandlordView.render();
		
		it('should display a form with the proper text_fields', function(){		
			loadFixtures('base.html');
			var $container = $('#content_container');
			$container.html(showLandlordView.el);
			expect($container.find('h1')[0].innerHTML).toEqual('Your Account');
		});
		
	});

});