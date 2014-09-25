function testRouteTriggerOnUrlMatch(router, url, function_name){
	var routeSpy = jasmine.createSpy('dummy');
	router.navigate("elsewhere");
	router.bind("route:"+function_name, routeSpy);
   	router.navigate(url, true);
    expect(routeSpy).toHaveBeenCalled();
}

function delete_cookie(name) {
  document.cookie = name+'=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function setupNamespace(length){
	var b_attrs = factories.building;
	var buildings = [];
	for(var x = 0; x < length; x++){
		var building = new backbone_data.Models.Building(b_attrs);
		building.set({id: x});
		buildings.push(building);
	}
	
	window.ns = {
		landlord: new backbone_data.Models.Landlord(factories.landord),
		buildingsCollection: new backbone_data.Collections.BuildingsCollection(buildings)
	}
}

factories = {
	landlord: {name: 'Louie Mancini', email: 'louiscmancini@gmail.com', email_confirmation: 'louiscmancini@gmail.com', 
			   password: 'Music123', password_confirmation: 'Music123'},
	building: {name: 'The Kennedy', street_address: "907 NE 45th St", city: 'Seattle', state: 'WA', zip_code: '98105'},
	building_2: {name: 'The Second Building', street_address: "907 NE 45th St", city: 'Seattle', state: 'WA', zip_code: '98105'},
	tenant: {name: 'Louie Mancini', email: 'louiscmancini@gmail.com', email_confirmation: 'louiscmancini@gmail.com', date_of_birth: '12-07-1984', stripe_token: 'jklFDAIEad123nfddk', 
			 password: 'Music123', password_confirmation: 'Music123'}
}

window.router = new backbone_data.Routers.ApplicationRouter();