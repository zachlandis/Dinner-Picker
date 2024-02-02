class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :dietary_restrictions, :intolerances, :created_at, :dinner_wishlists
end
