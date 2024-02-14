import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileOptions } from '../Redux/Actions/profileActions.jsx'; 
import { diets, intolerances, preferredCuisines } from './profileOptions';
import { useNavigate } from 'react-router';

function EditProfile() {
  const [profileIntolerances, setProfileIntolerances] = useState([]);
  const [profileDiets, setProfileDiets] = useState([]);
  const [profilePreferredCuisines, setProfilePreferredCuisines] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckboxChange = (option, setterFunction, currentState) => {
    const currentIndex = currentState.indexOf(option);
    let newChecked = [...currentState];

    if (currentIndex === -1) {
      newChecked.push(option);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setterFunction(newChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profileData = {
      dietary_restrictions: profileDiets,
      intolerances: profileIntolerances,
      preferredCuisines: profilePreferredCuisines,
    };

    dispatch(updateProfileOptions(profileData, navigate));
    navigate('/profile');
  };

  const mappedOptions = (options, setterFunction, currentState) => {
    return options.map((option) => (
      <div key={option}>
        <input
          type='checkbox'
          value={option}
          checked={currentState.includes(option)}
          onChange={() => handleCheckboxChange(option, setterFunction, currentState)}
        />
        <label>{option}</label>
      </div>
    ));
  };

  const mappedDiets = mappedOptions(diets, setProfileDiets, profileDiets);
  const mappedIntolerances = mappedOptions(intolerances, setProfileIntolerances, profileIntolerances);
  const mappedPreferredCuisines = mappedOptions(preferredCuisines, setProfilePreferredCuisines, profilePreferredCuisines);

  return (
    <div className="build-profile">
      <h1>Welcome to Dinner Picker</h1>
      <p>We totally get it - you love cooking, but the daily "what's for dinner?" question can feel like a daunting task. That's where we step in to spice things up! But first, let's collect some info to make sure we're only suggesting the dinners that are right for you.</p>

      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="checkbox-group">
          <label><strong>Your Diet(s): </strong></label>
          <div className="checkbox-items">
            {mappedDiets}
          </div>
        </div>

        <div className="checkbox-group">
          <label><strong>Intolerances: </strong></label>
          <div className="checkbox-items">
            {mappedIntolerances}
          </div>
        </div>

        <div className="checkbox-group">
          <label><strong>Preferred Cuisines: </strong></label>
          <div className="checkbox-items">
            {mappedPreferredCuisines}
          </div>
        </div>
        <input type='submit' value='Save' />
      </form>
    </div>
  );
}

export default EditProfile;
