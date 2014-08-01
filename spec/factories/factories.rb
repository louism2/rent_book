FactoryGirl.define do

    factory :building do
      name "The Allegro"
      address "25 West Highland Drive"
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
      stripe_token ""
      rental_obligations Array.new
    end

    factory :unit do
      unit_number "102"
      building_id 1
      monthly_rent 1500.50
      tenants Array.new
    end

end  