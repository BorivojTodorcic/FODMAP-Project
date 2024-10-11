"use client"

import styled from "styled-components"


const StyledRecipeContainer = styled.div`
  background-color: #FFD3B6;
  height: 250px;
  width: 250px;
  border-radius: 10px;
  margin: 20px;


  .recipe-image {
    background-color: #DCA47C;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    height: 50%;
    align-items: flex-start;
  }

  .recipe-details {
    margin: 8px 10px;
  }
`

const StyledRecipeTitleDiv = styled.div`
  font-size: 15pt;
  font-weight: 400;
`

const StyledRecipePrepTimeDiv = styled.div`
  font-size: 10pt;
  font-weight: 300;
  margin: 10px 0px;
`


export default function MealCard(props) {
    return (
        <StyledRecipeContainer>
            <div className="recipe-image" />
            <div className="recipe-details" >
                <StyledRecipeTitleDiv>{props.title}</StyledRecipeTitleDiv>
                <StyledRecipePrepTimeDiv>Prep: {props.prepTime}</StyledRecipePrepTimeDiv>
            </ div>
        </StyledRecipeContainer>
     )
}