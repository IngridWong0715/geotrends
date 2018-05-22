class CreateTweets < ActiveRecord::Migration[5.2]
  def change
    create_table :tweets do |t|
      t.integer :twitter_id
      t.string :text
      t.datetime :twitter_created_at
      t.string :location
      t.integer :user_id

      t.timestamps
    end
  end
end
