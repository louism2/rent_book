FactoryGirl.define do

    factory :unit do
      unit_number "102"
      building_id 17
      monthly_rent 1500.50
      balance 0
    end
    
    factory :building do
      name "The Allegro"
      street_address "25 West Highland Drive"
      city "Seattle"
      state "WA"
      zip_code "98119"
      landlord_id 1
    end
    
    factory :rental_obligation do
      unit_id 1
    end
    
    factory :landlord do
      name "Louie Mancini"
      email "louiscmancini@gmail.com"
      password "Test1234"
      password_confirmation "Test1234"
    end

    factory :manager do
      name "Ryan Roeter"
      email "louiscmancini@gmail.com"
      responsibilities Array.new
      phone_number "6505337642"
    end

    factory :payment do 
      tenant_id 1
      receivable_id 1
      amount 500.25
      payment_date (Date.today)-2
    end

    factory :receivable do
      unit_id 1
      balance 1500.25
    end

    factory :tenant do
      name "Louie Mancini"
      email "louiscmancini@gmail.com"
      date_of_birth Date.new(1984,12,7)
      password "Test1234"
      password_confirmation "Test1234"      
      stripe_token ""
    end



end  