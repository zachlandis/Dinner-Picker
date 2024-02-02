# Create a user
user = User.create!(
  email: 'test5@example.com',
  username: 'Bert',
  password: 'Test123',
  dietary_restrictions: [],
  intolerances: [],
  preferredCuisines: []
)

user.dinner_wishlists.create!(
  title: 'Recipe 1 Title',
  recipe_id: 222222,
  ingredients: [
    'Ingredient 1',
    'Ingredient 2',
    'Ingredient 3'
  ],
  instructions: [
    'Step 1: Do something',
    'Step 2: Do something else',
    'Step 3: Complete the recipe'
  ]
)
