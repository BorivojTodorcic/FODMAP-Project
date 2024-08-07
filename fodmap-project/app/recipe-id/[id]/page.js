"use client"

import styled from "styled-components";
import Navbar from "../../shared_components/navbar";
import Image from "next/image";
import bhaji from "../../../public/bhaji.jpg";

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
    padding: 5px 10px;
    margin: 7.5px
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

function ListRecipeDetails(props) {
    return (
        <>
        <h2>{props.heading}</h2>
        {
            props.steps.map((step, index) => {
                if (props.numerical) {
                    return ( 
                        <>
                        <h3>Step {index+1}</h3>
                        <p>{step}</p>
                        </>
                    )
                } else {
                    return (
                        <p>- {step}</p>
                    )
                }
            })
        }
        </>
    )
}

export default function RecipePage() {

    const recipe = {
        name: "Mushroom bhaji",
        prep: 85,
        label: ["Dairy-Free", "Egg-free", "Gluten-free", "Vegan", "Vegetarian"],
        ingredients: [
            "1 large garlic bulb",
            "2 black cardamom pods",
            "5 tbsp olive oil",
            "400g exotic mushroom mix, larger mushrooms torn",
            "1 small onion, roughly chopped",
            "1 tsp cumin seeds",
            "1 tsp finely grated or chopped ginger",
            "1 green chilli, sliced (optional)",
            "2 tbsp tomato purée",
            "1 tsp turmeric",
            "1 tsp ground coriander",
            "1-2 tsp Kashmiri chilli powder",
            "½ lemon, juiced",
            "30g coriander, roughly chopped",
            "cooked rice or naan, to serve"
        ],
        method: [
            "Heat the oven to 180C/160C fan/gas 4. Slice the garlic bulb in half horizontally through its centre and put on a sheet of foil. Put 1 cardamom pod on top of each half and drizzle with 3 tbsp olive oil. Wrap in the foil and bake in the oven for 35-40 mins, or in an air-fryer for 20-25 mins, until it's soft, jammy and just starting to caramelise on top.",
            "Heat 1 tbsp oil in a large frying pan over a medium-high heat, add the mushrooms and fry until slightly browned, this will take 3-4 mins. Remove from the pan and set aside.",
            "Add the onion to the same pan with a tablespoon more oil and a pinch of salt and cook over a medium heat until soft and just starting to brown, add the cardamom pods (from the garlic) and cumin seeds, mix well and add the ginger and green chilli, if using. Stir for 30 seconds.",
            "Squeeze the garlic cloves from the bulb into the pan. Smash them slightly with the back of a spoon.",
            "Next, add the tomato purée, ground spices and salt to taste and cook for a few minutes over a medium heat. Add a splash of water if needed to stop it sticking.",
            "Finally, stir in the lemon juice, chopped coriander and cooked mushrooms. Serve straightaway with rice or naan, if you like."
        ]
    }

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
                    <ListRecipeDetails heading='Ingredients' steps={recipe.ingredients} numerical={false}/>
                </div>
                <div className="recipe-method">
                    <ListRecipeDetails heading='Method' steps={recipe.method} numerical={true} />
                </div>
            </div>
        </StyledWrapperDiv>
        </>

    )
}