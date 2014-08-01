class AddStripeTokenToLandlords < ActiveRecord::Migration
  def change
    add_column :landlords, :stripe_token, :string
  end
end
