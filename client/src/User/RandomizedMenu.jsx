import React from 'react';
import { Link } from 'react-router-dom';

function RandomizedMenu({ generateRandomizedMenu, randomizedMenu, currentUser }) {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className='centered-content'>
      {currentUser.dinner_wishlists.length > 0 ? 
      <div>
        <h3>This Week's Dinners</h3>
        <button onClick={generateRandomizedMenu}>Shuffle Menu</button>
        <table className='randomized-menu-table'>
          <thead>
            <tr className='randomized-menu-item-columns'>
              <td><strong>Day</strong></td>
              <td><strong>Dinner</strong></td>
            </tr>
          </thead>
          <tbody>
            {randomizedMenu.map((dinner, index) => (
              <tr key={dinner.id} className='randomized-menu-item-columns'>
                <td><strong>{daysOfWeek[index]}</strong></td>
                <td><Link to={`http://localhost:5173/recipe/${dinner.recipe_id}`}>{dinner.title}</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      :
      <div className='create-wishlist-notification'>
        <h1>Edit your profile, go to 'Recipes' at the top of the page, and fill up your wishlist. Then you'll be able to generate your random menu!</h1>
      </div>
      }
    </div>
  );
}

export default RandomizedMenu;
