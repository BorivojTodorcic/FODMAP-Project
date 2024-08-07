"use client"

import Navbar from "../shared_components/navbar";
import MealSection from "../shared_components/meal_section";
import styled from "styled-components";


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


export default function Meals() {

  const data = [
    { 
      day: 'Monday',
      recipes: [
        {title: "Test Recipe 1 Monday",
          prepTime: "40 mins"
        },
        {title: "Test Recipe 2 Monday",
          prepTime: "30 mins"
        },
        {title: "Test Recipe 3 Monday",
          prepTime: "30 mins"
        }
      ]
    },
    { 
      day: 'Tuesday',
      recipes: [
        {title: "Test Recipe 1 Tuesday",
          prepTime: "30 mins"
        },
        {title: "Test Recipe 2 Tuesday",
          prepTime: "20 mins"
        },
        {title: "Test Recipe 3 Tuesday",
          prepTime: "25 mins"
        },
        {title: "Test Recipe 4 Tuesday",
          prepTime: "30 mins"
        }
      ]
    },
    { 
      day: 'Wednesday',
      recipes: [
        {title: "Test Recipe 1 Wednesday",
          prepTime: "20 mins"
        },
        {title: "Test Recipe 2 Wednesday",
          prepTime: "20 mins"
        },
        {title: "Test Recipe 3 Wednesday",
          prepTime: "35 mins"
        },
        {title: "Test Recipe 4 Wednesday",
          prepTime: "50 mins"
        },
      ]
    }
  ]
    
  return (
      <>
        <Navbar currentRoute="/meals" />
        <StyledWrapperDiv>
          <div className='content'>
            <h1>Meals Page</h1>
            {
              data.map(item => {
                return (
                  <MealSection title={item.day} recipes={item.recipes} showArrows={false}/>
                )
              })
            }
          </ div>
        </ StyledWrapperDiv>
      </>
    )
  }