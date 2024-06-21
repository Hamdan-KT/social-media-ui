import MuiIOSSlider from "components/common/FormInputs/Slider";
import { Box, Typography, styled } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { editingSlidersConfig } from "utils/constants";

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
	const postStates = useSelector((state) => state.post);

	return (
		<ContentBox>
			{editingSlidersConfig.map((slider, index) => (
				<SliderWrapper key={slider.id}>
					<Typography mb={3} fontWeight={600}>
						{slider.label}
					</Typography>
					<MuiIOSSlider
						defaultValue={slider.defaultValue}
						valueLabelDisplay="on"
					/>
				</SliderWrapper>
			))}
		</ContentBox>
	);
}

export default EditPanel;
