# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  before_action :configure_sign_in_params, only: [:create]
  

  # GET /resource/sign_in
  def new
    super
  end

  # POST /resource/sign_in
  def create
    super do |user|
      if user.persisted?
        render json: { user: user }, status: :ok and return
      else
        render json: { error: 'Invalid email or password' }, status: :unauthorized and return
      end
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
