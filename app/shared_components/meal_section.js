"use client";

import styled from "styled-components";
import MealCard from "./meal_card";

const StyledMealsHorizontalContainer = styled.div`
    margin: 50px 30px;
    width: auto;

    .MealRowHeader {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        height: 50px;
        padding-top: 10px;
    }

    .arrow {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #698474;
        color: #fcf8f3;
        width: 45px;
        height: 40px;
        border-radius: 15px;
    }

    h2 {
        font-optical-sizing: auto;
        font-weight: 500;
        font-style: normal;
        font-size: 20pt;
    }

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

function MealHeader(props) {
    return (
        <div className="MealRowHeader">
            {props.showArrows && <div class="arrow">←</div>}
            <h2>{props.header}</h2>
            {props.showArrows && <div class="arrow">→</div>}
        </div>
    );
}

export default function MealSection(props) {
    return (
        <StyledMealsHorizontalContainer>
            <div>
                <MealHeader
                    header={props.title}
                    showArrows={props.showArrows}
                />
            </div>
            <div className="MealCardContainer">
                {props.recipes.map((item) => {
                    return (
                        <MealCard
                            key={item.test_meal_id}
                            title={item.meal_name}
                            image={item.image_url}
                            prepTime={item.cooking_time}
                        />
                    );
                })}
            </div>
        </StyledMealsHorizontalContainer>
    );
}
