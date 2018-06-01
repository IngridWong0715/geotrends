require 'jwt'


class SessionsController < ApplicationController
  def create
    user = User.from_omniauth(auth)
    render json: { token: Auth.create_token({ username: user.nickname, id: user.id, uid: user.uid }) }
  end

  def signin_status
    render json: session[:user_id]
  end


  def destroy
    reset_session
    render json: {message: "Signed Out"}
  end


  private
  def auth
    request.env['omniauth.auth']
  end



end
