class CreateLandlords < ActiveRecord::Migration
  def change
    create_table :landlords do |t|
      t.string :name, :limit => 50
      t.string :email, :limit => 70
      t.timestamps
    end
  end
end
