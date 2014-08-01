class CreateBuildings < ActiveRecord::Migration
  def change
    create_table :buildings do |t|
      t.string :name, limit: 50
      t.string :street_address, limit: 50
      t.string :city, limit: 50
      t.string :state, limit: 2
      t.string :zip_code, limit: 5
      t.integer :landlord_id
      t.timestamps
    end
  end
end
