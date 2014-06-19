class CreatePayments < ActiveRecord::Migration
  def change
    create_table :payments do |t|
      t.integer :tenant_id, :limit => 4
      t.integer :receivable_id
      t.decimal :amount, :precision => 7, :scale => 2
      t.date    :payment_date
      t.timestamps
    end
  end
end
