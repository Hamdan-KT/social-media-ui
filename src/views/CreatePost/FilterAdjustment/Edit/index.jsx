import styled from "@emotion/styled";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editingSlidersConfig } from "utils/constants";
import { setCustomFilter } from "app/slices/postSlice/postSlice";
import ReactIcons from "utils/ReactIcons";
import MuiIOSSlider from "@/components/common/formInputs/Slider";

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
	minWidth: "5.5rem",
	height: "8.5rem",
	display: "flex",
	gap: "0.5rem",
	background: theme.palette.background.paper,
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	overflow: "hidden",
}));

const FilterText = styled(Typography)(({ theme }) => ({
	fontSize: "0.75rem",
	display: "flex",
	width: "100%",
	textAlign: "center",
	alignItems: "center",
	justifyContent: "center",
	userSelect: "none",
}));

const IconBox = styled(Box)(({ theme }) => ({
	width: "100%",
	height: "5.5rem",
	display: "flex",
	border: `2px solid ${theme.palette.grey[300]}`,
	background: theme.palette.background.paper,
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	overflow: "hidden",
	borderRadius: "50%",
}));

const SliderWrapper = styled(Box)(({ theme }) => ({
	width: "100%",
	height: "4rem",
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
	overflow: "hidden",
	padding: "0rem 2rem",
	gap: "1rem",
}));

function PostEditorMobile({ setHideOptions }) {
	const dispatch = useDispatch();
	const postStates = useSelector((state) => state.post);
	const [activeEditor, setActiveEditor] = useState(null);

	const handleChange = (event, value) => {
		dispatch(setCustomFilter({ filter: activeEditor, value }));
	};

	return (
		<ScrollBox className="scrollbar-hide">
			{activeEditor !== null ? (
				<Box
					sx={{
						display: "flex",
						height: "8.5rem",
						gap: "2rem",
						width: "100%",
						alignItems: "center",
						justifyContent: "center",
						flexDirection: "column",
					}}
				>
					<SliderWrapper>
						<MuiIOSSlider
							defaultValue={postStates?.activePost?.[activeEditor]}
							value={postStates?.activePost?.[activeEditor]}
							onChange={handleChange}
                            valueLabelDisplay="on"
                            min={0}
                            max={200}
						/>
						<IconButton
							onClick={() => {
								setHideOptions(false);
								setActiveEditor(null);
							}}
						>
							<ReactIcons.SiTicktick />
						</IconButton>
					</SliderWrapper>
					<Typography variant="h4">{activeEditor}</Typography>
				</Box>
			) : (
				<>
					{editingSlidersConfig.map((editSlider, index) => {
						const Icon = editSlider.Icon;
						return (
							<ContentBox
								key={index}
								sx={{ padding: 0, cursor: "pointer" }}
								onClick={() => {
									setHideOptions(true);
									setActiveEditor(editSlider?.id);
								}}
							>
								<FilterText>{editSlider?.label}</FilterText>
								<IconBox>
									<Icon size={50} />
								</IconBox>
							</ContentBox>
						);
					})}
				</>
			)}
		</ScrollBox>
	);
}

export default PostEditorMobile;
