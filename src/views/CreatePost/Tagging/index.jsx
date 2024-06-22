/* eslint-disable react-hooks/exhaustive-deps */
import Slider from "components/common/Carousel/Carousel";
import Slide from "components/common/Carousel/Slide";
import {
	Box,
	IconButton,
	Toolbar,
	Typography,
	styled,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactIcons from "utils/ReactIcons";
import { useDispatch, useSelector } from "react-redux";
import { setActivePost } from "app/slices/postSlice/postSlice";
import { useNavigate } from "react-router";
import { RoutePath } from "utils/routes";

const MainBox = styled(Box)(({ theme }) => ({
	width: "100%",
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	position: "relative",
	flexDirection: "column",
	background: theme.palette.background.paper,
}));

const StyledToolBar = styled(Toolbar)(({ theme }) => ({
	display: "flex",
	width: "100%",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "0.2em",
	backgroundColor: theme.palette.background.default,
	position: "fixed",
	zIndex: 7,
	top: 0,
	left: 0,
	borderBottom: `1px solid ${theme.palette.grey[400]}`,
}));

function PostTaggingMobile() {
	const theme = useTheme();
	const dispatch = useDispatch();
	const postStates = useSelector((state) => state.post);
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const navigate = useNavigate();
	// test useEffect
	useEffect(() => {
		console.log(postStates.activePost?.crop);
		console.log(postStates.activePost);
	}, [postStates.activePost?.flip, postStates.activePost]);

	// handle post slide view change to get current item to manage values for each one
	const onSlideChange = (activeIndex) =>
		dispatch(setActivePost(postStates.postMedias[activeIndex]));
	// handling crop

	return (
		<MainBox>
			{matchDownSm && (
				<StyledToolBar>
					<Typography variant="h4" ml="39%">
						Tag People
					</Typography>
					<Typography
						variant="body"
						sx={{
							cursor: "pointer",
							padding: "0 0.3rem",
							fontWeight: 600,
							"&:hover": { color: theme.palette.text.primary },
						}}
						color={theme.palette.primary.main}
						onClick={() => navigate(-1)}
					>
						Done
					</Typography>
				</StyledToolBar>
			)}
			<Slider
				sx={{
					width: "100%",
					height: "auto",
					marginTop: 6,
				}}
				onSlideChange={onSlideChange}
			>
				{Array.isArray(postStates.postMedias) &&
					postStates.postMedias?.map((media, ind) => (
						<Slide
							key={media.uID}
							sx={{
								width: "100%",
								height: "100%",
								display: "flex",
								gap: "0.5rem",
								alignItems: "center",
								justifyContent: "center",
								position: "relative",
								overflow: "hidden",
							}}
						>
							<img
								draggable={false}
								src={media?.croppedUrl}
								className={media.filterClassName}
								style={{
									display: "block",
									height: "100%",
									width: "100%",
									objectFit: "contain",
									scale: `${media.flip?.x} ${media.flip?.y}`,
									filter:
										media.filterClassName === "" &&
										`brightness(${media.customFilters?.Brightness}%) saturate(${media.customFilters?.Saturation}%)`,
								}}
							/>
						</Slide>
					))}
			</Slider>
		</MainBox>
	);
}

export default PostTaggingMobile;
