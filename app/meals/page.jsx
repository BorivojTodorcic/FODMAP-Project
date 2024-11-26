"use client";

import Navbar from "../shared_components/navbar";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { DOMAIN_URL } from "@/config";
import MealTest from "../shared_components/meal_planner_row";

const StyledWrapperDiv = styled.div`
	display: flex;
	width: 100%;
	background: ;
	justify-content: center;

	.content {
		width: 100%;
	}

	h1 {
		font-size: 30pt;
		font-optical-sizing: auto;
		font-weight: 600;
		font-style: normal;
		margin: 5% 0%;
	}
`;

export default function Meals() {
	const [mealsData, setMealsData] = useState({});
	const [date, setDate] = useState("");

	useEffect(() => {
		fetch(DOMAIN_URL + "/api/meal_planner")
			.then((res) => {
				return res.json();
			})
			.then((result) => {
				setMealsData(result.meals);
				setDate(result.weekCommencing)
			});
	}, []);

	const mealsArray = Object.entries(mealsData);

	return (
		<>
			<Navbar currentRoute="/meals" />
			<StyledWrapperDiv>
				<div className="content container-wrapper">
					<h1>Meal Planner</h1>
					{mealsArray.map((day) => {
						console.log(day);
						return (
							<MealTest
								day={day[0]}
								mealsObject={day[1]}
							></MealTest>
						);
					})}
				</div>
			</StyledWrapperDiv>
		</>
	);
}
