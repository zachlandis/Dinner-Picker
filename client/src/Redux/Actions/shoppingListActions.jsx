export const REMOVE_FROM_SHOPPING_LIST = 'REMOVE_FROM_SHOPPING_LIST';

export const removeFromShoppingList = (ingredientId) => {
  const shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
  const updatedShoppingList = shoppingList.filter(item => item.id !== ingredientId);
  localStorage.setItem('shoppingList', JSON.stringify(updatedShoppingList));
  
  return {
    type: REMOVE_FROM_SHOPPING_LIST,
    payload: ingredientId,
  };
};
