import styled from "styled-components";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MealPlannerCard from "./meal_planner_card";
import noMealSelected from "../../public/no-recipe-image.jpg";

const StyledMealsRowDiv = styled.div`
	display: grid;
	width: 100%;
	margin: auto;
	gap: 1rem 2rem;
	grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
	justify-items: center;
	margin-bottom: 5rem;
`;

export default function MealDayRow(props) {
	const mealTimes = ["Breakfast", "Lunch", "Dinner", "Snack"];

	return (
		<div className="day-row">
			<div className="day-header">
				<h2>{props.day}</h2>
			</div>
			<StyledMealsRowDiv>
				{mealTimes.map((time) => {
					// Check if API returns meal data for a given mealtime
					return props.mealsObject.hasOwnProperty(time) ? (
						<MealPlannerCard
							key={time}
							mealTime={time}
							image={props.mealsObject[time].image_url}
							title={props.mealsObject[time].meal_name}
						></MealPlannerCard>
					) : (
						// Returns a placeholder MealPlannerCard Component
						<MealPlannerCard
							key={time}
							mealTime={time}
							image={noMealSelected}
						></MealPlannerCard>
					);
				})}
			</StyledMealsRowDiv>
		</div>
	);
}
