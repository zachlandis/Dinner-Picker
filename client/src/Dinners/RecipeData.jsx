import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

function RecipeData() {
    const [recipeData, setRecipeData] = useState({}); 
    const {recipeId} = useParams()

    const recipeDataFetch = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=9e18ededfa274d49bdaff560fc62a9c2`;

    useEffect(() => {
        fetch(recipeDataFetch, {
            headers: { "Content-Type": "application/json" }
        })
            .then(r => r.json())
            .then(recipe => setRecipeData(recipe))
            .catch(error => console.error('Error fetching data:', error));
    }, [recipeId]); 

    const ingredientsList = [];

    if (recipeData.analyzedInstructions && recipeData.analyzedInstructions[0] && recipeData.analyzedInstructions[0].steps) {
        recipeData.analyzedInstructions[0].steps.forEach(step => {
            if (step.ingredients) {
                step.ingredients.forEach(ingredient => {
                    ingredientsList.push(ingredient.name);
                });
            } else {
                console.log("no ingredients")
            }
        });
    }

    function stripHtmlTags(html) {
        const div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
      }
      
 
    return (
        <div>
                <h1>{recipeData.title}</h1>
                <img src={recipeData.image} alt={recipeData.title}/>
                <html>{stripHtmlTags(recipeData.summary)}</html>
                <h2>Ingredients</h2>
                <div className='recipe-ingredients'>
                    <ul>
                        {ingredientsList.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
            </div>
        </div>
    );
}

export default RecipeData;
