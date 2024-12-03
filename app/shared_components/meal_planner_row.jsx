import styled from "styled-components";
import MealPlannerCard from "./meal_planner_card";
import noMealSelected from "@/public/no-recipe-image.jpg";
import { getWeekday } from "@/utilities/dates";

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
	const weekday = getWeekday(props.day);

	return (
		<div className="day-row">
			<div className="day-header">
				<h2>{weekday}</h2>
			</div>
			<StyledMealsRowDiv>
				{mealTimes.map((time) => {
					const uniqueKey = `${weekday}-${time}`;

					// Check if API returns meal data for a given mealtime
					return props.mealsObject.hasOwnProperty(time) ? (
						<MealPlannerCard
							onClick={(data) => {
								props.onClick(data);
							}}
							key={uniqueKey}
							identifier={{
								day: props.day,
								meal: time,
								name: props.mealsObject[time].meal_name,
							}}
							mealTime={time}
							image={props.mealsObject[time].image_url}
							title={props.mealsObject[time].meal_name}
						></MealPlannerCard>
					) : (
						// Returns a placeholder MealPlannerCard Component
						<MealPlannerCard
							onClick={(data) => {
								props.onClick(data);
							}}
							key={uniqueKey}
							identifier={{ day: props.day, meal: time }}
							mealTime={time}
							image={noMealSelected}
						></MealPlannerCard>
					);
				})}
			</StyledMealsRowDiv>
		</div>
	);
}
