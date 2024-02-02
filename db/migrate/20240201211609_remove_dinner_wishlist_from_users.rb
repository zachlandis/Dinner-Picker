class RemoveDinnerWishlistFromUsers < ActiveRecord::Migration[7.1]
  def change
    remove_column :users, :dinner_wishlist, :jsonb
  end
end
