class SessionsController < ApplicationController
  def create
    user = User.from_omniauth(auth)
    session[:user_id] = user.id
    session[:user_key] = auth['credentials']['token']
    session[:user_secret] = auth['credentials']['secret']
    render json: user
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
