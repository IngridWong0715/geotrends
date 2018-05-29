require 'twitter'

class Api::PlacesController < ApplicationController


  def follow
    followed = client.follow(params[:user_screen_name])
    render json: followed
  end
  def create_and_geocode_available_places #GIVES THIS TO INPUT FORM:
 #1. Fetch all locations where Twitter has trends NOW

    raw_available_locations = client.trends_available
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

  private

  def place_params
   params.permit(:title, :address, :visited_by, :woeid, :user_screen_name)
 end
end
