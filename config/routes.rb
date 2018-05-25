Rails.application.routes.draw do
  namespace :api do
    get '/trending/available_places', to: 'places#available_places'
    get '/trending/:woeid', to: 'tweets#trending_by_location'
    resources :places, except: [:update, :edit, :destroy]
  end
end
