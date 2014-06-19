class CreateBuildings < ActiveRecord::Migration
  def change
    create_table :buildings do |t|
      t.string :name, :limit => 100
      t.string :address, :limit => 100
      t.timestamps
    end
  end
end
