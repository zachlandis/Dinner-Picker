import React, {useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Wishlist from './Wishlist';
import { Link } from 'react-router-dom';
import RandomizedMenu from './RandomizedMenu';
import ShoppingList from './ShoppingList';

function Profile() {
  const [foodTrivia, setFoodTrivia] = useState('');
  const currentUser = useSelector((state) => state.auth.currentUser);

  const listItems = (items) => {
    return items.join(', ');
  };

  const mappedIntolerances = listItems(currentUser?.intolerances || []);
  const mappedPreferredCuisines = listItems(currentUser?.preferredCuisines || []);
  const mapppedDiets = listItems(currentUser?.dietary_restrictions || []);

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
            <strong>Diets: </strong>
            {mapppedDiets}
        </div>
        <div>
            <strong>Intolerances: </strong>
            {mappedIntolerances}
        </div>
        <div>
            <strong>Preferred Cuisines: </strong>
            {mappedPreferredCuisines}
        </div>
      </div>
      <br/>
      <div className='random-menu-shopping-list-container'>
        <table className='components-table'>
          <tbody>
            <tr>
              <td className='component-cell'>
                <div className='randomized-menu-container'>
                  <RandomizedMenu currentUser={currentUser} />
                </div>
              </td>
              <td className='component-cell'>
                <div className='shopping-list-container'>
                  <ShoppingList />
                </div>
              </td>
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
