"use client";

import Navbar from "../shared_components/navbar";
import styled from "styled-components";
import MealSection from "../shared_components/meal_section";
// import { recipesOne, recipesTwo } from "./constant";
import { useEffect, useState } from "react";
import { DOMAIN_URL } from "@/config";

const StyledWrapperDiv = styled.div`
    display: flex;
    width: 100%;
    background: #fcf8f3;
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
`;

export default function Recipes() {
    const [recipeData, setRecipeData] = useState([]);

    useEffect(() => {
        fetch(DOMAIN_URL + "/recipes")
            .then((res) => {
                return res.json();
            })
            .then((result) => {
                setRecipeData(result);
                console.log(result);
            });
    }, []);

    return (
        <>
            <Navbar currentRoute="/recipes" />
            <StyledWrapperDiv>
                <div className="content">
                    <h1>Recipes Page</h1>
                    {recipeData.map((section) => {
                        return (
                            <MealSection
                                title={section.header}
                                recipes={section.recipes}
                            />
                        );
                    })}
                </div>
            </StyledWrapperDiv>
        </>
    );
}
