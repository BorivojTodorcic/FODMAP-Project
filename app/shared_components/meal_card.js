"use client";

import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const StyledRecipeContainer = styled.div`
    background-color: #ffd3b6;
    height: 250px;
    width: 250px;
    border-radius: 10px;
    margin: 20px;

    .recipe-details {
        margin: 8px 10px;
    }
`;

const StyledRecipeTitleDiv = styled.div`
    font-size: 15pt;
    font-weight: 400;
`;

const StyledRecipePrepTimeDiv = styled.div`
    font-size: 10pt;
    font-weight: 300;
    margin: 10px 0px;
`;

export default function MealCard(props) {

    return (
        <StyledRecipeContainer>
            <Link href={`/recipe-id/${props.id}`}>
                <Image
                    src={props.image}
                    alt="recipe image"
                    width={250}
                    height={150}
                />
            </Link>

                <div className="recipe-details">
                    <StyledRecipeTitleDiv>{props.title}</StyledRecipeTitleDiv>
                    <StyledRecipePrepTimeDiv>
                        Prep: {props.prepTime} mins
                    </StyledRecipePrepTimeDiv>
                </div>
        </StyledRecipeContainer>
    );
}
