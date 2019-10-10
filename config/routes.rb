Rails.application.routes.draw do
  namespace :api do
    resources :exchange_rates
  end

  root 'main#index'
  get 'admin', to: 'main#index'

  mount ActionCable.server => '/cable'
end
