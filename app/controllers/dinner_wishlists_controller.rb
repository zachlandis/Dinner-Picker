class DinnerWishlistsController < ApplicationController
    # before_action :authenticate_user!
    before_action :set_user, only: [:index, :create, :show, :destroy]
    
  
    def index
        @wishlists = DinnerWishlist.all
        render json: @wishlists
    end
  
    def create
      @wishlist = @user.dinner_wishlists.build(wishlist_params)
      if @wishlist.save
        render json: @wishlist, status: :created
      else
        render json: { errors: @wishlist.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def show
      @wishlist = @user.dinner_wishlists.find(params[:id])
      render json: @wishlist
    end
  
    def update
      user_id = params[:user][:user_id] 
      @wishlist = User.find(user_id).dinner_wishlists.find(params[:id])
      if @wishlist.update(wishlist_params)
        render json: @wishlist
      else
        render json: { errors: @wishlist.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def destroy
      @wishlist = @user.dinner_wishlists.find(params[:id])
      @wishlist.destroy
      head :no_content
    end
  
    private
  
    def set_user
      @user = current_user
    end
  
    def wishlist_params
      params.require(:dinner_wishlist).permit(
        :title,
        :recipe_id,
        :instructions => [],
        :ingredients => []
      )
    end
  end
  