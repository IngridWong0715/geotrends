require 'twitter'

class Api::PlacesController < ApplicationController
  @@client = Twitter::REST::Client.new do |config|
    config.consumer_key        = ENV["CONSUMER_KEY"]
    config.consumer_secret     = ENV["CONSUMER_SECRET"]
    config.access_token        = ENV["ACCESS_TOKEN"]
    config.access_token_secret = ENV["ACCESS_TOKEN_SECRET"]
  end



  def create_and_geocode_available_places #GIVES THIS TO INPUT FORM:
 #1. Fetch all locations where Twitter has trends NOW
    raw_available_locations = @@client.trends_available
    raw_available_locations.shift #first one is worldwide

    geocoded_available_locations = []

    raw_available_locations.each do |location|
       if location.place_type === "Country"
         address = location.country
       else
         address = location.name + ", " + location.country
       end

       place = Place.where(woeid: location.woeid).first_or_create do |place|
         place.address = address
         place.name = location.name
       end
       if place.latitude != nil && place.longitude != nil
         geocoded_available_locations.push(place)
       end
       # rake geocode:all CLASS=Place LIMIT=1000
     end

    render json: geocoded_available_locations
  end

  def get_woeid_from_coords

  end






  private


  def place_params
   params.permit(:title, :address, :visited_by, :woeid)
 end
end
