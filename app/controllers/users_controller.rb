class UsersController < ApplicationController
    before_action :authenticate_user!, only: [:current, :update]

    def index
        users = User.all
        render json: users
    end

    def current
        if current_user
            render json: current_user
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
        params.require(:user).permit(:dietary_restrictions => [], :intolerances => [], :preferredCuisines => [])
    end


end