require 'rails_helper'

describe Landlord do
  
  describe("creating a landlord ") do
    it("if valid attribute values are given") do
      landlord = FactoryGirl.build(:landlord)
      expect(landlord).to be_valid
    end
  end
  
  describe("-- it should not create a landlord") do
    
    it("if there is no name attribute") do
      landlord = FactoryGirl.build(:landlord, name: nil)
      expect(landlord).to be_invalid
    end
    
    it("if there is no email attribute") do
      landlord = FactoryGirl.build(:landlord, email: nil)
      expect(landlord).to be_invalid
    end
    
    context("-- passwords --") do
    
      it("if there is no password confirmation") do
        landlord = FactoryGirl.build(:landlord, password_confirmation: :nil)
        expect(landlord).to be_invalid
      end
      
      it("if the password and password_confirmation do not match") do
        landlord = FactoryGirl.build(:landlord, password: 'Test4321')
        expect(landlord).to be_invalid
      end
      
      it("if the password is too short") do
        landlord = FactoryGirl.build(:landlord, password: 'Test', password_confirmation: 'Test')
        expect(landlord).to be_invalid
      end
      
      it("if the password is contains no numbers") do
        landlord = FactoryGirl.build(:landlord, password: 'testtest', password_confirmation: 'testtest')
        expect(landlord).to be_invalid
      end
      
      it("should encrypt the passed in password if the record is new") do
        landlord = FactoryGirl.build(:landlord)
        landlord.should_receive(:encrypt_password)
        landlord.save
      end
      
      it("should not encrypt the password if the password field is blank") do
        landlord = FactoryGirl.create(:landlord)
        landlord.should_not_receive(:encrypt_password)
        landlord.update_attributes({name: "Louie Mancini", email: "louiscmancini@gmail.com", password: '', password_confirmation: ''})
      end
    
    end
  
  end

end