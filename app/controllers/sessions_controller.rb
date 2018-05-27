class SessionsController < ApplicationController
  def create
    raise :test
    @user = User.find_or_create_by(uid: auth['uid'])
    session[:user] = @user
    redirect_to '/'
  end

  private

  def auth
    request.env['omniauth.auth']
  end

end
