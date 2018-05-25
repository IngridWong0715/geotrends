Rails.application.routes.draw do
  namespace :api do
    get '/trending/available_places', to: 'places#create_and_geocode_available_places'
    get '/trending/:query', to: 'tweets#trending_by_location'
    resources :places, except: [:update, :edit, :destroy]
  end
end
