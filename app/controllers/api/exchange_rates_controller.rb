class Api::ExchangeRatesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

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
      render json: { status: :created }
    else
      render json: { errors: rate.errors, status: :unprocessable_entity }
    end
  end
end
