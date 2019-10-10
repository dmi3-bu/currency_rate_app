namespace :db do
  desc 'Update users_count in years'
  task update_exchange_rate: :environment do
    puts 'start'
    url = 'https://www.cbr-xml-daily.ru/daily_json.js'
    response = RestClient.get(url).body
    rate = JSON.parse(response)['Valute']['USD']['Value']
    hash = {
      rate: rate,
      admin: false
    }
    ExchangeRate.create(hash)
  end
end
