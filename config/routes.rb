Rails.application.routes.draw do
  namespace :api do
    get '/trending', to: 'tweets#trending'
    get '/meh', to: 'tweets#meh'

  end
end
