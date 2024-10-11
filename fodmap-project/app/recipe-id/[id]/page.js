"use client"

import styled from "styled-components";
import Navbar from "../../shared_components/navbar";
import Image from "next/image";
import bhaji from "../../../public/bhaji.jpg";
import recipe from "./constant";


const StyledWrapperDiv = styled.div`
    display: flex;
    background: #FCF8F3;
    justify-content: center;

    .content {
        display: flex;
        flex-wrap: wrap;
        width: 900px;
        margin: 30px 50px;
    }
    
    .content > * {
        padding: 30px;
    }
    
    .recipe-image {
        flex-basis: 40%;
        border-radius: 10px;
    }

    .recipe-header {
        display: flex;
        width: 100%;
        justify-content: space-between;
    }

    .recipe-highlights {
        flex-basis: 40%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .recipe-highlights > * {
        margin: 20px 0px;
    }

    h1 {
        margin: 0px;
    }
    
    h3 {
        font-weight: 500;
        margin-bottom: 0px;
        font-style: italic;
    }
    
    p {
        margin-top: 0px;
    }


    .recipe-label-container {
        display: flex;
        flex-wrap: wrap;       
    }



    .recipe-ingredients, .recipe-method {
        flex: 1 1 100%;
    }

`

const StyledLabel = styled.button`
    color: #FCF8F3;
    background-color: #698474;
    border-radius: 5px;
    border: none;
    padding: 5px 10px;
    margin: 7.5px;
`


function RecipeLabel(props) {
    return (
        props.label.map(item => {
            return (
                <StyledLabel>{item}</StyledLabel>
            )
        })
    )
}


function ListRecipeIngredients(props) {
    return (
        <>
        <h2>Ingredients</h2>
        <ul>
            {
                props.foodItems.map((ingredient, index) => 
                    <li key={index}>
                        {ingredient}
                    </li>)
            }
        </ul>
        </>
    )
}


function ListRecipeMethod(props) {
    return (
        <>
        <h2>Method</h2>
        <ol>
            {
                props.recipeSteps.map((step, index) => 
                    <li key={index}>
                        {step}
                    </li>)
            }
        </ol>
        </>
    )
}

export default function RecipePage() {

    const {ingredients, method} = recipe;

    return (
        <>
        <Navbar currentRoute='/recipes' />
        <StyledWrapperDiv>
            <div className='content'>

                <div className="recipe-header">
                    <div className="recipe-image">
                        <Image
                            src={bhaji}
                            height={300}
                            width={400}
                            style={{borderRadius:"10px"}}
                        />
                    </div>
                    <div className="recipe-highlights">
                        <div>
                            <div className="recipe-title">
                                <h1>{recipe.name}</h1>
                            </div>
                            <div className="recipe-prep">
                                Prep time: {recipe.prep} minutes
                            </div>
                        </div>

                        
                        <div className="recipe-label-container">
                            <RecipeLabel label={recipe.label}/>
                        </div>
                    </div>
                </div>
                <div className="recipe-ingredients">
                    <ListRecipeIngredients foodItems={ingredients}/>
                </div>
                <div className="recipe-method">
                    <ListRecipeMethod recipeSteps={method}/>
                </div>
            </div>
        </StyledWrapperDiv>
        </>

    )
}