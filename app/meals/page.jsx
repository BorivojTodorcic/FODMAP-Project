"use client";

import Navbar from "../shared_components/navbar";
import MealSection from "../shared_components/meal_section";
import styled from "styled-components";
import { useState, useEffect } from "react";
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

export default function Meals() {
	const [mealsData, setMealsData] = useState([]);

	useEffect(() => {
		fetch(DOMAIN_URL + "/meals")
			.then((res) => {
				return res.json();
			})
			.then((result) => {
				setMealsData(result);
			});
	}, []);

	return (
		<>
			<Navbar currentRoute="/meals" />
			<StyledWrapperDiv>
				<div className="content">
					<h1>Meals Page</h1>
					{mealsData.map((item) => {
						return (
							<MealSection
								key={item.id}
								title={item.day}
								recipes={item.recipes}
								showArrows={false}
							/>
						);
					})}
				</div>
			</StyledWrapperDiv>
		</>
	);
}
