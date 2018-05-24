require 'twitter'

class Api::TweetsController < ApplicationController

 @@client = Twitter::REST::Client.new do |config|
   config.consumer_key        = ENV["CONSUMER_KEY"]
   config.consumer_secret     = ENV["CONSUMER_SECRET"]
   config.access_token        = ENV["ACCESS_TOKEN"]
   config.access_token_secret = ENV["ACCESS_TOKEN_SECRET"]
 end

  def trending_by_location
    woeid = twitter_params[:woeid]
    trending_topics = @@client.trends(id=woeid)
    render json: trending_topics
  end


  private

  def twitter_params
    params.permit(:woeid)
  end
end
