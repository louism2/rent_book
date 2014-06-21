class AddDefaultValues < ActiveRecord::Migration
  def change
    change_column :units, :tenants, :integer, array: true, default: '{}'
    change_column :managers, :responsibilities, :integer, array: true, default: '{}'
    change_column :tenants, :rental_obligations, :integer, array: true, default: '{}'
  end
end
