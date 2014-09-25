class RemovePaymentDateFromPayments < ActiveRecord::Migration
  def change
    remove_column :payments, :payment_date
  end
end
