class CreatePlaces < ActiveRecord::Migration[5.2]
  def change
    create_table :places do |t|
      t.string :name
      t.string :url
      t.integer :parentid
      t.string :country
      t.integer :woeid
      t.string :countryCode
      t.integer :twitter_id
      t.timestamps
    end
  end
end
