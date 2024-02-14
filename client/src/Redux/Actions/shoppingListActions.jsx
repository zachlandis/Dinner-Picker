export const REMOVE_FROM_SHOPPING_LIST = 'REMOVE_FROM_SHOPPING_LIST';
export const SET_SHOPPING_LIST = 'SET_SHOPPING_LIST';

export const setShoppingList = (shoppingList) => {
  const formattedShoppingList = shoppingList.map((ingredient, index) => ({
    id: index,
    ingredient: ingredient
  }));

  return {
    type: SET_SHOPPING_LIST,
    payload: formattedShoppingList,
  };
};



export const removeFromShoppingList = (ingredientId) => {
  const shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
  const updatedShoppingList = shoppingList.filter(item => item.id !== ingredientId);
  localStorage.setItem('shoppingList', JSON.stringify(updatedShoppingList));
  
  return {
    type: REMOVE_FROM_SHOPPING_LIST,
    payload: ingredientId,
  };
};
