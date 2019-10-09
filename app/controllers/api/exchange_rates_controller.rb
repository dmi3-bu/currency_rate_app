class Api::ExchangeRatesController < ApplicationController
  def index
    exchange_rate = ExchangeRate.last
    render json: { status: 'ok', exchange_rate: exchange_rate }
  end
end
