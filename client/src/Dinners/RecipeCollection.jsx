import React, { useEffect, useState } from 'react'

function RecipeCollection() {
    const [recipes, setRecipes] = useState([]);
  
    const searchAllFood = 'https://api.spoonacular.com/food/search?apiKey=9e18ededfa274d49bdaff560fc62a9c2&includeNutrition=true'

    

    useEffect(() => {
        fetch(searchAllFood, {
            headers: {"Content-Type": "application/json"}
        })    
        .then(r => r.json())
        .then(recipes => setRecipes(recipes))
    }, [])

    const mappedRecipes = recipes && recipes.searchResults && Array.isArray(recipes.searchResults)
        ? 
            recipes.searchResults.flatMap(searchResult =>
            searchResult.results.map((recipe, index) => (
            <div key={index} className="recipe-row">
                <tr>
                    <td className='recipe-image-cell'>
                        <img src={recipe.image} alt={recipe.name} className='recipe-image'/>
                    </td>
                    <td>
                        <h3>{recipe.name}</h3>
                        <h5><a href={recipe.link}>Read More</a></h5>
                    </td>
                </tr>
            </div>

            ))
            )
        : 
            null;
      



return (
    <div>
        {mappedRecipes}
    </div>
  )
}

export default RecipeCollection