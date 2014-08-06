function testRouteTriggerOnUrlMatch(router, url, function_name){
	var spy = spyOn(router, function_name);//.and.callThrough();
	pushStateSpy = spyOn(window.history, 'pushState');
    router.navigate(url, true);
    expect(spy).toHaveBeenCalled();
}

factories = {
	landlord: {name: 'Louie Mancini', email: 'louiscmancini@gmail.com', email_confirmation: 'louiscmancini@gmail.com', 
				password: 'Music123', password_confirmation: 'Music123'},
	building: {name: 'The Kennedy', street_address: "907 NE 45th St", city: 'Seattle', state: 'WA', zip_code: 98105}
}