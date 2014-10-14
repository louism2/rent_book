# t.string   "name",               limit: 50
# t.string   "email",              limit: 70
# t.date     "date_of_birth"
# t.string   "stripe_token",       limit: 50
# t.datetime "created_at"
# t.datetime "updated_at"
# t.string   "salt"
# t.string   "encrypted_password"

require 'rails_helper'

describe Tenant do
  
  describe("-- it should create a tenant") do
    
    it("if valid attribute values are given") do
      tenant = FactoryGirl.build(:tenant)
      expect(tenant).to be_valid
    end
  
  end  
  
  describe("tenant validations") do
      
      it('if the tenant doesn\'t have a name attribute') do
        tenant = FactoryGirl.build(:tenant, name: '')
        tenant.valid?
        expect(tenant.errors[:name]).to_not be_blank
      end
      
  end    
      
end