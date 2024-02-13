import React from 'react';
import { Link } from 'react-router-dom';

function RandomizedMenu({ generateRandomizedMenu, randomizedMenu }) {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className='centered-content'>
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
  );
}

export default RandomizedMenu;