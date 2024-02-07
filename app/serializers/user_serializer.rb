class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :dietary_restrictions, :intolerances, :preferredCuisines, :created_at, :dinner_wishlists
end
