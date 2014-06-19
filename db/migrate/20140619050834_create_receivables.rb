class CreateReceivables < ActiveRecord::Migration
  def change
    execute 'CREATE EXTENSION hstore'
    create_table :receivables do |t|
      t.integer :unit_id, :limit => 3
      t.decimal :balance, :precision => 7, :scale => 2
      t.timestamps
    end
  end
end
