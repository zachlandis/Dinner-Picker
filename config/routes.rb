Rails.application.routes.draw do
  devise_for :users, controllers: {
  sessions: 'users/sessions',
  registrations: 'users/registrations'
}

resources :dinner_wishlists, only: [:index]
# , :create, :show, :update, :destroy]

  # resource :users
  get '/users', to: 'users#index'
  
  get '/current_user', to: 'users#current'
  patch '/update_user', to: 'users#update' 

  # Reveal health status on /up
  get "up" => "rails/health#show", as: :rails_health_check

  # Root route (uncomment and modify as needed)
  # root "posts#index"
end
