Rails.application.routes.draw do

  namespace :api do
    resources :exchange_rates
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'index#index'
  get 'admin', to: 'admin#index'
end
