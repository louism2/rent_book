describe('NewLandlordView', function(){
	
	it('should render the proper template', function(){
		var view = backbone_data.Views.NewLandlordView.prototype;
		expect(view.template).toEqual(JST['landlords/new']);
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


describe('ShowLandlordView', function(){
	
	it('should render the proper template', function(){
		var view = backbone_data.Views.ShowLandlordView.prototype;
		expect(view.template).toEqual(JST['landlords/show']);
	});
	
	describe('conditional values in the new view', function(){

		describe('the list of properties', function(){
			
			it('should display list of properties if the landlord has any', function(){		
				setupNamespace(2);
				var landlord = ns.landlord
				var showLandlordView = new backbone_data.Views.ShowLandlordView({model: landlord});
				showLandlordView.render();
				expect(showLandlordView.$el.find('table tr').length).toEqual(2);
				expect(showLandlordView.$el.find('table tr:last td a').html()).toEqual('The Kennedy');
			});
			
			it('should display a message letting the user no that they have no buildings in the system', function(){
				setupNamespace(0);
				var landlord = ns.landlord
				var showLandlordView = new backbone_data.Views.ShowLandlordView({model: landlord});
				showLandlordView.render();
				expect(showLandlordView.$el.find('table tr').length).toEqual(1);
				expect(showLandlordView.$el.find('table tr:first th').html()).toEqual('No Properties In System');
			});
			
		});
		
	});
	
	describe('view events', function(){
		
		var landlord;
		var showLandlordView;
		var $container;
		
		beforeEach(function(){
			loadFixtures('base.html');
			$container = $('#content_container');
			setupNamespace(2);
			landlord = ns.landlord;
			showLandlordView = new backbone_data.Views.ShowLandlordView({model: landlord});
			showLandlordView.render();
		});
		
		afterEach(function(){
			router.navigate('');
		})
		
		it('should display the building show page if a building link is clicked on',function(){
			$container.html(showLandlordView.el);
			var viewSpy = spyOn(backbone_data.Views.ShowBuildingView.prototype, 'render');
			var $link = $container.find('.building_link');
			expect($link.length).toEqual(2);
			expect($link).toBeInDOM();
			$link[0].click('#building_link');
			expect(viewSpy).toHaveBeenCalled();
		});
		
	});

});