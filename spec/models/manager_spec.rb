require 'rails_helper'

describe Manager do
  
  describe("-- it should create a manager") do
    
    it("if valid attribute values are given") do
      manager = FactoryGirl.build(:manager)
      expect(manager).to be_valid
    end
  
  end
  
  # t.string   "name",             limit: 50
  # t.string   "email",            limit: 70
  # t.integer  "responsibilities",            default: [], array: true
  # t.string   "phone_number",     limit: 10
  
  describe("-- it should not create a manager") do
    
    it("if the name attribute is not given") do
      manager = FactoryGirl.build(:manager, name: nil)
      manager.valid?
      expect(manager.errors[:name]).to_not be_blank
    end
    
    it("if the email attribute is not given") do
      manager = FactoryGirl.build(:manager, email: nil)
      manager.valid?
      expect(manager.errors[:email]).to_not be_blank
    end
    
    it("if the name phone_number is not given") do
      manager = FactoryGirl.build(:manager, phone_number: nil)
      manager.valid?
      expect(manager.errors[:phone_number]).to_not be_blank
    end
  
  end
  
end