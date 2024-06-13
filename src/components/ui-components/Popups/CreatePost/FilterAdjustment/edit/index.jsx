import { defaultSpacing } from "utils/constants";
import { Box, Grid, Typography, styled } from "@mui/material";
import React, { useState } from "react";
import filterDefaultImg from "assets/images/filtersDefault.jpeg";

const ContentBox = styled(Box)(({ theme }) => ({
	width: "100%",
	height: "100%",
	display: "flex",
	background: theme.palette.background.paper,
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	overflow: "hidden",
	padding: "1rem",
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

function EditPanel() {
	const [activeFilter, setActiveFilter] = useState(0);
	return (
		<ContentBox>
			<Grid container spacing={2.5}>
				{Array.from({ length: 12 }).map((item, index) => (
					<Grid item xs={4} key={index}>
						<ContentBox
							sx={{ padding: 0, cursor: "pointer" }}
							onClick={() => setActiveFilter(index)}
						>
							<img
								src={filterDefaultImg}
								draggable={false}
								style={{
									display: "block",
									borderRadius: "4px",
									width: "100%",
									border: index === activeFilter ? "2.4px solid black" : "",
								}}
							/>
							<FilterText
								sx={{ fontWeight: index === activeFilter ? "bold" : "" }}
							>
								Aden
							</FilterText>
						</ContentBox>
					</Grid>
				))}
			</Grid>
		</ContentBox>
	);
}

export default EditPanel;
