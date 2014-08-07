function testRouteTriggerOnUrlMatch(router, url, function_name){
	var routeSpy = jasmine.createSpy('dummy')
	router.navigate("elsewhere");
	router.bind("route:"+function_name, routeSpy);
   	router.navigate(url, true);
    expect(routeSpy).toHaveBeenCalled();
}

function setupNamespace(){
	var b_attrs = factories.building;
	var building = new backbone_data.Models.Building(b_attrs);
	window.ns = {
		landlord: new backbone_data.Models.Landlord(factories.landord),
		buildingsCollection: new backbone_data.Collections.BuildingsCollection([building])
	}
}
factories = {
	landlord: {name: 'Louie Mancini', email: 'louiscmancini@gmail.com', email_confirmation: 'louiscmancini@gmail.com', 
				password: 'Music123', password_confirmation: 'Music123'},
	building: {name: 'The Kennedy', street_address: "907 NE 45th St", city: 'Seattle', state: 'WA', zip_code: 98105}
}