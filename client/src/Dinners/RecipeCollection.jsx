// RecipeCollection.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../Redux/Actions/fetchRecipesActions';

function RecipeCollection() {
    const recipes = useSelector((state) => state.recipes.recipes);
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 10;
    const currentUser = useSelector((state) => state.auth.currentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser) {
            dispatch(fetchRecipes(currentUser, currentPage));
        }
    }, [currentUser, currentPage, dispatch]);
    

    const loadMoreResults = () => {
        setCurrentPage(currentPage + 1);
    };

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
                    </tr>
                </div>
            ))}
            {recipes.length > 0 && (
                <button onClick={loadMoreResults}>Load More</button>
            )}
        </div>
    );
}

export default RecipeCollection;
