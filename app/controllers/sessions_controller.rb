class SessionsController < ApplicationController
  def create
  user = User.from_omniauth(request.env['omniauth.auth'])
  session[:user_id] = user.id

  render json: user
  end



end
