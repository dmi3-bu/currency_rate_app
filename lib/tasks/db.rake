namespace :db do
  desc 'Update exchange rate from CBR'
  task update_exchange_rate: :environment do
    url = 'https://www.cbr-xml-daily.ru/daily_json.js'
    response = RestClient.get(url).body
    rate = JSON.parse(response)['Valute']['USD']['Value']
    hash = {
      rate: rate,
      admin: false
    }
    rate = ExchangeRate.new(hash)
    if rate.save
      ActionCable.server.broadcast(
        'rates_channel',
        exchange_rates: [ExchangeRate.latest]
      )
    end
  end

  desc 'Check for old admin exchange rates and deactivate them'
  task deactivate_exchange_rate: :environment do
    rates = ExchangeRate.admin.where('valid_till < current_timestamp')
    if rates.present?
      rates.update(deleted_at: Time.now)
      ActionCable.server.broadcast(
        'rates_channel',
        exchange_rates: [ExchangeRate.latest]
      )
    end
  end
end
