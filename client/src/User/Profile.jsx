import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Wishlist from './Wishlist';
import { Link } from 'react-router-dom';
import RandomizedMenu from './RandomizedMenu';
import ShoppingList from './ShoppingList';

function Profile() {
  const [foodTrivia, setFoodTrivia] = useState('');
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [randomizedMenu, setRandomizedMenu] = useState([]);

  useEffect(() => {
    const storedMenu = localStorage.getItem('randomizedMenu');
    if (storedMenu) {
      setRandomizedMenu(JSON.parse(storedMenu));
    } else {
      generateRandomizedMenu();
    }
  }, []); 

  const generateRandomizedMenu = () => {
    const shuffledDinners = [...currentUser.dinner_wishlists].sort(() => Math.random() - 0.5).slice(0, 7);
    setRandomizedMenu(shuffledDinners);
    localStorage.setItem('randomizedMenu', JSON.stringify(shuffledDinners));
  };

  if (!currentUser) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="profile-page">
      {/* Profile header and preferences */}
      <div>
        {/* Profile header */}
        <table className='profile-header-table'>
          <tr>
            <td className='username-cell'><h1>{currentUser?.username || 'User'}</h1></td>
            <td className='edit-profile-cell'><Link to="/edit-profile">Edit Profile</Link></td>
          </tr>
        </table>
      </div>
      <br/>
      <div className='profile-preferences'>
        <div>
          <strong>Diets: </strong>{currentUser?.dietary_restrictions.join(', ')}
        </div>
        <div>
          <strong>Intolerances: </strong>{currentUser?.intolerances.join(', ')}
        </div>
        <div>
          <strong>Preferred Cuisines: </strong>{currentUser?.preferredCuisines.join(', ')}
        </div>
      </div>
      <br/>
      <div className='random-menu-shopping-list-container'>
        {/* Randomized menu and shopping list */}
        <table className='components-table'>
          <tbody>
            <tr>
              <td className='component-cell'>
                {/* Randomized menu */}
                <div className='randomized-menu-container'>
                  <RandomizedMenu currentUser={currentUser} generateRandomizedMenu={generateRandomizedMenu} randomizedMenu={randomizedMenu} />
                </div>
              </td>
              <td className='component-cell'>
                {/* Shopping list */}
                <div className='shopping-list-container'>
                  <ShoppingList randomizedMenu={randomizedMenu}/>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Food trivia */}
      <div className="random-trivia">{foodTrivia}</div>
      <br/>
      {/* User wishlist */}
      <div className='profile-preferences'>
        <Wishlist currentUser={currentUser} />
      </div>
    </div>
  );
}

export default Profile;
