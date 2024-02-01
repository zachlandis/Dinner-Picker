import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Wishlist from './Wishlist';
import { Link } from 'react-router-dom';

function Profile() {
  const [foodTrivia, setFoodTrivia] = useState('');
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const listItems = (items) => {
    return items.join(', ');
  };

  const mappedIntolerances = listItems(currentUser?.intolerances || []);
  const mappedPreferredCuisines = listItems(currentUser?.preferredCuisines || []);
  const mapppedDiets = listItems(currentUser?.dietary_restrictions || []);

  // const randomFoodTrivia =
  //   'https://api.spoonacular.com/food/trivia/random?apiKey=9e18ededfa274d49bdaff560fc62a9c2';

  // useEffect(() => {
  //   fetch(randomFoodTrivia, {
  //     headers: { 'Content-Type': 'application/json' },
  //   })
  //     .then((r) => r.json())
  //     .then((trivia) => setFoodTrivia(trivia.text))
  //     .catch((error) => {
  //       console.error('Error fetching food trivia:', error);
  //     });
  // }, []);

  

  if (!currentUser) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="profile-page">
      <h1 className="profile-header">{currentUser?.username || 'User'}</h1>
      <div className='edit-profile-link'><Link to="/edit-profile">Edit Profile</Link></div>
      <table className="profile-table">
        <tbody>
          <tr>
            <td className="profile-cell">
              <p>
                <strong>Diets: </strong>
                {mapppedDiets}
              </p>
              <p>
                <strong>Intolerances: </strong>
                {mappedIntolerances}
              </p>
              <p>
                <strong>Preferred Cuisines: </strong>
                {mappedPreferredCuisines}
              </p>
            </td>
            <td className="profile-cell">
              <h3>This Week's Dinners</h3>
              <ul>
                <li>test</li>
                <li>test</li>
                <li>test</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="random-trivia">{foodTrivia}</div>
      <div>
        {/* <Wishlist currentUser={currentUser} /> */}
      </div>
    </div>
  );
}

export default Profile;
