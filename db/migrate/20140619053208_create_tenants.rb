class CreateTenants < ActiveRecord::Migration
  def change
    create_table :tenants do |t|
      t.string :name, :limit => 50
      t.string :email, :limit => 70
      t.string :phone_number => 10
      t.date :date_of_birth
      t.string :stripe_token, :limit => 50
      t.integer :rental_obligations, :array => true
      t.timestamps
    end
  end
end
