import React, { useState } from 'react'
import { diets, intolerances, preferredCuisines } from './profileOptions'

function BuildProfile() {
    const [name, setName] = useState('');
    const [yearOfBirth, setYearOfBirth] = useState('');

    const currentYear = new Date().getFullYear();
    const startYear = 1920;
    const years = Array.from(new Array(currentYear - startYear + 1), (val, index) => currentYear - index);

    const mappedDiets = diets.map((diet) => (
        <div>
            <input
                type='checkbox'
                value={diet}
            />
            <label>{diet}</label>
        </div>
    ))

    const mappedIntolerances = intolerances.map((intolerance) => (
        <div>
            <input
                type='checkbox'
                name={intolerance}
            />
            <label>{intolerance}</label>
        </div>
    ))

    const mappedPreferredCuisines = preferredCuisines.map((cuisine) => (
        <div>
            <input
                type='checkbox'
                value={cuisine}
            />
            <label>{cuisine}</label>
        </div>
    ))


    return (
        <div className="build-profile">
            <h1>Welcome to Dinner Picker</h1>
            <p>We totally get it - you love cooking, but the daily "what's for dinner?" question can feel like a daunting task. That's where we step in to spice things up! But first, let's collect some info to make sure we're only suggesting the dinners that are right for you.</p>
            
            <form className="profile-form">
                <div className="form-group">
                    <label><strong>Your Name: </strong></label>
                    <input
                        type='text'
                        name='name'
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label><strong>Year of Birth: </strong></label>
                    <select
                        name='yearOfBirth'
                        className="form-control"
                        value={yearOfBirth}
                        onChange={(e) => setYearOfBirth(e.target.value)}
                    >
                        <option value="">Year of Birth</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

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
                <input type='submit' value='Create Your Profile'/>
            </form>
        </div>
    );
}

export default BuildProfile;