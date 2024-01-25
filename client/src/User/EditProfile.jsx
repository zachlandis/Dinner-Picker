import React, { useContext, useState } from 'react'
import { diets, intolerances, preferredCuisines } from './profileOptions'
import { useNavigate } from 'react-router';
import { UserContext } from '../UserContext';


function EditProfile() {
    const [profileIntolerances, setProfileIntolerances] = useState([]);
    const [profileDiets, setProfileDiets] = useState([])
    const [profilePreferredCuisines, setProfilePreferredCuisines] = useState([])
    const {currentUser, setCurrentUser} = useContext(UserContext)
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

    async function handleSubmit(e) {
        e.preventDefault();
        const url = 'http://localhost:3000/update_user'
        
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    user: {
                        dietary_restrictions: profileDiets,
                        intolerances: profileIntolerances,
                        preferredCuisines: profilePreferredCuisines,
                    }
                })
            });
        
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
            const data = await response.json();
            console.log('Update successful:', data);
            await refetchCurrentUser();
            navigate('/profile')
            
        } catch (error) {
            console.error('Update failed:', error);   
        }
    }

    async function refetchCurrentUser() {
        const response = await fetch('http://localhost:3000/current_user', {
            credentials: 'include'
        });
        if (response.ok) {
            const updatedUser = await response.json();
            setCurrentUser(updatedUser)
        }
    }
    

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
                <input type='submit' value='Save'/>
            </form>
        </div>
    );
}

export default EditProfile;