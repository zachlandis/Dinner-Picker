import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function RandomizedMenu({ currentUser }) {
  const [randomizedMenu, setRandomizedMenu] = useState([]);

  useEffect(() => {
    // Retrieve randomized menu from local storage
    const storedMenu = localStorage.getItem('randomizedMenu');
    if (storedMenu) {
      setRandomizedMenu(JSON.parse(storedMenu));
    } else {
      // Generate and save randomized menu if not found in local storage
      const shuffledDinners = [...currentUser.dinner_wishlists].sort(() => Math.random() - 0.5).slice(0, 7);
      setRandomizedMenu(shuffledDinners);
      localStorage.setItem('randomizedMenu', JSON.stringify(shuffledDinners));
    }
  }, [currentUser.dinner_wishlists]);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className='centered-content'>
      <h3>This Week's Dinners</h3>
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
