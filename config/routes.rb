Rails.application.routes.draw do
  namespace :api do
    get '/trending', to: 'tweets#trending'

  end
end
