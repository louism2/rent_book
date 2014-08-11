class UpdateSchemaForPayments < ActiveRecord::Migration
  def change
    remove_column :units, :tenants
    add_column    :units, :balance, :integer, :limit => 3, :default => 0
    
    remove_column :tenants, :rental_obligations
    
    create_table :rental_obligations do |t|
      t.integer :unit_id
      t.integer :tenant_id
    end  
  end
end
