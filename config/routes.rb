Rails.application.routes.draw do
  namespace :api do
    get '/trending', to: 'tweets#trending'
    get '/trending/:query', to: 'tweets#search'

  end
end
