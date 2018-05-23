Rails.application.routes.draw do
  namespace :api do
    get '/trending/available_places', to: 'tweets#available_places'
    get '/trending/:woeid', to: 'tweets#trending_by_location'
  end
end
