require 'rails_helper'

params = {"name"=>"Louis Mancini", "email"=>"louiscmancini@gmail.com", "password"=>"music1234", 
          "email_confirmation"=>"louiscmancini@gmail.com", "password_confirmation"=>"music1234"}

describe LandlordsController do 
  
  describe('creating a landlord') do
    
    it('should create a landlord and return the id parameter') do
      expect{
        post :create, landlord: params
      }.to change(Landlord, :count).by(1)
      expect(JSON.parse(response.body)['landlord'].has_key?('id')).to equal(true)
    end
    
    it('should not create a landlord and return a list of errors') do
      expect{
        post :create, landlord: params.update({name: ''})
      }.to_not change(Landlord, :count)
      expect(JSON.parse(response.body).has_key?('errors')).to equal(true)
    end
  
  end
  

end
