require 'twitter'

class Api::PlacesController < ApplicationController
 @@client = Twitter::REST::Client.new do |config|
   config.consumer_key        = "A87Nzf0zVRiRv8CcNsMUJHhOP"
   config.consumer_secret     = "xiv57E1eYZ5UBT6BV29d9wpV2lfgsblWEey5mK69QCtZdHzgCd"
   config.access_token        = "2998573990-Y7areUjXnXhTJXA8CIKadDLbpmvwmQJmgWT0WG9"
   config.access_token_secret = "lj3Q5yFHWXdLZiRhHeZtH7PdgPbnfxdHG84r38t1u6WWB"
 end


  def available_places #GIVES THIS TO INPUT FORM:
    available_locations = @@client.trends_available #Returns the locations that Twitter has trending topic information for
    available_locations.each do |place|
      #HMMMM THIS SEEMS REALLY DUMB....
      Place.create(name: place.name, parentid: place.parent_id, country: place.country, woeid: place.woeid, countryCode: place.country_code, twitter_id: place.id)
    end
    render json: available_locations
  end






  private

  def twitter_params
    params.permit(:woeid)
  end
end
