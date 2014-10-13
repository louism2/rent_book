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

function setupNamespace(type, length){
	if(type == 'landlord'){
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
	}else{
		window.ns.tenant = new backbone_data.Models.Tenant(factories.tenant);
		window.ns.tenant.units = [];
		window.ns.paymentsCollection = new backbone_data.Collections.PaymentsCollection();
		window.ns.receivablesCollection = new backbone_data.Collections.ReceivablesCollection();
		var units = fullTenantResponse.data;
		for(unit in units){
			var unit_id = unit;
			var building = units[unit].building;
			building['unit_id'] = unit;
			// creates an array of units that the tenant has obligations for.  Referenced in the ReceivablesCollection by the unit_id
			ns.tenant.units.push(building);
			var receivables = units[unit].receivables; // Object {1: Object, 2: Object}
			for(rec in receivables){
				// receivables[rec] = Object {payments: Array[2], rec: Object}
				var attributes = receivables[rec].rec; 
				// add the receivable id and the unit id to the receivable attributes
				attributes['id'] = rec; 
				attributes['unit_id'] = unit_id 
	 			var receivable = new backbone_data.Models.Receivable(attributes);	
				window.ns.receivablesCollection.add(receivable);
				var payments = receivables[rec].payments;
				for(payment in payments){
					var attributes = payments[payment];
					attributes['receivable_id'] = rec
	 				var payment = new backbone_data.Models.Payment(attributes);
					ns.paymentsCollection.add(payment);
				}			
			}
		}
	}

}

factories = {
	landlord: {name: 'Louie Mancini', email: 'louiscmancini@gmail.com', email_confirmation: 'louiscmancini@gmail.com', 
			   password: 'Music123', password_confirmation: 'Music123'},
	building: {name: 'The Kennedy', street_address: "907 NE 45th St", city: 'Seattle', state: 'WA', zip_code: '98105'},
	building_2: {name: 'The Second Building', street_address: "907 NE 45th St", city: 'Seattle', state: 'WA', zip_code: '98105'},
	tenant: {name: 'Louie Mancini', email: 'louiscmancini@gmail.com', email_confirmation: 'louiscmancini@gmail.com', date_of_birth: '12-07-1984', stripe_token: 'jklFDAIEad123nfddk', 
			 password: 'Music123', password_confirmation: 'Music123'},
	receivable: {unit_id: '1', balance: '1000.00'},
	payment: {tenant_id: '1', receivable_id: '2', amount: '500'}
}

fullTenantResponse = {
						status: 'success',
						tenant: factories.tenant,
						data: {2: { building: {id: '17', name: 'The Kennedy', unit_number: '23A'}, 
								    receivables: {
												  '1':{ rec: {balance: '500', rent: '1000'}, payments: [{id: "1", amount: "250.00", tenant_id: "96", date: "2014-09-23 03:58:13.387651"}, {id: "2", amount: "250.00", tenant_id: "78", date: "2014-09-23 03:40:04.722676"}]},		
										          '2':{ rec: {balance: '500', rent: '1000'}, payments: [{id: "3", amount: "250.00", tenant_id: "77", date: "2014-09-23 03:58:13.387651"}, {id: "4", amount: "250.00", tenant_id: "78", date: "2014-09-23 03:40:04.722676"}]}
										         } // close receivables for unit 2
							  		}, //close object for unit 2
					   		   4: { building: {id: '17', name: 'The Kennedy', unit_number: '23A'}, 
									receivables: {
												   '3':{ rec: {balance: '500', rent: '1000'}, payments: [{id: "5", amount: "250.00", tenant_id: "84", date: "2014-09-23 03:58:13.387651"}, {id: "6", amount: "250.00", tenant_id: "78", date: "2014-09-23 03:40:04.722676"}]},		
											       '4':{ rec: {balance: '500', rent: '1000'}, payments: [{id: "7", amount: "250.00", tenant_id: "34", date: "2014-09-23 03:58:13.387651"}, {id: "8", amount: "250.00", tenant_id: "78", date: "2014-09-23 03:40:04.722676"}]}
											      } // close receivables for unit 2
								  } // close object for unit 4
							} // close data object 	
					} // close FullTenantResponse
					
tenantWithoutPayments = {
							status: 'success',
							tenant: factories.tenant,
							data: {2: { building: {id: '17', name: 'The Kennedy', unit_number: '23A'}, 
									    receivables: {
													  '1':{ rec: {balance: '500', rent: '1000'}, payments: []},		
											          '2':{ rec: {balance: '500', rent: '1000'}, payments: []}
											         } // close receivables for unit 2
								  		}, //close object for unit 2
						   		   4: { building: {id: '17', name: 'The Kennedy', unit_number: '23A'}, 
										receivables: {
													   '3':{ rec: {balance: '500', rent: '1000'}, payments: [{id: "5", amount: "250.00", tenant_id: "84", date: "2014-09-23 03:58:13.387651"}, {id: "6", amount: "250.00", tenant_id: "78", date: "2014-09-23 03:40:04.722676"}]},		
												       '4':{ rec: {balance: '500', rent: '1000'}, payments: [{id: "7", amount: "250.00", tenant_id: "34", date: "2014-09-23 03:58:13.387651"}, {id: "8", amount: "250.00", tenant_id: "78", date: "2014-09-23 03:40:04.722676"}]}
												      } // close receivables for unit 2
									  } // close object for unit 4
								} // close data object
	
						}
				
fullLandlordResponse = {
						status: 'success', 
						landlord: factories.landlord,
						data:{ buildings: [factories.building, factories.building_2] }
					}				

window.router = new backbone_data.Routers.ApplicationRouter();