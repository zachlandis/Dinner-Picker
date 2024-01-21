class AddUserDataToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :username, :string 
    add_column :users, :dietary_restrictions, :string, array: true, default: []
    add_column :users, :dinner_wishlist, :string, array: true, default: []
  end
end
