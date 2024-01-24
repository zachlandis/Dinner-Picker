import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';

function RecipeCollection() {
    const { currentUser } = useContext(UserContext);
    const [recipes, setRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 10;
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?cuisine=${currentUser.preferredCuisines}&intolerances=${currentUser.intolerances}&diet=${currentUser.dietary_restrictions}&apiKey=9e18ededfa274d49bdaff560fc62a9c2&includeNutrition=true&includeIngredients&number=${resultsPerPage}&offset=${(currentPage - 1) * resultsPerPage}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data)
                setRecipes(prevRecipes => [...prevRecipes, ...data.results]);
                setTotalPages(Math.ceil(data.totalResults / resultsPerPage));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchRecipes();
    }, [currentUser, currentPage]);

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
                            {/* You can include the link if it's available in the recipe data */}
                            {/* <h5><a href={recipe.link}>Read More</a></h5> */}
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
