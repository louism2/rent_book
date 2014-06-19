class CreateUnits < ActiveRecord::Migration
  def change
    create_table :units do |t|
      t.integer :building_id, :limit => 4
      t.decimal :monthly_rent, :precision => 7, :scale => 5
      t.integer :tenants, :array => true
      t.timestamps
    end
  end
end
