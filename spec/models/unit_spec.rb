# t.integer  "building_id"
# t.string   "unit_number",  limit: 20
# t.decimal  "monthly_rent",            precision: 7, scale: 2
# t.datetime "created_at"
# t.datetime "updated_at"
# t.integer  "balance",                                         default: 0


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
        unit = FactoryGirl.build(:unit, unit_number: '')
        unit.valid?
        expect(unit.errors[:unit_number]).to_not be_blank
      end
    
      it("if there is no building_id") do
        unit = FactoryGirl.build(:unit, building_id: '')
        unit.valid?
        expect(unit.errors[:building_id]).to_not be_blank
      end
    
      it("if there is no monthly rent") do
        unit = FactoryGirl.build(:unit, monthly_rent: '')
        unit.valid?
        expect(unit.errors[:monthly_rent]).to_not be_blank
      end
      
      it "if the balance attribute is not a number" do
        unit = FactoryGirl.build(:unit, balance: 'not a number')
        unit.valid?
        expect(unit.errors[:balance]).to_not be_blank 
      end
    
    end

end

