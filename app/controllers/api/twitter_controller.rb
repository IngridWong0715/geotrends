class Api::TwitterController < ApplicationController
  before_action :set_client

    def follow
      followed = @client.follow(params[:user_screen_name])
      render json: followed
    end
    def create_and_geocode_available_places #GIVES THIS TO INPUT FORM:
   #1. Fetch all locations where Twitter has trends NOW
      raw_available_locations = @client.trends_available
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
         if place.latitude != nil && place.longitude != nil && place.woeid != nil
           geocoded_available_locations.push(place)
         end
         # rake geocode:all CLASS=Place LIMIT=1000
       end

      render json: geocoded_available_locations
    end

    def trending_by_location
      place = Place.find_by(woeid: twitter_params[:query])
      trending_topics = @client.trends(id=place.woeid)

      render json: trending_topics
    end

    def tweets_by_tweet_query
       q = twitter_params[:tweet_query]
       tweets = @client.search(q=q).attrs[:statuses]

       list = tweets.map do |t|
         tweet = {}
         tweet[:created] = t[:created_at].to_datetime.strftime("%m-%e-%y %H:%M"),
           tweet[:text] = t[:text],
           tweet[:user_name]= t[:user][:name],
           tweet[:user_screen_name] = t[:user][:screen_name],
           tweet[:user_profile_image_url] = t[:user][:profile_image_url],
           tweet[:hashtags] =t[:entities][:hashtags],
           tweet[:user_mentions]= t[:entities][:user_mentions],
           tweet[:media] = t[:entities][:media],
           tweet[:truncated] = t[:truncated],
           tweet[:id] = t[:id]
         tweet
       end

       render json: list
     end

     def retweet
       tweet = @client.retweet(params[:tweet_id])
       render json: tweet
     end

     def favorite
       tweet = @client.favorite(params[:tweet_id])
       render json: tweet
     end

    private
     def set_client
       @client = Twitter::REST::Client.new do |config|
         config.consumer_key        = ENV["CONSUMER_KEY"]
         config.consumer_secret     = ENV["CONSUMER_SECRET"]
         config.access_token        = ENV["ACCESS_TOKEN"]
         config.access_token_secret = ENV["ACCESS_SECRET"]
       end
     end

    def place_params
     params.permit(:title, :address, :visited_by, :woeid, :user_screen_name)
    end

   def twitter_params
     params.permit(:query, :tweet_query, :tweet_id)
   end
end
