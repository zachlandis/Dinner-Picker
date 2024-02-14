class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :dietary_restrictions, :intolerances, :preferredCuisines, :created_at, :dinner_wishlists
end
