import React, { useEffect, useState } from 'react'

function RecipeCollection() {
    const [recipes, setRecipes] = useState([]);
  
    const searchAllFood = 'https://api.spoonacular.com/food/search?apiKey=9e18ededfa274d49bdaff560fc62a9c2&includeNutrition=true'

    

    useEffect(() => {
        fetch(searchAllFood, {
            headers: {"Content-Type": "application/json"}
        })    
        .then(r => r.json())
        .then(recipes => console.log(recipes))
    }, [])



return (
    <div>

    </div>
  )
}

export default RecipeCollection