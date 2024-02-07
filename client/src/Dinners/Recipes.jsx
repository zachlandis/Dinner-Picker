import React, { useState } from 'react'
// import 'bootstrap/dist/css/bootstrap.css';
// import Button from 'react-bootstrap/Button';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
import RecipeCollection from './RecipeCollection'

function Recipes() {
    // const [activeButton, setActiveButton] = useState(localStorage.getItem('activeButton') || 'For You');

    // function onButtonClick(buttonName) {
    //     setActiveButton(buttonName);
    // }


  return (
    <div>
        {/* <ButtonGroup>
            <Button
                variant={activeButton === 'For You' ? 'primary' : 'secondary'}
                onClick={() => onButtonClick('allRecipes')}
            >
                For You
            </Button>
        </ButtonGroup>
        {activeButton === 'For You' && */}
         <RecipeCollection />
        {/* } */}
    </div>
  )
}

export default Recipes