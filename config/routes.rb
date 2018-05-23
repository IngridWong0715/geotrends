Rails.application.routes.draw do
  namespace :api do
    get '/trending/:woeid', to: 'tweets#trending'
  end
end
