class Api::ExchangeRatesController < ApplicationController
  def index
    exchange_rates =
      if params[:admin]
        ExchangeRate.admin
      else
        [ExchangeRate.latest]
      end
    render json: { exchange_rates: exchange_rates }
  end

  def create
    rate = ExchangeRate.new(rate: params[:rate], admin: true, valid_till: params[:valid_till])

    if rate.save
      send_cable
      render status: 201, json: {}
    else
      render status: 422, json: { errors: rate.errors }
    end
  end

  private

  def send_cable
    ActionCable.server.broadcast(
      'rates_channel',
      exchange_rates: [ExchangeRate.latest]
    )
    ActionCable.server.broadcast(
      'admin_channel',
      exchange_rates: ExchangeRate.admin
    )
  end
end
