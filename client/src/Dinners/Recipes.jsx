import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import RecipeCollection from './RecipeCollection'

function Recipes() {
    const [activeButton, setActiveButton] = useState(localStorage.getItem('activeButton') || 'allRecipes');

    function onButtonClick(buttonName) {
        setActiveButton(buttonName);
    }


  return (
    <div>
        <ButtonGroup>
            <Button
                variant={activeButton === 'allRecipes' ? 'primary' : 'secondary'}
                onClick={() => onButtonClick('allRecipes')}
            >
                All Recipes
            </Button>
        </ButtonGroup>
        {activeButton === 'allRecipes' && <RecipeCollection />}
    </div>
  )
}

export default Recipes