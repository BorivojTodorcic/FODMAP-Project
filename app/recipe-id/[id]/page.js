"use client"

import styled from "styled-components";
import Navbar from "../../shared_components/navbar";
import Image from "next/image";
import { useEffect, useState } from "react";



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
        props.label.map((item, index) => {
            return (
                <StyledLabel key={index}>
                    {item}
                </StyledLabel>
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
                props.ingredients.map((ingredient, index) => 
                    <li key={index}>
                        {ingredient.ingredient_amount} {ingredient.ingredient_unit} {ingredient.ingredient_detail} {ingredient.ingredient_name} 
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

export default function RecipePage({params}) {


    const [recipe, setRecipe] = useState({});
    const [mealLabel, setMealLabel] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);
    const [url, setURL] = useState("");
    
    useEffect(() => {
        fetch(`http://localhost:3001/recipe-id/${params.id}`)
        .then(res => res.json())
        .then(data => {
            setRecipe(data);
            setMealLabel(data.diet_type);
            setIngredients(data.ingredients);
            setSteps(data.steps);
            setURL(data.image_url);
        })
    }, []);

    
    

    return (
        <>
        <Navbar currentRoute='/recipes' />
        <StyledWrapperDiv>
            <div className='content'>

                <div className="recipe-header">
                    <div className="recipe-image">
                        <Image
                            src={url}
                            height={300}
                            width={400}
                            style={{borderRadius:"10px"}}
                            alt={"Recipe Image"}
                        />
                    </div>
                    <div className="recipe-highlights">
                        <div>
                            <div className="recipe-title">
                                <h1>{recipe.meal_name}</h1>
                            </div>
                            <div className="recipe-prep">
                                Prep time: {recipe.cooking_time} minutes
                            </div>
                        </div>

                        
                        <div className="recipe-label-container">
                            <RecipeLabel label={mealLabel}/>
                        </div>
                    </div>
                </div>
                <div className="recipe-ingredients">
                    <ListRecipeIngredients ingredients={ingredients}/>
                </div>
                <div className="recipe-method">
                    <ListRecipeMethod recipeSteps={steps}/>
                </div>
            </div>
        </StyledWrapperDiv>
        </>

    )
}