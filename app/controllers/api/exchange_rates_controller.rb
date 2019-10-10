class Api::ExchangeRatesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def index
    exchange_rates =
      if params[:admin]
        ExchangeRate.admin
      else
        [ExchangeRate.latest]
      end
    rates_cable(exchange_rates)
    render json: { exchange_rates: exchange_rates }
  end

  def create
    rate = ExchangeRate.new(rate: params[:rate], admin: true, valid_till: params[:valid_till])

    if rate.save
      render json: { status: :created }
    else
      render json: { errors: rate.errors, status: :unprocessable_entity }
    end
  end

  private

  def rates_cable(exchange_rates)
    ActionCable.server.broadcast(
      'rates_channel',
      exchange_rates: exchange_rates
    )
  end
end
