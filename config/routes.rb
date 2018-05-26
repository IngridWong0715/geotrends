Rails.application.routes.draw do
  namespace :api do
    get '/trending/available_places', to: 'places#create_and_geocode_available_places'
    get '/trending/location/:tweet_query', to: 'tweets#tweets_by_tweet_query'
    get '/trending/:query', to: 'tweets#trending_by_location', constraints: { query: /.*/ }

    resources :places, except: [:update, :edit, :destroy]

  end


end
