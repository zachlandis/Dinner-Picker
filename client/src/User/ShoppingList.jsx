import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromShoppingList } from '../Redux/Actions/shoppingListActions';

function ShoppingList({ randomizedMenu }) {
  const [shoppingList, setShoppingList] = useState([]);

  useState(() => {
    if (randomizedMenu && randomizedMenu.length) {
      const allIngredients = randomizedMenu.flatMap(dinner => JSON.parse(dinner.ingredients || '[]'));
      const uniqueIngredients = Array.from(new Set(allIngredients));
      setShoppingList(uniqueIngredients.map((ingredient, index) => ({ id: index, ingredient })));
    }
  }, [randomizedMenu]);

  const dispatch = useDispatch();

  const handleRemove = (ingredientId) => {
    const updatedShoppingList = shoppingList.filter(item => item.id !== ingredientId);
    setShoppingList(updatedShoppingList);
    dispatch(removeFromShoppingList(ingredientId));
  };

  return (
    <div className='centered-content'>
      <h3>Shopping List</h3>
      <div className='wishlist-table-container'>
        <table className='wishlist-table'>
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
