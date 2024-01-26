import React, { useEffect, useState } from 'react';

function RecipeData({ recipeId }) {
    const [recipeData, setRecipeData] = useState([]);

    const recipeDataFetch = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=9e18ededfa274d49bdaff560fc62a9c2`;

    useEffect(() => {
        fetch(recipeDataFetch, {
            headers: { "Content-Type": "application/json" }
        })
            .then(r => r.json())
            .then(recipe => setRecipeData(recipe))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

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
 


    return (
        <div>
            <h2>Ingredients</h2>
            <ul>
            {ingredientsList.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
            ))}
            </ul>
        </div>
    );
}

export default RecipeData;
