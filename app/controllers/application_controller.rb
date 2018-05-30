class ApplicationController < ActionController::API
  private

   def client
     @client ||= Twitter::REST::Client.new do |config|
       config.consumer_key        = ENV["CONSUMER_KEY"]
       config.consumer_secret     = ENV["CONSUMER_SECRET"]
       config.access_token        = ENV["MY_ACCESS_TOKEN"]
       config.access_token_secret = ENV["MY_ACCESS_TOKEN_SECRET"]
     end
   end

end
