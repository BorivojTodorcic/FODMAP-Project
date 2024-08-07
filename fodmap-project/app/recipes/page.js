"use client"

import Navbar from "../shared_components/navbar";
import styled from "styled-components";
import MealSection from '../shared_components/meal_section';


const StyledWrapperDiv = styled.div`
  display: flex;
  width: 100%;
  background: #FCF8F3;
  justify-content: center;


  .content {
    max-width: 1350px;
  }

  h1 {
    font-size: 30pt;
    font-optical-sizing: auto;
    font-weight: 600;
    font-style: normal;
    margin: 30px;
  }
`



export default function Recipes() {
  const recipesOne = [
    {title: "Test Recipe 1 Fav"},
    {title: "Test Recipe 2 Fav"},
    {title: "Test Recipe 3 Fav"},
    {title: "Test Recipe 4 Fav"}
  ];

  const recipesTwo = [
    {title: "Test Recipe 1 New"},
    {title: "Test Recipe 2 New"},
    {title: "Test Recipe 3 New"},
    {title: "Test Recipe 4 New"},
    {title: "Test Recipe 5 New"},
    {title: "Test Recipe 6 New"},
    {title: "Test Recipe 7 New"},
    {title: "Test Recipe 8 New"}
  ]

    return (
      <>
        <Navbar currentRoute='/recipes' />
        <StyledWrapperDiv>
          <div className='content'>
            <h1>Recipes Page</h1>
            <MealSection title='Favourites' recipes={recipesOne} showArrows={true}/>
            <MealSection title='Try something new' recipes={recipesTwo} showArrows={true} />
          </ div>
        </ StyledWrapperDiv>
      </>

    )
  }