require 'rails_helper'

describe BuildingsController do 
  
  params = {name: 'The Kennedy', street_address: '25 West Highland Drive', city: 'Seattle', state: 'WA', zip_code: '98105'}
  
  landlord = FactoryGirl.create(:landlord)
  building = FactoryGirl.create(:building, landlord_id: landlord.id)
  2.times.collect{|x| FactoryGirl.create(:unit, building_id: building.id, unit_number: x)}
  
  describe 'buildings#create' do
    
    it('should create a building and return the id parameter') do
      allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(landlord)
      expect{
        post :create, building: params.merge!({landlord_id: landlord.id})
      }.to change(Building, :count).by(1)
      expect(JSON.parse(response.body)['building'].has_key?('id')).to equal(true)
    end
    
    it('should not create a landlord and return a list of errors if the object is invalid') do
      allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(landlord)
      expect{
        post :create, building: params.update({name: ''})
      }.to_not change(Building, :count)
      expect(JSON.parse(response.body).has_key?('errors')).to equal(true)
    end
  
  end
  
  describe 'buildings#show' do
    
    it 'should respond with an array of json objects if the user is authorized' do
      allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(landlord)
      get :show, id: building.id
      expect(JSON.parse(response.body)['units'].length).to equal(2)
      expect(JSON.parse(response.body)['units'][0].keys).to eql(["landlord_id", "unit_id", "unit_number", "balance", "monthly_rent", "tenant_id", "name"])
    end
    
    it 'should return no results if the list of units is empty' do
      building = FactoryGirl.create(:building, landlord_id: landlord.id)
      allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(landlord)
      get :show, id: building.id
      expect(JSON.parse(response.body).has_key?('status')).to eql(true)
    end
    
    it 'should deny access if the user is unauthorized' do
      landlord.id+=1
      allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(landlord)
      get :show, id: building.id
      expect(JSON.parse(response.body).has_key?('status')).to eql(true)
    end
    
  end
  

end