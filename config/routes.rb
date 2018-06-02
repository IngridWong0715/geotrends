Rails.application.routes.draw do
   get '/auth/:provider/callback', to: 'sessions#create'

  namespace :api do
    get '/trending/available_places', to: 'twitter#create_and_geocode_available_places'
    get '/trending/location/:tweet_query', to: 'twitter#tweets_by_tweet_query'
    get '/trending/:query', to: 'twitter#trending_by_location', constraints: { query: /.*/ }
    get '/follow/:user_screen_name', to: 'twitter#follow'

    resources :places, except: [:update, :edit, :destroy]
    get '/retweet/:tweet_id', to: 'twitter#retweet'
      get '/favorite/:tweet_id', to: 'twitter#favorite'

  end


end
