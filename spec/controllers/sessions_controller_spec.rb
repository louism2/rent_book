require 'rails_helper'

describe SessionsController do
  
  FactoryGirl.create(:tenant)
  FactoryGirl.create(:landlord)
  
  params = {email: 'louiscmancini@gmail.com', password: 'Test1234'}
  
  describe "different types of users" do 
    
    it "should sign in a Landlord if the landlord params are given" do
      params[:identity] = 'Landlord'
      post :create, params
      response.status.should be(200)
      JSON.parse(response.body).should include('landlord','status')
    end
    
    it "should sign in a tenant if tenant parameters are given" do
      params[:identity] = 'Tenant'
      post :create, params
      response.status.should be(200)
      JSON.parse(response.body).should include('tenant','status')
    end
    
  end
  
end  