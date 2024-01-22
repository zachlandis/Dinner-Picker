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
      <div className="profile-section">
        <h3 className="section-header">Intolerances</h3>
        <div className="profile-list">{mappedIntolerances}</div>
      </div>
      <div className="profile-section">
        <h3 className="section-header">Diets</h3>
        <div className="profile-list">{mapppedDiets}</div>
      </div>
      <div className="profile-section">
        <h3 className="section-header">Preferred Cuisines</h3>
        <div className="profile-list">{mappedPreferredCuisines}</div>
      </div>
   </div> 
  )
}

export default Profile