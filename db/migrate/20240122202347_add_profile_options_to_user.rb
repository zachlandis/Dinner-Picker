class AddProfileOptionsToUser < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :intolerances, :string, array: true, default: []
    add_column :users, :preferredCuisines, :string, array: true, default: []
  end
end
