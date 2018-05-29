class AddToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :nickname, :string
    add_column :users, :image, :string
    add_column :users, :description, :text
    add_column :users, :url, :string

  end
end
