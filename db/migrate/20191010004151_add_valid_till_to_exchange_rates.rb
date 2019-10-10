class AddValidTillToExchangeRates < ActiveRecord::Migration[5.2]
  def change
    add_column :exchange_rates, :valid_till, :datetime
  end
end
