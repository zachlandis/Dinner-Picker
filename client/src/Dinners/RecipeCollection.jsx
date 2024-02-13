import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../Redux/Actions/fetchRecipesActions';

function RecipeCollection() {
    const recipes = useSelector((state) => state.recipes.recipes)
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 10;
    const [totalPages, setTotalPages] = useState(0);
    const currentUser = useSelector((state) => state.auth.currentUser)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRecipes(currentUser, 1))
    }, [currentUser, dispatch])

    const loadMoreResults = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
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
            {currentPage < totalPages && (
                <button onClick={loadMoreResults}>Load More</button>
            )}
        </div>
    );
}

export default RecipeCollection;