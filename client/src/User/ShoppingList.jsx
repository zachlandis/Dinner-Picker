import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromShoppingList, setShoppingList } from '../Redux/Actions/shoppingListActions';

function ShoppingList({ randomizedMenu }) {
  const dispatch = useDispatch();
  const shoppingList = useSelector(state => state.shoppingList.shoppingListItems);

  useEffect(() => {
    // Check if there's any data stored in localStorage for the shopping list
    const storedShoppingList = JSON.parse(localStorage.getItem('shoppingList'));
    if (storedShoppingList && storedShoppingList.length > 0) {
      dispatch(setShoppingList(storedShoppingList)); // Populate from localStorage
    } else if (randomizedMenu && randomizedMenu.length) {
      // Populate from randomizedMenu if localStorage is empty
      const allIngredients = randomizedMenu.flatMap(dinner => JSON.parse(dinner.ingredients || '[]'));
      const uniqueIngredients = Array.from(new Set(allIngredients));
      dispatch(setShoppingList(uniqueIngredients));
    }
  }, [randomizedMenu, dispatch]);

  const handleRemove = (ingredientId) => {
    dispatch(removeFromShoppingList(ingredientId));
  };

  return (
    <div>
      <h3>Shopping List</h3>
      <div className='wishlist-table-container'>
        <table>
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {shoppingList.map((item) => (
              <tr key={item.id}>
                <td>{item.ingredient}</td>
                <td>
                  <div className="remove-button-container">
                    <button
                      className="remove-button"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShoppingList;
