import styled from "styled-components";
import { OLDCOLOURS } from "@/constants/colours.js";
import SmallMealCard from "./small_meal_card";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { DOMAIN_URL } from "@/config";
import { getWeekday } from "@/utilities/dates";

const StyledSidebar = styled.div`
	background-color: ${OLDCOLOURS.dark_brown};
	width: 500px;
	height: 100%;
	position: absolute;
	right: ${(props) => (props.visible ? "0" : "-100%")};
	z-index: 1;
	transition: 850ms;
	display: flex;
	flex-direction: column;
	align-items: center;

	h3 {
		margin: 2rem 1.5rem 0.5rem 2rem;
	}

	h4 {
		margin: 0.5rem 1.5rem 1.5rem 2rem;
	}

	.meals-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	button {
		margin: 2rem 1.5rem 0.5rem 2rem;
	}
`;

export default function Sidebar(props) {
	const [recipeData, setRecipeData] = useState([]);
	const [selectedMealId, setSelectedMealId] = useState();

	const dayString = props.selectedMealTime?.day;
	const weekday = getWeekday(dayString || "");
	const mealTime = props.selectedMealTime?.meal || "";
	const mealName = props.selectedMealTime?.name;

	useEffect(() => {
		fetch(DOMAIN_URL + `/recipes?page=1&limit=5`)
			.then((res) => {
				return res.json();
			})
			.then((result) => {
				setRecipeData(result.data);
			});
	}, []);

	const sendData = () => {
		if (mealName) {
			// Meal already exists in the database
			var httpMethod = "PATCH";
		} else {
			// Meal does not exist for selected date and meal time
			var httpMethod = "POST";
		}

		fetch(DOMAIN_URL + "/api/schedule_meal", {
			method: httpMethod,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				user_id: 1,
				meal_id: selectedMealId,
				scheduled_meal_date: dayString,
				meal_time: mealTime.toLowerCase(),
			}),
		});
	};

	const handleAddButton = () => {
		sendData();
		setSelectedMealId();
		props.closeSidebar();
		props.onRefresh();
	};

	const handleCancelButton = () => {
		setSelectedMealId();
		props.closeSidebar();
	};

	return (
		<StyledSidebar visible={props.visible}>
			<h3>
				{weekday} {mealTime}
			</h3>
			<h4>{mealName}</h4>
			<div
				style={{ height: "60%", overflow: "scroll", width: "90%" }}
				className="meals-container"
			>
				{recipeData.map((meal) => {
					return (
						<SmallMealCard
							key={meal.test_meal_id}
							onClick={() => {
								setSelectedMealId(meal.test_meal_id);
							}}
							selectedMealTime={selectedMealId}
							title={meal.meal_name}
							image={meal.image_url}
							meal_id={meal.test_meal_id}
						></SmallMealCard>
					);
				})}
			</div>
			<div className="buttons">
				<Button color="success" variant="contained" onClick={handleAddButton} disabled={!selectedMealId}>
					Add Meal
				</Button>
				<Button color="error" variant="contained" onClick={handleCancelButton}>
					Cancel
				</Button>
			</div>
		</StyledSidebar>
	);
}
