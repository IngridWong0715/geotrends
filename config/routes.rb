Rails.application.routes.draw do
  namespace :api do
    get '/trending', to: 'tweets#trending'
    get '/:query', to: 'tweets#search'

  end
end
