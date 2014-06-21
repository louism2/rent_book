require 'rails_helper'

describe Building do
  
  describe("-- it should create a building") do
    
    it("if valid attribute values are given") do
      building = FactoryGirl.build(:building)
      expect(building).to be_valid
    end
  
  end  
  
  describe("-- it should not create a building") do
    
    it("if there is no address attribute") do
      building = FactoryGirl.build(:building, address: nil)
      building.valid?
      expect(building.errors[:address]).to_not be_blank
    end
    
    it("if there is no name attribute") do
      building = FactoryGirl.build(:building, name: nil)
      building.valid?
      expect(building.errors[:name]).to_not be_blank
    end
    
  end
  
end