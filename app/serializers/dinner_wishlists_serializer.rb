class DinnerWishlistsSerializer < ActiveModel::Serializer
  attributes :id, :title, :instructions, :ingredients
end
