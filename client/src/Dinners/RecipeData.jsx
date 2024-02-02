import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipeDetails } from '../Redux/Actions/fetchRecipeDetailActions';
import { updateWishlist } from '../Redux/Actions/wishlistActions';

function RecipeData() {
    const { recipeId } = useParams();
    const currentUser = useSelector((state) => state.auth.currentUser);
    const recipeDetails = useSelector((state) => state.recipeDetails.recipeDetails);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchRecipeDetails(recipeId));
    }, [recipeId, dispatch]);
    

    
    
    function handleWishlist() {
        dispatch(updateWishlist(recipeDetails, recipeId, lineByLineInstructions));
      }

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



    // function handleWishlist() {
    //     const userId = currentUser.id;

        
    //     fetch(`http://localhost:3000/update_user/`, {
    //         method: "PATCH",
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //         },
    //         credentials: 'include',
    //         body: JSON.stringify({
    //             user: {
    //                 dinner_wishlist: [
    //                     {
    //                         title: recipeDetails.title, 
    //                         ingredients: recipeDetails.extendedIngredients.map((ingredient) => ingredient.name),
    //                         instructions: lineByLineInstructions(recipeDetails.instructions),
    //                         recipe_id: recipeId,
    //                     }
    //                 ]
    //             }
    //         })
    //     })
    //         .then(response => {
    //             if (response.ok) {
    //                 console.log('Recipe added to wishlist');
    //             } else {
    //                 console.error('Error updating wishlist');
    //             }
    //         })
    //         .catch(error => console.error('Error updating wishlist:', error));
    // }

    return (
        <div>
            <div className='recipe-data-container'>
                <h1>{recipeDetails.title}</h1>
                <img src={recipeDetails.image} alt={recipeDetails.title} />
                <br/>
                <button onClick={handleWishlist}>Add to Wishlist</button>
                <p>{stripHtmlTags(recipeDetails.summary)}</p>
                <div className='recipe-data-container'>
                    <h2>Ingredients</h2>
                    <div className='recipe-ingredients'>
                        <ul>
                            {recipeDetails.extendedIngredients &&
                                [...new Set(recipeDetails.extendedIngredients.map(ingredient => ingredient.name))]
                                    .sort()
                                    .map((ingredientName, index) => (
                                        <li key={index}>{ingredientName}</li>
                                    ))}
                        </ul>
                    </div>
                </div>
                <div className='recipe-data-container'>
                    <h2>Cooking Instructions</h2>
                    <p>{lineByLineInstructions(recipeDetails.instructions)}</p>
                </div>
            </div>
        </div>
    );
}

export default RecipeData;
