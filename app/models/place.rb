class Place < ApplicationRecord
  geocoded_by :address
  after_validation :geocode, if: ->(obj){ obj.address.present? and obj.address_changed? }

#RUN THIS METHOD TO MAKE SURE THAT ALL ARE GEOCODED SO THEY SHOW UP IN MARKERS
  def self.find_non_geocoded_locations
    Place.where(longitude: nil)
  end
end
