require 'twitter'

class Api::PlacesController < ApplicationController
  @@client = Twitter::REST::Client.new do |config|
    config.consumer_key        = ENV["CONSUMER_KEY"]
    config.consumer_secret     = ENV["CONSUMER_SECRET"]
    config.access_token        = ENV["ACCESS_TOKEN"]
    config.access_token_secret = ENV["ACCESS_TOKEN_SECRET"]
  end


  def available_places #GIVES THIS TO INPUT FORM:
    available_locations = @@client.trends_available #Returns the locations that Twitter has trending topic information for
    #available_locations.each do |place|
      #HMMMM THIS SEEMS REALLY DUMB....
      #Place.create(name: place.name, parentid: place.parent_id, country: place.country, woeid: place.woeid, countryCode: place.country_code, twitter_id: place.id)
    #end
    render json: available_locations
  end






  private

  def twitter_params
    params.permit(:woeid)
  end
end
