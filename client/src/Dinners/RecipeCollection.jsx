import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../UserContext';

function RecipeCollection() {
    const [recipes, setRecipes] = useState([]);
    const { currentUser } = useContext(UserContext)
  
    const searchProfileFood = `https://api.spoonacular.com/recipes/complexSearch?cuisine=${currentUser.preferredCuisines}&intolerances=${currentUser.intolerances}&diet=${currentUser.dietary_restrictions}&apiKey=9e18ededfa274d49bdaff560fc62a9c2&includeNutrition=true`

    useEffect(() => {
        console.log("Begin fetch")
        fetch(searchProfileFood, {
            headers: {"Content-Type": "application/json"}
        })    
        .then(r => r.json())
        .then(recipes => setRecipes(recipes))
    }, [])


    const mappedRecipes = recipes && recipes.results && Array.isArray(recipes.results)
        ? recipes.results.map((recipe, index) => (
            <div key={index} className="recipe-row">
                <tr>
                    <td className='recipe-image-cell'>
                        <img src={recipe.image} alt={recipe.title} className='recipe-image' />
                    </td>
                    <td>
                        <h3 className='recipe-header'>{recipe.title}</h3>
                        <h5><a href={recipe.link}>Read More</a></h5>
                    </td>
                </tr>
            </div>
        ))
        : null;
      



return (
    <div>
        {mappedRecipes}
    </div>
  )
}

export default RecipeCollection