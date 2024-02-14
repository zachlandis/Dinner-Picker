Rails.application.routes.draw do
  # Devise routes for user authentication
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  devise_scope :user do
    get '/login', to: 'devise/sessions#new'
    # Other Devise routes
  end 

  # Other resources routes
  resources :dinner_wishlists, only: [:index, :create, :show, :update, :destroy]

  # Route for fetching a user's dinner wishlists
  resources :users do
    resources :dinner_wishlists, only: [:index]  # Assuming you only need index action
  end 

  # Routes for user-related actions
  get '/current_user', to: 'users#current'
  patch '/update_user', to: 'users#update' 

  # Reveal health status on /up
  get "up" => "rails/health#show", as: :rails_health_check

  # Root route (uncomment and modify as needed)
  # root "posts#index"
end
