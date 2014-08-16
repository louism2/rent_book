# create_table "buildings", force: true do |t|
#   t.string   "name",           limit: 50
#   t.string   "street_address", limit: 50
#   t.string   "city",           limit: 50
#   t.string   "state",          limit: 2
#   t.string   "zip_code",       limit: 5
#   t.integer  "landlord_id"
#   t.datetime "created_at"
#   t.datetime "updated_at"
# end

require 'rails_helper'

describe Building do
  
  describe("-- it should create a building") do
    
    it("if valid attribute values are given") do
      building = FactoryGirl.build(:building)
      expect(building).to be_valid
    end
  
  end  
  
  describe("-- it should not create a building") do
      
      it('if the building doesn\'t have a name attribute') do
        building = FactoryGirl.build(:building, name: '')
        building.valid?
        expect(building.errors[:name]).to_not be_blank
      end
      
      it('if the name attribute is too long') do
        long_name = 'a'*51
        building = FactoryGirl.build(:building, name: long_name)
        building.valid?
        expect(building.errors[:name]).to_not be_blank
      end
      
      it("if there is no street_address attribute") do
        building = FactoryGirl.build(:building, street_address: '')
        building.valid?
        expect(building.errors[:street_address]).to_not be_blank
      end
      
      it("if the street_address attribute is too long") do
        long_street = 'a'*51
        building = FactoryGirl.build(:building, street_address: long_street)
        building.valid?
        expect(building.errors[:street_address]).to_not be_blank
      end
      
      it("if there is no city attribute") do
        building = FactoryGirl.build(:building, city: '')
        building.valid?
        expect(building.errors[:city]).to_not be_blank
      end
      
      it("if the city attribute is too long") do
        long_city = 'a'*51
        building = FactoryGirl.build(:building, city: long_city)
        building.valid?
        expect(building.errors[:city]).to_not be_blank
      end    
      
      it("if the state attribute is too long") do
        long_state = 'a'*3
        building = FactoryGirl.build(:building, state: long_state)
        building.valid?
        expect(building.errors[:state]).to_not be_blank
      end
      
      it("if the state attribute is blank") do
        building = FactoryGirl.build(:building, state: '')
        building.valid?
        expect(building.errors[:state]).to_not be_blank
      end
      
      it("if the state attribute has numbers") do
        building = FactoryGirl.build(:building, state: '1A')
        building.valid?
        expect(building.errors[:state]).to_not be_blank
      end   
      
      it("if the zip_code attribute is blank") do
        building = FactoryGirl.build(:building, zip_code: '')
        building.valid?
        expect(building.errors[:zip_code]).to_not be_blank
      end   
      
      it("if the zip_code attribute has letters") do
        building = FactoryGirl.build(:building, zip_code: '901aa')
        building.valid?
        expect(building.errors[:zip_code]).to_not be_blank
      end  
      
      it("if the zip_code attribute is too long") do
        building = FactoryGirl.build(:building, zip_code: 981199)
        building.valid?
        expect(building.errors[:zip_code]).to_not be_blank
      end        
      
    end
  
  describe "class methods" do
    
    describe "building_show_query" do
      
      building = FactoryGirl.create(:building)
      units = 2.times.collect{|x| FactoryGirl.create(:unit, building_id: building.id, unit_number: x)}
      
      it "should produce the expected output" do
        res = Building.building_show_query(building.id)
        expect(res.num_tuples).to equal(2)
        expect(res[0].keys).to eql(['landlord_id','id','unit_number','balance','monthly_rent'])
      end
    
    end
  
  
  end
  
  
  
  
  
  
  
  
end