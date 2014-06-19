class CreateManagers < ActiveRecord::Migration
  def change
    create_table :managers do |t|
      t.string :name, :limit => 50
      t.string :email, :limit => 70
      t.integer :responsibilities, :array => true
      t.string :phone_number, :limit => 10
      t.timestamps
    end
  end
end
