
require 'twitter'

class Api::TweetsController < ApplicationController
 @@client = Twitter::REST::Client.new do |config|
   config.consumer_key        = "A87Nzf0zVRiRv8CcNsMUJHhOP"
   config.consumer_secret     = "xiv57E1eYZ5UBT6BV29d9wpV2lfgsblWEey5mK69QCtZdHzgCd"
   config.access_token        = "2998573990-Y7areUjXnXhTJXA8CIKadDLbpmvwmQJmgWT0WG9"
   config.access_token_secret = "lj3Q5yFHWXdLZiRhHeZtH7PdgPbnfxdHG84r38t1u6WWB"
 end
  def trending_by_location

    woeid = twitter_params[:woeid]

    trending_topics = @@client.trends(id=woeid).take(10)  #TRENDS FOR PARIS RIGHT NOW
    render json: trending_topics
  end

  def available_places
    available_locations = @@client.trends_available #Returns the locations that Twitter has trending topic information for
    render json: available_locations
  end




  private

  def twitter_params
    params.permit(:woeid)
  end
end
