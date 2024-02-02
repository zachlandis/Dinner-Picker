class DinnerWishlistsController < ApplicationController
    # before_action :authenticate_user!
    
  
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
      @wishlist = @user.dinner_wishlists.find(params[:id])
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
      @user = User.find(params[:user_id])
    end
  
    def wishlist_params
      params.require(:dinner_wishlist).permit(
        :title,
        :instructions => [],
        :ingredients => []
      )
    end
  end
  