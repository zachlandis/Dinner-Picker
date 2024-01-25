import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router';
import Wishlist from './Wishlist';

function Profile() {
  const { currentUser } = useContext(UserContext)
  const [foodTrivia, setFoodTrivia] = useState('');
  const navigate = useNavigate();

  const listItems = (items) => {
    return items.join(', ')
  }

    const mappedIntolerances = listItems(currentUser.intolerances)
    const mappedPreferredCuisines = listItems(currentUser.preferredCuisines)
    const mapppedDiets = listItems(currentUser.dietary_restrictions)

  const randomFoodTrivia = "https://api.spoonacular.com/food/trivia/random?apiKey=9e18ededfa274d49bdaff560fc62a9c2"


  useEffect(() => {
    fetch(randomFoodTrivia, {
      headers: {"Content-Type": "application/json"}
    })
      .then(r => r.json())
      .then(trivia => setFoodTrivia(trivia))
  }, [])

  
    if(!currentUser) {
      return <h1>Loading...</h1>
    }

  return (
    <div className="profile-page">
      <h1 className="profile-header">{currentUser.username}</h1>
      <table className='profile-table'>
        <tr>
          <div className='edit-profile-button'>
            <button onClick={() => navigate('/edit-profile')}>Edit Profile</button>
          </div>
        </tr>
        <tr>
          <td className='profile-cell'>
              <p><strong>Diets: </strong>{mapppedDiets}</p>
              <p><strong>Intolerances: </strong>{mappedIntolerances}</p>
              <p><strong>Preferred Cuisines: </strong>{mappedPreferredCuisines}</p>
          </td>
          <td className='profile-cell'>
            <h3>This Week's Dinners</h3>
            <ul>
              <li>test</li>
              <li>test</li>
              <li>test</li>
            </ul>
          </td>
        </tr>
      </table>
      <div className='random-trivia'>
        {foodTrivia.text}
      </div>
      <div>
        <Wishlist />
      </div>
   </div> 
  )
}

export default Profile