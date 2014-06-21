require 'rails_helper'

describe Unit do
  
  describe("-- it should create a unit") do
    
    it("if valid attribute values are given") do
      unit = FactoryGirl.build(:unit)
      expect(unit).to be_valid
    end
  
  end
  
  describe("-- it should not create a unit") do
    
    it("if there is no unit_number") do
      unit = FactoryGirl.build(:unit, unit_number: nil)
      unit.valid?
      expect(unit.errors[:unit_number]).to_not be_blank
    end
  
    it("if there is no building_id") do
      unit = FactoryGirl.build(:unit, building_id: nil)
      unit.valid?
      expect(unit.errors[:building_id]).to_not be_blank
    end
  
    it("if there is no monthly rent") do
      unit = FactoryGirl.build(:unit, monthly_rent: nil)
      unit.valid?
      expect(unit.errors[:monthly_rent]).to_not be_blank
    end
  
  end

end

