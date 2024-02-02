class CreateDinnerWishlists < ActiveRecord::Migration[7.1]
  def change
    create_table :dinner_wishlists do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title
      t.text :ingredients
      t.text :instructions

      t.timestamps
    end
  end
end
