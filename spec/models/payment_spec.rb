require 'rails_helper'

describe Payment do
  
  describe("-- it should create a payment") do
    
    it("if valid attribute values are given") do
      payment = FactoryGirl.build(:payment)
      expect(payment).to be_valid
    end
  
  end
  
  describe("-- it should not create a payment") do
  
    it("if there is no tenant_id") do
      payment = FactoryGirl.build(:payment, tenant_id: nil)
      payment.valid?
      expect(payment.errors[:tenant_id]).to_not be_blank
    end
  
    it("if there is no receivable_id") do
      payment = FactoryGirl.build(:payment, receivable_id: nil)
      payment.valid?
      expect(payment.errors[:receivable_id]).to_not be_blank
    end
    
    it("if there is no amount") do
      payment = FactoryGirl.build(:payment, amount: nil)
      payment.valid?
      expect(payment.errors[:amount]).to_not be_blank
    end
  
  end

end
