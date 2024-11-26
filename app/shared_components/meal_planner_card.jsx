import styled from "styled-components";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Image from "next/image";
import { OLDCOLOURS } from "@/constants/colours";

const StyledMealCard = styled.div`
	width: 100%;

	.textarea {
		background-color: ${OLDCOLOURS.light_brown};
		border-radius: 8px;
		align-items: center;
		margin: 0.5rem 0rem;
		padding: 0.75rem 1rem;
	}

	.meal-header {
		display: flex;
		justify-content: space-between;
		font-weight: bold;
	}

	.image-details {
		position: relative;
		width: 100%;
		height: 200px;
		border-radius: 8px;
		overflow: hidden;
	}

	.meal-title {
		min-height: 2.75rem;
	}
`;

export default function MealPlannerCard(props) {
	return (
		<StyledMealCard>
			<div className="meal-header textarea">
				<div className="meal-time">{props.mealTime}</div>
				<IconButton aria-label="add-meal" sx={{ p: 0 }}>
					<AddCircleIcon sx={{ color: OLDCOLOURS.dark_green, fontSize: 30 }} />
				</IconButton>
			</div>
			<div className="image-details">
				<Image
					src={props.image}
					alt="recipe image"
					fill
					// sizes="33vw"
					style={{
						objectFit: "cover",
					}}
				/>
			</div>
			<div className="meal-title textarea">{props.title}</div>
		</StyledMealCard>
	);
}
