import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import React from "react";
import { InstagramFilters } from "utils/filters";
import { setFilterClassName } from "app/slices/postSlice/postSlice";
import filterDefaultImg from "assets/images/filtersDefault.jpeg";
import { useDispatch, useSelector } from "react-redux";
import Image from "components/common/Image";

const ScrollBox = styled(Box)(({ theme }) => ({
	width: "100%",
	height: "auto",
	maxWidth: "100%",
	display: "flex",
	gap: "0.5rem",
	alignItems: "center",
	justifyContent: "flex-start",
	position: "relative",
	padding: "0.5rem",
	flexDirection: "row",
	background: theme.palette.background.paper,
    overflowX: "scroll",
}));

const ContentBox = styled(Box)(({ theme }) => ({
	minWidth: "6.5rem",
	height: "8.5rem",
	display: "flex",
	background: theme.palette.background.paper,
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
    overflow: "hidden",
    gap: "0.2rem"
}));

const FilterText = styled(Typography)(({ theme }) => ({
	fontSize: "0.75rem",
	display: "flex",
	width: "100%",
	textAlign: "center",
	alignItems: "center",
	justifyContent: "center",
	userSelect: "none",
	marginTop: "4px",
}));

function PostFiltersMobile() {
	const dispatch = useDispatch();
    const postStates = useSelector((state) => state.post);
    
	return (
		<ScrollBox className="scrollbar-hide">
			{InstagramFilters.map((filter, index) => (
				<ContentBox
					key={index}
					sx={{ padding: 0, cursor: "pointer" }}
					onClick={() => {
						dispatch(setFilterClassName({ className: filter.class }));
					}}
				>
					<FilterText
						sx={{
							fontWeight:
								filter.class === postStates?.activePost?.filterClassName
									? "bold"
									: "",
						}}
					>
						{filter?.name}
					</FilterText>
					<Image
						src={filterDefaultImg}
						draggable={false}
						style={{
							display: "block",
							borderRadius: "10px",
							width: "100%",
							border:
								filter.class === postStates?.activePost?.filterClassName
									? "2.4px solid black"
									: "",
						}}
						className={`${filter.class}`}
					/>
				</ContentBox>
			))}
		</ScrollBox>
	);
}

export default PostFiltersMobile;
