/* eslint-disable react-hooks/exhaustive-deps */
import Slider from "components/common/Carousel/Carousel";
import Slide from "components/common/Carousel/Slide";
import {
	Box,
	Button,
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
import PostFiltersMobile from "./Fiter";
import PostEditorMobile from "./Edit";
import { RoutePath } from "utils/routes";
import Image from "components/common/Image";
import Video from "components/common/Video";

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

function PostEditMobile() {
	const theme = useTheme();
	const dispatch = useDispatch();
	const postStates = useSelector((state) => state.post);
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const [editState, setEditState] = useState("Filter");
	const [hideOptions, setHideOptions] = useState(false);
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
					<IconButton
						size="large"
						sx={{ padding: 0 }}
						color="inherit"
						onClick={() => navigate(-1)}
					>
						<ReactIcons.IoClose
							style={{ fontSize: "2rem", cursor: "pointer" }}
						/>
					</IconButton>
					<Typography variant="h4" mr="47%">
						Edit
					</Typography>
				</StyledToolBar>
			)}
			<Slider
				sx={{
					width: "100%",
					height: "65vh",
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
								padding: "0 0.5rem",
							}}
						>
							{media?.type === "image" && (
								<Image
									loading="lazy"
									draggable={false}
									src={media?.croppedUrl}
									className={media.filterClassName}
									style={{
										borderRadius: "10px",
										overflow: "hidden",
										display: "block",
										height: "auto",
										width: "100%",
										objectFit: "contain",
										filter:
											media.filterClassName === "" &&
											`brightness(${
												media?.customFilters?.Brightness ?? 100
											}%) contrast(${
												media?.customFilters?.Contrast ?? 100
											}%) saturate(${
												media?.customFilters?.Saturation ?? 100
											}%)`,
									}}
								/>
							)}
							{media?.type === "video" && (
								<Video
									loading="lazy"
									draggable={false}
									src={media?.croppedUrl}
									className={media.filterClassName}
									style={{
										borderRadius: "10px",
										overflow: "hidden",
										display: "block",
										height: "auto",
										width: "100%",
										objectFit: "contain",
										filter:
											media.filterClassName === "" &&
											`brightness(${filter?.Brightness ?? 100}%) contrast(${
												filter?.Contrast ?? 100
											}%) saturate(${filter?.Saturation ?? 100}%)`,
									}}
								/>
							)}
						</Slide>
					))}
			</Slider>
			{/* filters and adjustments */}
			{editState === "Filter" ? (
				<PostFiltersMobile />
			) : (
				<PostEditorMobile setHideOptions={setHideOptions} />
			)}
			{/*  */}
			{!hideOptions && (
				<MainBox sx={{ justifyContent: "space-between", flexDirection: "row" }}>
					<Button
						variant="contained"
						sx={{
							m: 1,
							p: "0.7rem",
							borderRadius: "20px",
							fontSize: "0.7rem",
							fontWeight: "bold",
							background: theme.palette.grey[500],
						}}
						onClick={() =>
							setEditState((prev) => (prev === "Filter" ? "Edit" : "Filter"))
						}
					>
						{editState === "Filter" ? "Edit" : "Filter"}
					</Button>
					<Button
						variant="contained"
						sx={{
							m: 1,
							p: "0.7rem 1rem",
							borderRadius: "20px",
							fontSize: "0.7rem",
							fontWeight: "bold",
							background: theme.palette.primary.main,
						}}
						endIcon={<ReactIcons.IoArrowForward style={{ fontSize: "1rem" }} />}
						onClick={() => navigate(`/${RoutePath.CREATE}/${RoutePath.SHARE}`)}
					>
						Next
					</Button>
				</MainBox>
			)}
		</MainBox>
	);
}

export default PostEditMobile;
