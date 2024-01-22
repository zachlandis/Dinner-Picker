class UsersController < ApplicationController
    # before_action :authenticate_user!

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
end