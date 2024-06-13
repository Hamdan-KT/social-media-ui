import MuiIOSSlider from "components/common/formInputs/Slider";
import { Box, Typography, styled } from "@mui/material";
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
	padding: "1rem",
}));

function EditPanel() {
	return (
		<ContentBox>
			<SliderWrapper>
				<Typography mb={3} fontWeight={600}>
					Brightness
				</Typography>
				<MuiIOSSlider
					defaultValue={50}
					valueLabelDisplay="on"
				/>
			</SliderWrapper>
			<SliderWrapper>
				<Typography mb={3} fontWeight={600}>
					Contrast
				</Typography>
				<MuiIOSSlider
					defaultValue={50}
					valueLabelDisplay="on"
				/>
			</SliderWrapper>
			<SliderWrapper>
				<Typography mb={3} fontWeight={600}>
					Fade
				</Typography>
				<MuiIOSSlider
					defaultValue={50}
					valueLabelDisplay="on"
				/>
			</SliderWrapper>
			<SliderWrapper>
				<Typography mb={3} fontWeight={600}>
					Saturation
				</Typography>
				<MuiIOSSlider
					defaultValue={50}
					valueLabelDisplay="on"
				/>
			</SliderWrapper>
			<SliderWrapper>
				<Typography mb={3} fontWeight={600}>
					Temperature
				</Typography>
				<MuiIOSSlider
					defaultValue={50}
					valueLabelDisplay="on"
				/>
			</SliderWrapper>
			<SliderWrapper>
				<Typography mb={3} fontWeight={600}>
					Vignette
				</Typography>
				<MuiIOSSlider
					defaultValue={50}
					valueLabelDisplay="on"
				/>
			</SliderWrapper>
		</ContentBox>
	);
}

export default EditPanel;
