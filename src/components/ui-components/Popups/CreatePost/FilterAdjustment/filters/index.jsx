import { Box, Slider, Typography, styled } from "@mui/material";
import React from "react";

const ContentBox = styled(Box)(({ theme }) => ({
	width: "100%",
	height: "100%",
	display: "flex",
	background: theme.palette.background.paper,
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	overflow: "hidden",
    padding: "0.5rem",
}));

const SliderWrapper = styled(Box)(({ theme }) => ({
	width: "100%",
	height: 80,
	display: "flex",
	flexDirection: "column",
	alignItems: "start",
	justifyContent: "start",
    overflow: "hidden",
    padding: "0.7rem"
}));

const IOSSlider = styled(Slider)(({ theme }) => ({
	color: theme.palette.mode === "dark" ? "#0a84ff" : "#007bff",
	height: 3,
	padding: "10px 0",
	"& .MuiSlider-thumb": {
		height: 20,
		width: 20,
		backgroundColor: "#fff",
		boxShadow: "0 0 2px 0px rgba(0, 0, 0, 0.1)",
		"&:focus, &:hover, &.Mui-active": {
			boxShadow: "0px 0px 3px 1px rgba(0, 0, 0, 0.1)",
			// Reset on touch devices, it doesn't add specificity
			"@media (hover: none)": {
				boxShadow:
					"0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)",
			},
		},
		"&:before": {
			boxShadow:
				"0px 0px 1px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 1px 0px rgba(0,0,0)",
		},
	},
	"& .MuiSlider-valueLabel": {
		fontSize: 12,
		fontWeight: "medium",
		top: -0,
		backgroundColor: "unset",
		color: theme.palette.text.primary,
		"&::before": {
			display: "none",
		},
		"& *": {
			background: "transparent",
			color: theme.palette.mode === "dark" ? "#fff" : "#000",
		},
	},
	"& .MuiSlider-track": {
		border: "none",
		height: 3,
	},
	"& .MuiSlider-rail": {
		opacity: 0.5,
		boxShadow: "inset 0px 0px 4px -2px #000",
		backgroundColor: "#000",
	},
}));

function MediaFilters() {
	return (
		<ContentBox>
			<SliderWrapper>
				<Typography mb={3} fontWeight={600}>
					Brightness
				</Typography>
				<IOSSlider
					aria-label="ios slider"
					defaultValue={50}
					valueLabelDisplay="on"
				/>
			</SliderWrapper>
			<SliderWrapper>
				<Typography mb={3} fontWeight={600}>
					Brightness
				</Typography>
				<IOSSlider
					aria-label="ios slider"
					defaultValue={50}
					valueLabelDisplay="on"
				/>
			</SliderWrapper>
			<SliderWrapper>
				<Typography mb={3} fontWeight={600}>
					Brightness
				</Typography>
				<IOSSlider
					aria-label="ios slider"
					defaultValue={50}
					valueLabelDisplay="on"
				/>
			</SliderWrapper>
			<SliderWrapper>
				<Typography mb={3} fontWeight={600}>
					Brightness
				</Typography>
				<IOSSlider
					aria-label="ios slider"
					defaultValue={50}
					valueLabelDisplay="on"
				/>
			</SliderWrapper>
			<SliderWrapper>
				<Typography mb={3} fontWeight={600}>
					Brightness
				</Typography>
				<IOSSlider
					aria-label="ios slider"
					defaultValue={50}
					valueLabelDisplay="on"
				/>
			</SliderWrapper>
			<SliderWrapper>
				<Typography mb={3} fontWeight={600}>
					Brightness
				</Typography>
				<IOSSlider
					aria-label="ios slider"
					defaultValue={50}
					valueLabelDisplay="on"
				/>
			</SliderWrapper>
		</ContentBox>
	);
}

export default MediaFilters;
