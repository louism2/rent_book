// These specs are for the helper functions used throughout the application.  The top-level describe blocks are named for the 
// file name in which the function resides.

describe('rent_book.js', function(){
	
	describe('backbone_data.Helpers.setAndShowLandlord', function(){
		
		it('should populate the landlord namespace', function(){
			loadFixtures('base.html');
			window.object_namespace = {};
			var spy = spyOn(backbone_data.Views.ShowLandlordView.prototype, 'render').and.callThrough();
			backbone_data.Helpers.setAndShowLandlord(fullLandlordResponse);
			expect(window.ns.landlord).not.toBeNull();
			expect(window.ns.buildingsCollection.length).toEqual(2);
			router.navigate('/');
		});
	
	
	});
	
	describe('backbone_data.Helpers.setAndShowTenant', function(){
								
		it('should populate the tenant namespace', function(){
			loadFixtures('base.html');
			window.object_namespace = {};
			var spy = spyOn(backbone_data.Views.ShowTenantView.prototype, 'render').and.callThrough();
			backbone_data.Helpers.setAndShowTenant(fullTenantResponse);
			expect(window.ns.tenant).not.toBeNull();
			expect(window.ns.tenant.units.length).toEqual(2);
			expect(window.ns.paymentsCollection.length).toEqual(8);
			expect(window.ns.receivablesCollection.length).toEqual(4);
			router.navigate('/');
		});					

	});
	
});