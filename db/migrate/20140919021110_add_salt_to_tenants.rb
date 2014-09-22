class AddSaltToTenants < ActiveRecord::Migration
  def change
    add_column :tenants, :salt, :string
    add_column :tenants, :encrypted_password, :string
  end
end
