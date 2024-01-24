import React, { useEffect } from 'react';

function RecipeData({ recipeId }) {
    const recipeData = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=9e18ededfa274d49bdaff560fc62a9c2`;

    useEffect(() => {
        fetch(recipeData, {
            headers: { "Content-Type": "application/json" }
        })
            .then(r => r.json())
            .then(recipe => console.log(recipe))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>RecipeData</div>
    );
}

export default RecipeData;
