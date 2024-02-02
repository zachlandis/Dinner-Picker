export const UPDATE_WISHLIST_SUCCESS = 'UPDATE_WISHLIST_SUCCESS';
export const UPDATE_WISHLIST_FAILURE = 'UPDATE_WISHLIST_FAILURE';

export const updateWishlist = (recipeDetails, recipeId, lineByLineInstructions) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/dinner_wishlists`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          dinner_wishlist: {
            title: recipeDetails.title,
            ingredients: recipeDetails.extendedIngredients.map(
              (ingredient) => ingredient.name
            ),
            instructions: lineByLineInstructions(recipeDetails.instructions),
            recipe_id: recipeId,
          },
        }),
      });

      if (response.ok) {
        dispatch({ type: UPDATE_WISHLIST_SUCCESS });
        console.log('Recipe added to wishlist');
      } else {
        dispatch({ type: UPDATE_WISHLIST_FAILURE });
        console.error('Error updating wishlist');
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
      dispatch({ type: UPDATE_WISHLIST_FAILURE });
    }
  };
};



export const REMOVE_FROM_WISHLIST_SUCCESS = 'REMOVE_FROM_WISHLIST_SUCCESS';
export const REMOVE_FROM_WISHLIST_FAILURE = 'REMOVE_FROM_WISHLIST_FAILURE';

export const removeFromWishlist = (userId, itemId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/dinner_wishlists/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        dispatch({ type: REMOVE_FROM_WISHLIST_SUCCESS, itemId });
        console.log('Recipe removed from wishlist');
      } else {
        dispatch({ type: REMOVE_FROM_WISHLIST_FAILURE });
        console.error('Error removing recipe from wishlist', itemId);
      }
    } catch (error) {
      console.error('Error removing recipe from wishlist:', error);
      dispatch({ type: REMOVE_FROM_WISHLIST_FAILURE });
    }
  };
};
