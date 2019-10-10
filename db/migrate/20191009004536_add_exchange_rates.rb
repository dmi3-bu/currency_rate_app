class AddExchangeRates < ActiveRecord::Migration[5.2]
  def change
    create_table :exchange_rates do |t|
      t.decimal 'rate', null: false
      t.boolean 'admin', null: false, default: false
      t.timestamps
      t.datetime 'deleted_at'
    end
  end
end
