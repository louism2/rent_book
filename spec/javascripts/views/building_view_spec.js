describe('NewBuildingView', function(){
	
	it('should render the proper template', function(){
		var building = new backbone_data.Models.Building();
		var newBuildingView = new backbone_data.Views.NewBuildingView({model: building});
		expect(newBuildingView.template).toEqual(JST['buildings/new']);
	});
	
	describe('conditional values in the view', function(){
		
		var building = new backbone_data.Models.Building();
		var newBuildingView = new backbone_data.Views.NewBuildingView({model: building});
		newBuildingView.render();
		
		it('should display a form with the proper text_fields', function(){		
			loadFixtures('base.html');
			var $container = $('#content_container');
			$container.html(newBuildingView.el);
			expect($container.find('h1')[0].innerHTML).toEqual('Create a new building');
			expect($container.find('#name')).toBeInDOM();
			expect($container.find('#street_address')).toBeInDOM();
			expect($container.find('#city')).toBeInDOM();
			expect($container.find('#state')).toBeInDOM();
			expect($container.find('#zip_code')).toBeInDOM();
		});
		
	});
	
	describe('new building form submittal', function(){
		
		var attrs = factories.building;
		var building = new backbone_data.Models.Building(attrs);
		
		it('should set the form values on the view\'s associated buildings object', function(){
			var spy = spyOn(jQuery, 'ajax');
			spyOn(backbone_data.Views.NewBuildingView.prototype, 'createBuilding').and.callThrough();
			var newBuildingView = new backbone_data.Views.NewBuildingView({model: building});
			var view = newBuildingView.render();
			for(key in attrs){
				view.$('#'+key).val(attrs[key]);
			}
			view.$('#building_form').submit();
			expect(backbone_data.Views.NewBuildingView.prototype.createBuilding).toHaveBeenCalled();
			expect(building.attributes).toEqual(attrs);
		});
		
		it('should send an ajax request if the Building is valid', function(){
			var server = sinon.fakeServer.create();
			var spy = spyOn(backbone_data.Views.ShowBuildingView.prototype,'render').and.callThrough();
			
			var t_Building = new backbone_data.Models.Building();
			var newBuildingView = new backbone_data.Views.NewBuildingView({model: t_Building});
			var view = newBuildingView.render();
			for(key in attrs){
				view.$('#'+key).val(attrs[key]);
			}
			view.$('#building_form').submit();
			server.requests[0].respond(
		        200,
		        { "Content-Type": "application/json" },
		        JSON.stringify([{ id: 1, text: "Provide examples", done: true }])
			 );
			expect(spy).toHaveBeenCalled();
		});
		
		it('should not send an ajax request if the Building is not valid', function(){
			var spy = spyOn(jQuery, 'ajax');
			var newBuildingView = new backbone_data.Views.NewBuildingView({model: Building});
			var view = newBuildingView.render();
			for(key in attrs){
				view.$('#'+key).val(attrs[key]);
			}
			view.$('#name').val('');
			view.$('#building_form').submit();
			expect(spy).not.toHaveBeenCalled();
		});
		
	});
	
	describe('error messages', function(){
		//it('should not ') 
	});

});

describe('ShowBuildingView', function(){
	var attrs = factories.building; attrs.id = 1;
	var building = new backbone_data.Models.Building(attrs);
	var showBuildingView = new backbone_data.Views.ShowBuildingView({model: building});

	it('should render the proper template', function(){
		expect(showBuildingView.template).toEqual(JST['buildings/show']);		
	});
	
	it('should call the fetchBuildingData method on render', function(){
		var buildingSpy = spyOn(backbone_data.Views.ShowBuildingView.prototype, 'fetchBuildingData');
		showBuildingView.render();
		
		expect(buildingSpy).toHaveBeenCalled();
	});
	
	describe('conditional_value in the view', function(){
		
		it('should display a list of units for the building if there are any', function(){
			var server = sinon.fakeServer.create();
			showBuildingView.render();
			
			server.requests[0].respond(200, { "Content-Type": "application/json" }, 
			JSON.stringify({units: [{landlord_id: 1, id: 2, unit_number: 101, monthly_rent: 1200 }, 
									{landlord_id: 1, id: 2, unit_number: 101, monthly_rent: 1200 }
						   ]});
			);	
			expect(showBuildingView.$el.)
			
			
		});

	});
	
});




