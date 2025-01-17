import { defaultSpacing } from "utils/constants";
import {
	Box,
	Divider,
	Grid,
	Typography,
	styled,
	useTheme,
} from "@mui/material";
import React, { useState } from "react";
import filterDefaultImg from "assets/images/filtersDefault.jpeg";
import MuiIOSSlider from "components/common/FormInputs/Slider";
import { useDispatch, useSelector } from "react-redux";
import { InstagramFilters } from "src/utils/filters";
import { setFilterClassName } from "app/slices/postSlice/postSlice";
import Image from "components/common/Image";

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

const SliderWrapper = styled(Box)(({ theme }) => ({
	width: "100%",
	height: 60,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	overflow: "hidden",
	padding: "0rem 0.7rem",
}));

function MediaFilters() {
	const theme = useTheme();
	const dispatch = useDispatch();
	const postStates = useSelector((state) => state.post);

	return (
		<ContentBox>
			<Grid container spacing={2.5}>
				{InstagramFilters.map((filter, index) => (
					<Grid item xs={4} key={index}>
						<ContentBox
							sx={{ padding: 0, cursor: "pointer" }}
							onClick={() => {
								dispatch(setFilterClassName({ className: filter.class }));
							}}
						>
							<Image
								src={filterDefaultImg}
								draggable={false}
								style={{
									aspectRatio: 1/1,
									display: "block",
									borderRadius: "4px",
									width: "100%",
									border:
										filter.class === postStates?.activePost?.filterClassName
											? "2.4px solid black"
											: "",
								}}
								className={`${filter.class}`}
							/>
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
						</ContentBox>
					</Grid>
				))}
				<Grid item xs={12}>
					<SliderWrapper>
						<MuiIOSSlider defaultValue={100} valueLabelDisplay="on" />
					</SliderWrapper>
				</Grid>
			</Grid>
		</ContentBox>
	);
}

export default MediaFilters;
