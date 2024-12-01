"use client";

import Navbar from "../shared_components/navbar";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { DOMAIN_URL } from "@/config";
import MealDayRow from "../shared_components/meal_planner_row";
import { addWeeks, formatISO, isMonday, previousMonday, subWeeks } from "date-fns";

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
	
	.date-div {
	display: flex;
	justify-content: space-between
	}
`;

export default function Meals() {
	function formatDate(date) {
		return formatISO(new Date(date), { representation: "date" });
	}

	function getPreviousMondayString(date) {
		const dateObject = new Date(date || Date.now());
		if (!isMonday(dateObject)) {
			return formatDate(previousMonday(dateObject));
		}
		return formatDate(dateObject);
	}

	const [mealsData, setMealsData] = useState({});
	const [date, setDate] = useState(getPreviousMondayString());

	useEffect(() => {
		fetch(DOMAIN_URL + `/api/meal_planners?week=${date}`)
			.then((res) => {
				return res.json();
			})
			.then((result) => {
				setMealsData(result.meals);
				setDate(result.weekCommencing);
			});
	}, [date]);

	const mealsArray = Object.entries(mealsData);

	function backOneWeek() {
		 setDate((prevDate) => formatDate(subWeeks(prevDate, 1)));
	}
	function forwardOneWeek() {
		return setDate((prevDate) => formatDate(addWeeks(prevDate, 1)));
	}

	return (
		<>
			<Navbar currentRoute="/meals" />
			<StyledWrapperDiv>
				<div className="content container-wrapper">
					<h1>Meal Planner</h1>
					<div className="date-div">
						<button onClick={backOneWeek}>Prev</button>
						<h2>{date}</h2>
						<button onClick={forwardOneWeek}>Next</button>
						{/* <button onClick={nextMonday}>Next</button> */}
					</div>
					{mealsArray.map((day) => {
						return (
							<MealDayRow
								key={day[0]}
								day={day[0]}
								mealsObject={day[1]}
							></MealDayRow>
						);
					})}
				</div>
			</StyledWrapperDiv>
		</>
	);
}
