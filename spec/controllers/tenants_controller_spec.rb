require 'rails_helper'

describe TenantsController do
  
  params = {name: 'Louie Mancini', email: 'louiscmancini@gmail.com', date_of_birth: '12-7-198'}
  
  describe 'tenants#create' do
    
    it('should create a tenamt and return the id parameter') do
      expect{
        post :create, tenant: params 
      }.to change(Tenant, :count).by(1)
      expect(JSON.parse(response.body)['tenant'].has_key?('id')).to equal(true)
    end
    
    it('should not create a tenant and return a list of errors if the object is invalid') do
      expect{
        post :create, tenant: params.update({name: ''})
      }.to_not change(Tenant, :count)
      expect(JSON.parse(response.body).has_key?('errors')).to equal(true)
    end
  
  end
  
  
end  