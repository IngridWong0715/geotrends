class Place < ApplicationRecord
  geocoded_by :address
  after_validation :geocode, if: ->(obj){ obj.address.present? and obj.address_changed? }
  #the Google API has its usage limits, so we don’t want to query it if the address was unchanged or was not presented at all:


end
