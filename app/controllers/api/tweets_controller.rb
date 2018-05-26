require 'twitter'

class Api::TweetsController < ApplicationController

 @@client = Twitter::REST::Client.new do |config|
   config.consumer_key        = ENV["CONSUMER_KEY"]
   config.consumer_secret     = ENV["CONSUMER_SECRET"]
   config.access_token        = ENV["ACCESS_TOKEN"]
   config.access_token_secret = ENV["ACCESS_TOKEN_SECRET"]
 end

  def trending_by_location
    query = twitter_params[:query]
    if query[0] == 'w'
      woeid = twitter_params[:query].split('woeid=')[1]
    else
      coordinates = query.split('coords=')[1].split('&')
      latitude = coordinates[0].to_f
      longitude = coordinates[1].to_f
      place = Place.find_by(latitude: latitude, longitude: longitude)
      woeid = place.woeid
    end

    trending_topics = @@client.trends(id=woeid)
    render json: trending_topics
  end

  def tweets_by_tweet_query

    q = twitter_params[:tweet_query]
    tweets = @@client.search(q=q).attrs[:statuses]


    binding.pry
  end


  private

  def twitter_params
    params.permit(:query, :tweet_query)
  end
end
