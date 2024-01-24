import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup } from 'react-bootstrap';
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
                All Giveaways
            </Button>
        </ButtonGroup>
        {activeButton === 'allRecipes' && <RecipeCollection />}
    </div>
  )
}

export default Recipes