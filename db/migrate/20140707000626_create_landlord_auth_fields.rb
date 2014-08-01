class CreateLandlordAuthFields < ActiveRecord::Migration
  
  add_column :landlords, :salt, :string
  add_column :landlords, :encrypted_password, :string
  
end
