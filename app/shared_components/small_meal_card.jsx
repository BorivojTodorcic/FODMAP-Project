import styled from "styled-components";
import Image from "next/image";
import { OLDCOLOURS } from "@/constants/colours";
import noMealSelected from "@/public/no-recipe-image.jpg";

const StyledMealCard = styled.div`
	width: 80%;
  background-color: ${OLDCOLOURS.light_brown};
  border-radius: 8px;
  align-items: center;
  margin: 0.75rem 1.5rem;
  padding: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 5fr;
  box-shadow: ${(props) =>
		props.selected == props.meal_id ? `0px 0px 7.5px 5px ${OLDCOLOURS.dark_green}` : "null"};
	}

	.image-details {
		position: relative;
		width: 75px;
		height: 75px;
		border-radius: 8px;
		overflow: hidden;
	}

	.meal-title {
    padding: 1rem;
		font-size: 1.25rem;
	}
`;

export default function SmallMealCard(props) {
	return (
		<StyledMealCard
			onClick={props.onClick}
			selected={props.selectedMealTime}
			meal_id={props.meal_id}
		>
			<div className="image-details">
				<Image
					src={props.image || noMealSelected}
					alt="recipe image"
					fill
					style={{
						objectFit: "cover",
					}}
				/>
			</div>
			<div className="meal-title">{props.title}</div>
		</StyledMealCard>
	);
}
