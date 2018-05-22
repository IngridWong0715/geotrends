class Api::TweetsController < ApplicationController

  def trending
    render json: Tweet.all
  end

end
