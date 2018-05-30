Rails.application.routes.draw do
   get '/auth/:provider/callback' => 'sessions#create'
   get "/signout", to: "sessions#destroy" # THIS SHOULD BE DELETE
   get '/signin_status', to: 'sessions#signin_status'
  namespace :api do
    get '/trending/available_places', to: 'places#create_and_geocode_available_places'
    get '/trending/location/:tweet_query', to: 'tweets#tweets_by_tweet_query'
    get '/trending/:query', to: 'tweets#trending_by_location', constraints: { query: /.*/ }
    get '/follow/:user_screen_name', to: 'places#follow'

    resources :places, except: [:update, :edit, :destroy]
    post '/retweet/:tweet_id', to: 'tweets#retweet'

  end


end
