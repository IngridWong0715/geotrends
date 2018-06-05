class User < ApplicationRecord
  has_secure_password
  has_many :tweets


  def self.from_omniauth(auth)
    binding.pry
    where(uid: auth['uid']).first_or_create do |u|
      u.uid = auth['uid']
      u.name = auth['info']['name']
      u.nickname = auth['info']['nickname']
      u.image = auth['info']['image']
      u.url = auth['info']['urls']['Twitter']
      u.description = auth['info']['description']
    end
  end
end
