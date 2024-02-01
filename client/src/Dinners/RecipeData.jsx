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

    function stripHtmlTags(html) {
        const div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
      }
    
      function lineByLineInstructions(instructions) {
        const textContent = stripHtmlTags(instructions);
        const numberedInstructions = textContent.split(/\. +/).map((step, index) => (
          <p key={index}>{`${index + 1}. ${step}`}</p>
        ));
        return numberedInstructions;
      }
      
      
 
    return (
        <div>
            <div className='recipe-data-container'>
                <h1>{recipeData.title}</h1>
                <img src={recipeData.image} alt={recipeData.title}/>
                <html>{stripHtmlTags(recipeData.summary)}</html>
                <div className='recipe-data-container'>
                <h2>Ingredients</h2>
                <div className='recipe-ingredients'>
                    <ul>
                    {recipeData.extendedIngredients &&
                        [...new Set(recipeData.extendedIngredients.map(ingredient => ingredient.name))]
                        .sort()
                        .map((ingredientName, index) => (
                            <li key={index}>{ingredientName}</li>
                        ))}
                    </ul>
                </div>
                </div>
                <div className='recipe-data-container'>
                    <h2>Cooking Instructions</h2>
                    <p>{lineByLineInstructions(recipeData.instructions)}</p>
                </div>
            </div>
        </div>
    );
}

export default RecipeData;
