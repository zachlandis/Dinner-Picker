import React, { useState } from 'react'

function BuildProfile() {
    const [name, setName] = useState('');
    const [yearOfBirth, setYearOfBirth] = useState('');

    const currentYear = new Date().getFullYear();
    const startYear = 1920;
    const years = Array.from(new Array(currentYear - startYear + 1), (val, index) => currentYear - index);


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
                <option value="">Select Year of Birth</option>
                {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>

            <br/>
            <br/>
            
            <label><strong>Your Diet(s): </strong></label>
            <br/>
            <input
                type='checkbox'
                value='Gluten Free'
            />
            <label>Gluten Free</label>
            <br/>
            <input
                type='checkbox'
                value='Ketogenic'
            />
            <label>Ketogenic</label>
            <br/>
            <input
                type='checkbox'
                value='Vegetarian'
            />
            <label>Vegetarian</label>
            <br/>
            <input
                type='checkbox'
                value='Lacto-Vegetarian'
            />
            <label>Lacto-Vegetarian</label>
            <br/>
            <input
                type='checkbox'
                value='Ovo-Vegetarian'
            />
            <label>Ovo-Vegetarian</label>
            <br/>
            <input
                type='checkbox'
                value='Vegan'
            />
            <label>Vegan</label>
            <br/>
            <input
                type='checkbox'
                value='Pescetarian'
            />
            <label>Pescetarian</label>
            <br/>
            <input
                type='checkbox'
                value='Paleo'
            />
            <label>Paleo</label>
            <br/>
            <input
                type='checkbox'
                value='Primal'
            />
            <label>Primal</label>
            <br/>
            <input
                type='checkbox'
                value='Low FODMAP'
            />
            <label>Low FODMAP</label>
            <br/>
            <input
                type='checkbox'
                value='Whole30'
            />
            <label>Whole30</label>
            <br/>
        </form>
    </div>
  )
}

export default BuildProfile