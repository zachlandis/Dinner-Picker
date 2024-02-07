import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../Redux/Actions/fetchRecipesActions';
import { updateWishlist, removeFromWishlist } from '../Redux/Actions/wishlistActions';

function RecipeCollection() {
    const [currentPage, setCurrentPage] = useState(1);
    const [inWishlist, setInWishlist] = useState([])
    const currentUser = useSelector((state) => state.auth.currentUser);
    const recipes = useSelector((state) => state.recipes.recipes); 

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRecipes(currentUser, currentPage)); 
    }, [currentUser, currentPage, dispatch]);


    const loadMoreResults = () => {
        if (currentPage < recipes.totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleToggleWishlist = (recipeId) => {
        if (inWishlist.includes(recipeId)) {
          dispatch(removeFromWishlist(currentUser.id, recipeId));
          setInWishlist(inWishlist.filter((id) => id !== recipeId));
        } else {
          dispatch(updateWishlist(recipeDetails, recipeId, lineByLineInstructions));
          setInWishlist([...inWishlist, recipeId]);
        }
      };
      

    const handleRemoveFromWishlist = (currentUserId, itemId) => {
        dispatch(removeFromWishlist(currentUserId, itemId));
    }
    
    const handleAddToWishlist = (recipeDetails, recipeId) => {
        dispatch(updateWishlist(recipeDetails, recipeId, lineByLineInstructions));
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
            {recipes.map((recipe, index) => (
                <div key={index} className="recipe-row">
                    <tr>
                        <td className='recipe-image-cell'>
                            <img src={recipe.image} alt={recipe.title} className='recipe-image' />
                        </td>
                        <td>
                            <h3 className='recipe-header'>{recipe.title}</h3>
                            <Link to={`/recipe/${recipe.id}`}>See Recipe Info</Link>
                        </td>
                        <td>
                            <button onClick={handleToggleWishlist}>{inWishlist ? 'Add to Wishlist' : 'Remove from Wishlist' }</button>
                        </td>
                    </tr>
                </div>
            ))}
            {currentPage < recipes.totalPages && (
                <button onClick={loadMoreResults}>Load More</button>
            )}
        </div>
    );
}

export default RecipeCollection;
