# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  before_action :configure_sign_in_params, only: [:create]

  

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  def create
    user = User.find_by(email: params[:user][:email])
      if user&.valid_password?(params[:user][:password])
        sign_in :user, user
        render json: { success: true, user: user.as_json }, status: :ok
      else
        render json: { success: false, error: 'Invalid email or password' }, status: :unauthorized
      end
  end
  

  # DELETE /resource/sign_out
  def destroy
    super do |resource|
      render json: { message: 'Logged out successfully' }, status: :ok and return
    end
  end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_in_params
    devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  end
end