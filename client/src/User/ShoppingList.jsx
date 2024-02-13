import React, { useMemo, useState } from 'react';

function ShoppingList({ randomizedMenu }) {
  const [searchTerm, setSearchTerm] = useState('');

  const ingredients = useMemo(() => {
    if (!randomizedMenu) return [];
    const allIngredients = randomizedMenu.flatMap(dinner => JSON.parse(dinner.ingredients || '[]'));
    const uniqueIngredients = Array.from(new Set(allIngredients));
    return uniqueIngredients.sort().map((ingredient, index) => ({ id: index, ingredient }));
  }, [randomizedMenu]);

  const filteredIngredients = useMemo(() => {
    if (!searchTerm.trim()) return ingredients;
    const lowerCaseSearch = searchTerm.trim().toLowerCase();
    return ingredients.filter(ingredient => ingredient.ingredient.toLowerCase().includes(lowerCaseSearch));
  }, [ingredients, searchTerm]);

  const handleRemove = (ingredient) => {
    console.log(`Remove ${ingredient} from Shopping List`);
  };

  return (
    <div className='centered-content'>
      <h3>Shopping List</h3>
      <div className='search-bar'>
        <input
          type='text'
          placeholder='Search ingredients...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='wishlist-table-container'>
        <table className='wishlist-table'>
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {filteredIngredients.map((ingredient) => (
              <tr key={ingredient.id}>
                <td>{ingredient.ingredient}</td>
                <td>
                  <div className="remove-button-container">
                    <button
                      className="remove-button"
                      onClick={() => handleRemove(ingredient.ingredient)}
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
