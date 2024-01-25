class UsersController < ApplicationController
    before_action :authenticate_user!, only: [:update]

    def index
        @users = User.all
        render json: @users
    end

    def current
        if current_user
            render json: {
            id: current_user.id,
            username: current_user.username,
            email: current_user.email,
            sign_in_count: current_user.sign_in_count,
            dietary_restrictions: current_user.dietary_restrictions,
            intolerances: current_user.intolerances,
            preferredCuisines: current_user.preferredCuisines,
            dinner_wishlist: current_user.dinner_wishlist
            }
        else
            render json: { error: 'Not authenticated' }, status: :unauthorized
        end
    end

    
    def update
        if current_user.update(user_params)
            render json: { success: 'Profile updated successfully' }, status: :ok
        else
            render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def user_params
        params.require(:user).permit(:dietary_restrictions => [], :intolerances => [], :preferredCuisines => [], :dinner_wishlist => [])
    end


end