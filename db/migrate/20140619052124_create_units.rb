class CreateUnits < ActiveRecord::Migration
  def change
    create_table :units do |t|
      t.integer :building_id, :limit => 4
      t.string  :unit_number, :limit => 20
      t.decimal :monthly_rent, :precision => 7, :scale => 2
      t.integer :tenants, :array => true
      t.timestamps
    end
  end
end
