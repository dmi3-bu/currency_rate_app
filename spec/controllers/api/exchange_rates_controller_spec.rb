# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::ExchangeRatesController, type: :controller do
  let!(:exchange_rate_1) { create(:exchange_rate) }
  let!(:exchange_rate_2) { create(:exchange_rate, :admin) }
  let!(:exchange_rate_3) { create(:exchange_rate, :admin) }

  describe 'GET #index' do
    context 'when empty params' do
      it do
        get :index, params: {}
        expect(response).to have_http_status(:ok)
        expect(response.body).to eq({ exchange_rates: [exchange_rate_3] }.to_json)
      end
    end
    context 'when admin is true' do
      it do
        get :index, params: { admin: true }
        expect(response).to have_http_status(:ok)
        expect(response.body).to eq({ exchange_rates: [exchange_rate_2, exchange_rate_3] }.to_json)
      end
    end
  end

  describe 'POST #create' do
    let(:rate) { rand(1.0...100.0).round(2) }
    let(:valid_till) { Time.now + 1.hour }

    it do
      get :create, params: { rate: rate, valid_till: valid_till }
      expect(response).to have_http_status(:created)
    end
  end
end

