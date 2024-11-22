"use client";

import styled from "styled-components";
import MealCard from "./meal_card";

const StyledMealsHorizontalContainer = styled.div`
    margin: 50px 30px;
    width: auto;

    .MealCardContainer {
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
        align-items: center;
        width: 100%;
        margin-top: 20px;
        margin-bottom: 40px;
    }
`;

export default function MealSection(props) {
    return (
        <StyledMealsHorizontalContainer>
            <div className="MealCardContainer">
                {props.recipes.map((item) => {
                    return (
                        <MealCard
                            key={item.test_meal_id}
                            title={item.meal_name}
                            image={item.image_url}
                            prepTime={item.cooking_time}
                            id={item.test_meal_id}
                        />
                    );
                })}
            </div>
        </StyledMealsHorizontalContainer>
    );
}
