"use client";

import Navbar from "../shared_components/navbar";
import styled from "styled-components";
import MealSection from "../shared_components/meal_section";
import Pagination from "@mui/material/Pagination";
import PageSelect from "../shared_components/page_limit";
import { useEffect, useState } from "react";
import { DOMAIN_URL } from "@/config";
import { parseAsInteger, useQueryState } from "nuqs";

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

const StyledPagination = styled(Pagination)`
	justify-items: center;
	margin-bottom: 50px;
`;

const StyledFilterDiv = styled.div`
	display: flex;
	margin: 30px;
	justify-content: space-between;
	align-items: center;
`;

export default function Recipes() {
	const [recipeData, setRecipeData] = useState([]);
	const [paginationData, setPaginationData] = useState();
	const [filter, setFilter] = useState("All recipes");

	const [activePage, setActivePage] = useQueryState(
		"page",
		parseAsInteger.withDefault(1)
	);
	const [pageLimit, setPageLimit] = useQueryState(
		"limit",
		parseAsInteger.withDefault(8)
	);

	const handlePageChange = (event, value) => {
		setActivePage(value);
	};

	const handleLimitChange = (number) => {
		if (activePage !== 1) {
			setActivePage(1);
		}
		setPageLimit(number);
	};

	useEffect(() => {
		fetch(DOMAIN_URL + `/recipes?page=${activePage}&limit=${pageLimit}`)
			.then((res) => {
				return res.json();
			})
			.then((result) => {
				setRecipeData(result.data);
				setPaginationData(result.pagination);
			});
	}, [activePage, pageLimit]);

	return (
		<>
			<Navbar currentRoute="/recipes" />
			<StyledWrapperDiv>
				<div className="content">
					{/* <h1>Recipes Page</h1> */}
					<StyledFilterDiv>
						<h1>{filter}</h1>
						<PageSelect value={pageLimit} onChange={handleLimitChange} />
					</StyledFilterDiv>
					<MealSection recipes={recipeData} />
					{paginationData ? (
						<StyledPagination
							page={activePage}
							onChange={handlePageChange}
							count={paginationData.totalPages}
							shape="rounded"
						/>
					) : null}
				</div>
			</StyledWrapperDiv>
		</>
	);
}
