require 'jwt'
require 'pry'

class Auth

  def self.create_token(user_obj)
    payload = { user: user_obj}
    JWT.encode(payload, ENV['AUTH_SECRET'], ENV['AUTH_ALGORITHM'])
    #eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiSW5ncmlkV29uZzA3MTUiLCJpZCI6MSwidWlkIjoyOTk4NTczOTkwfX0.PY482fJU3lf1WX1R8rdE7pg6iuILLrFSywgzSdulP3s

    binding.pry


  end

  def self.decode_token(token)
    JWT.decode(token, ENV['AUTH_SECRET'], true, {algorithm: ENV['AUTH_ALGORITHM']})
  end

end
