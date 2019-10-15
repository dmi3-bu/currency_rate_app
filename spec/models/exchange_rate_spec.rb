# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ExchangeRate, type: :model do
  describe 'self.latest' do
    context 'when several valid admin_rates' do
      let!(:exchange_rate_1) { create(:exchange_rate) }
      let!(:exchange_rate_2) { create(:exchange_rate, :admin) }
      let!(:exchange_rate_3) { create(:exchange_rate, :admin) }

      it 'returns the latest valid admin rate' do
        expect(ExchangeRate.latest).to eq(exchange_rate_3)
      end
    end

    context 'when no admin rates' do
      let!(:exchange_rate_1) { create(:exchange_rate) }
      let!(:exchange_rate_2) { create(:exchange_rate) }

      it 'returns the latest non admin rate' do
        expect(ExchangeRate.latest).to eq(exchange_rate_2)
      end
    end
  end

  describe 'validations' do
    let(:params) { { rate: rate, valid_till: valid_till, admin: true } }

    before do
      @rate = ExchangeRate.create(params)
    end

    context 'when everything is valid' do
      let(:rate) { rand(1.0...100.0).round(2) }
      let(:valid_till) { Time.now + 1.hour }

      it 'fails to save' do
        expect(@rate.errors.details).to eq({})
        expect(ExchangeRate.all.size).to eq(1)
      end
    end

    context 'when rate is invalid' do
      let(:rate) { -25.0 }
      let(:valid_till) { Time.now + 1.hour }

      it 'fails to save' do
        expect(@rate.errors.details).to include(:rate)
        expect(ExchangeRate.all).to eq([])
      end
    end

    context 'when valid_till is old' do
      let(:rate) { rand(1.0...100.0).round(2) }
      let(:valid_till) { Time.now - 1.minute }

      it 'fails to save' do
        expect(@rate.errors.details).to include(:valid_till)
        expect(ExchangeRate.all).to eq([])
      end
    end
  end
end
