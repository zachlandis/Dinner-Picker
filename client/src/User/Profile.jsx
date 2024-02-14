import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Wishlist from './Wishlist';
import { Link } from 'react-router-dom';
import RandomizedMenu from './RandomizedMenu';
import ShoppingList from './ShoppingList';
import { fetchCurrentUser } from '../Redux/Actions/authActions';

function Profile() {
  const dispatch = useDispatch();
  const [foodTrivia, setFoodTrivia] = useState('');
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [randomizedMenu, setRandomizedMenu] = useState([]);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    const storedMenu = localStorage.getItem('randomizedMenu');
    if (storedMenu) {
      setRandomizedMenu(JSON.parse(storedMenu));
    } else {
      generateRandomizedMenu();
    }
  }, []); 


  const generateRandomizedMenu = () => {
    if (currentUser?.dinner_wishlists?.length > 0) {
      const shuffledDinners = [...currentUser.dinner_wishlists].sort(() => Math.random() - 0.5).slice(0, 7);
      setRandomizedMenu(shuffledDinners);
      localStorage.setItem('randomizedMenu', JSON.stringify(shuffledDinners));
    }
  };

  if (!currentUser) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="profile-page">
      <div>
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
          <strong>Diets: </strong>{currentUser?.dietary_restrictions?.join(', ')}
        </div>
        <div>
          <strong>Intolerances: </strong>{currentUser?.intolerances?.join(', ')}
        </div>
        <div>
          <strong>Preferred Cuisines: </strong>{currentUser?.preferredCuisines?.join(', ')}
        </div>
      </div>
      <br/>
      <div className='random-menu-shopping-list-container'>
        <table className='components-table'>
          <tbody>
            <tr>
              <td className='component-cell'>
                <div className='randomized-menu-container'>
                  <RandomizedMenu generateRandomizedMenu={generateRandomizedMenu} randomizedMenu={randomizedMenu} />
                </div>
              </td>
              {randomizedMenu.length > 0 ?
              <td className='component-cell'>
                <div>
                  <ShoppingList randomizedMenu={randomizedMenu}/>
                </div>
              </td>
              : null}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="random-trivia">{foodTrivia}</div>
      <br/>
      
      <div className='profile-preferences'>
        <Wishlist currentUser={currentUser} />
      </div>
    </div>
  );
}

export default Profile;
