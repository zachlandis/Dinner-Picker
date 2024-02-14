import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipeDetails } from '../Redux/Actions/fetchRecipeDetailActions';
import { updateWishlist, removeFromWishlist } from '../Redux/Actions/wishlistActions';

function RecipeData() {
    const { recipeId } = useParams();
    const [inWishlist, setInWishlist] = useState(false)
    const currentUser = useSelector((state) => state.auth.currentUser);
    const recipeDetails = useSelector((state) => state.recipeDetails.recipeDetails);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchRecipeDetails(recipeId));
    }, [recipeId, dispatch]);

    const handleToggleWishlist = () => {
        setInWishlist(!inWishlist)

        if(inWishlist){
            currentUser.dinner_wishlist.map((item) => (
                item.recipe_id === recipeId
            ))
            handleRemoveFromWishlist(currentUser.id, item.recipe_id)
        } else {
            handleAddToWishlist(recipeDetails, recipeDetails.id)
        }
    }

    const handleRemoveFromWishlist = (currentUserId, itemId) => {
        dispatch(removeFromWishlist(currentUserId, itemId));
    }
    
    const handleAddToWishlist = (recipeDetails, recipeId) => {
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

    return (
        <div>
            <div className='recipe-data-container'>
                <h1>{recipeDetails.title}</h1>
                <img src={recipeDetails.image} alt={recipeDetails.title} />
                <br/>
                <button onClick={handleToggleWishlist}>{inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}</button>
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
