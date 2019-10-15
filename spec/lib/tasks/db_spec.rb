require 'rails_helper'

RSpec.describe "db:update_exchange_rate", type: :task do
  include_context "rake"

  before do
    stub_request(:get, 'https://www.cbr-xml-daily.ru/daily_json.js')
      .to_return(status: 200,
                 body: { 'Valute': { 'USD': { 'Value': '65.35' } } }.to_json)
  end

  context 'fetching new exchange rate from CBR' do
    let!(:exchange_rate) { create(:exchange_rate) }

    it 'adds new exchange rate' do
      expect(ExchangeRate.non_admin.count).to eq 1
      subject.invoke
      expect(ExchangeRate.non_admin.count).to eq 2
    end
  end
end

RSpec.describe "db:deactivate_exchange_rate", type: :task do
  include ActiveSupport::Testing::TimeHelpers
  include_context "rake"

  context 'looking for invalid admin exchange rates' do
    let!(:exchange_rate) { create(:exchange_rate, :admin, valid_till: Time.now + 1.minute) }

    it 'deactivates old exchange rate' do
      travel 2.minutes
      expect(ExchangeRate.where(deleted_at: nil).count).to eq 1
      subject.invoke
      expect(ExchangeRate.where(deleted_at: nil).count).to eq 0
    end
  end
end
