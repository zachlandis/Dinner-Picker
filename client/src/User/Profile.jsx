import React, { useContext } from 'react'
// import { UserContext } from './UserContext'


function Profile({ currentUser }) {
  // const { currentUser } = useContext(UserContext);

    const mapItems = (items) => {
      return items.map((item, index) => (
        <div key={index} className="profile-item">
          <h4>{item}</h4>
        </div>
      ))
    }

    const mappedIntolerances = mapItems(currentUser.intolerances)
    const mappedPreferredCuisines = mapItems(currentUser.preferredCuisines)
    const mapppedDiets = mapItems(currentUser.dietary_restrictions)

  
    if(!currentUser) {
      return <h1>Loading...</h1>
    }

  return (
    <div className="profile-page">
      <h1 className="profile-header">Welcome, {currentUser.username}!</h1>
      <table className='profile-table'>
        <thead>
          <tr>
            <th>Intolerances</th>
            <th>Diets</th>
            <th>Preferred Cuisines</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="profile-section">
              {mappedIntolerances}
              </div>
            </td>
            <td>
              <div className="profile-section">
              {mapppedDiets}
              </div>
            </td>
            <td>
              <div className="profile-section">
              {mappedPreferredCuisines}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
   </div> 
  )
}

export default Profile