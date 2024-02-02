class AddRecipeIdToDinnerWishlistsIfNeeded < ActiveRecord::Migration[7.1]
  def change
    unless column_exists?(:dinner_wishlists, :recipe_id)
      add_column :dinner_wishlists, :recipe_id, :integer
    end
  end
end
