require 'jwt'

class SessionsController < ApplicationController
  def create
    user = User.from_omniauth(auth)
   render json: { token: Auth.create_token({ username: user.nickname, id: user.id, uid: user.uid }) }
  end

  private
  def auth
    request.env['omniauth.auth']
  end

end
