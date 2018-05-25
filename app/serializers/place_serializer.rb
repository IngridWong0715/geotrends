class PlaceSerializer < ActiveModel::Serializer
  attributes :woeid, :address, :longitude, :latitude
end
