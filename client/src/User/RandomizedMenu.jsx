import React from 'react'
import { Link } from 'react-router-dom';

function RandomizedMenu({ currentUser }) {

    const shuffledDinners = [...currentUser.dinner_wishlists].sort(() => Math.random() - 0.5).slice(0, 7);

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const randomizedMenu = shuffledDinners.map((dinner, index) => (
        <tr key={dinner.id} className='randomized-menu-item-columns'>
            <td><strong>{daysOfWeek[index]}</strong></td>
            <td><Link to={`http://localhost:5173/recipe/${dinner.recipe_id}`}>{dinner.title}</Link></td>
        </tr>
    ));

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
                {randomizedMenu}
            </tbody>
        </table>
    </div>
  )
}

export default RandomizedMenu