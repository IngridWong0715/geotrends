require 'twitter'

class Api::TweetsController < ApplicationController

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

    trending_topics = client.trends(id=woeid)
    render json: trending_topics
  end

  def tweets_by_tweet_query
     q = twitter_params[:tweet_query]
     tweets = client.search(q=q).attrs[:statuses]

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
     tweet = client.retweet(params[:tweet_id], {trim_user: true})
     render json: tweet
   end


  private

  def twitter_params
    params.permit(:query, :tweet_query, :tweet_id)
  end
end
