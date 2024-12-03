"use client";

import Navbar from "../shared_components/navbar";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { DOMAIN_URL } from "@/config";
import MealDayRow from "../shared_components/meal_planner_row";
import { addWeeks, subWeeks } from "date-fns";
import { Button } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Sidebar from "../shared_components/sidebar";
import { formatDate, getPreviousMondayString } from "@/utilities/dates";

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
		justify-content: space-between;
		align-items: center;
	}
`;

export default function Meals() {
	const [mealsData, setMealsData] = useState({});
	const [date, setDate] = useState(getPreviousMondayString());
	const [sidebar, setSidebar] = useState(false);
	const [selectedMealTime, setSelectedMealTime] = useState();
	const [refresh, setRefresh] = useState(false);

	const mealsArray = Object.entries(mealsData);

	useEffect(() => {
		fetch(DOMAIN_URL + `/api/meal_planners?week=${date}`)
			.then((res) => {
				return res.json();
			})
			.then((result) => {
				setMealsData(result.meals);
				setDate(result.weekCommencing);
			});
	}, [date, refresh]);

	function backOneWeek() {
		setDate((prevDate) => formatDate(subWeeks(prevDate, 1)));
	}
	function forwardOneWeek() {
		return setDate((prevDate) => formatDate(addWeeks(prevDate, 1)));
	}

	function handleClick(data) {
		!sidebar && setSelectedMealTime(data);
		setSidebar(!sidebar);
	}

	return (
		<>
			<Navbar currentRoute="/meals" />
			<Sidebar
				visible={sidebar}
				closeSidebar={() => setSidebar( )}
				onRefresh={() => setRefresh(!refresh)}
				selectedMealTime={selectedMealTime}
			></Sidebar>
			<StyledWrapperDiv>
				<div className="content container-wrapper">
					<h1>Meal Planner</h1>
					<div className="date-div">
						<Button
							color="success"
							variant="outlined"
							sx={{ height: "75%" }}
							onClick={backOneWeek}
							startIcon={<ChevronLeftIcon />}
						>
							Prev
						</Button>
						<h2>{date}</h2>
						<Button
							color="success"
							variant="outlined"
							sx={{ height: "75%" }}
							onClick={forwardOneWeek}
							endIcon={<ChevronRightIcon />}
						>
							Next
						</Button>
					</div>
					{mealsArray.map((day) => {
						return (
							<MealDayRow
								onClick={handleClick}
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
