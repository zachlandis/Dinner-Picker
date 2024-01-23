import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router';

function Profile() {
  const { currentUser } = useContext(UserContext)
  const navigate = useNavigate();

  const listItems = (items) => {
    return items.join(', ')
  }

    const mappedIntolerances = listItems(currentUser.intolerances)
    const mappedPreferredCuisines = listItems(currentUser.preferredCuisines)
    const mapppedDiets = listItems(currentUser.dietary_restrictions)

  
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
   </div> 
  )
}

export default Profile