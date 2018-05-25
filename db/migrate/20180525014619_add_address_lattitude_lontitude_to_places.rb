class AddAddressLattitudeLontitudeToPlaces < ActiveRecord::Migration[5.2]
  def change
    add_column :places, :address, :text
    add_column :places, :latitude, :float
    add_column :places, :longitude, :float
    add_column :places, :visited_by, :string
    add_column :places, :title, :string
  end
end
