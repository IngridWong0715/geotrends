Rails.application.routes.draw do
   get '/auth/:provider/callback', to: 'sessions#create'

  namespace :api do
    resources :places, except: [:update, :edit, :destroy]
    get '/trending/available_places', to: 'twitter#create_and_geocode_available_places'
    get '/trending/location/:tweet_query', to: 'twitter#tweets_by_tweet_query'
    get '/trending/:query', to: 'twitter#trending_by_location', constraints: { query: /.*/ }
    post '/follow/:user_screen_name', to: 'twitter#follow'
    post '/retweet/:tweet_id', to: 'twitter#retweet'
    post '/favorite/:tweet_id', to: 'twitter#favorite'

  end


end
