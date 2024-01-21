import React, { useState } from 'react'

function BuildProfile() {
    const [name, setName] = useState('');
    const [yearOfBirth, setYearOfBirth] = useState('');

    const currentYear = new Date().getFullYear();
    const startYear = 1920;
    const years = Array.from(new Array(currentYear - startYear + 1), (val, index) => currentYear - index);

    const diets = ["Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian", "Ovo-Vegetarian", "Vegan", "Pescetarian", "Paleo", "Primal", "Low FODMAP", "Whole30"]

    const mappedDiets = diets.map((diet) => (
        <div>
            <input
                type='checkbox'
                value={diet}
            />
            <label>{diet}</label>
        </div>
    ))

    const intolerances = ["Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood", "Sesame", "Shellfish", "Soy", "Sulfite", "Tree Nut", "Wheat"]

    const mappedIntolerances = intolerances.map((intolerance) => (
        <div>
            <input
                type='checkbox'
                name={intolerance}
            />
            <label>{intolerance}</label>
        </div>
    ))


  return (
    <div>
        <h1>Welcome to Dinner Picker</h1>
        <p>We totally get it - you love cooking, but the daily "what's for dinner?" question can feel like a daunting task. That's where we step in to spice things up! But first, let's collect some info to make sure we're only suggesting the dinners that are right for you.</p>
        <form>
            <label><strong>Your Name: </strong></label>
            <input
                type='text'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <br/>
            <label><strong>Year of Birth: </strong></label>
            <select
                name='yearOfBirth'
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

            <br/>
            <br/>

            <label><strong>Your Diet(s): </strong></label>
            <div>
                {mappedDiets}
            </div>
            <br/>
            <label><strong>Intolerances</strong></label>
            <div>
                {mappedIntolerances}
            </div>
        </form>
    </div>
  )
}

export default BuildProfile