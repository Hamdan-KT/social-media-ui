/* eslint-disable react-hooks/exhaustive-deps */
import Slider from "components/common/Carousel/Carousel";
import Slide from "components/common/Carousel/Slide";
import {
	Box,
	IconButton,
	Slider as MUISlider,
	Tooltip,
	Typography,
	styled,
	useTheme,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import PopOver from "components/common/Popover";
import ReactIcons from "src/utils/ReactIcons";
import { useDispatch, useSelector } from "react-redux";
import {
	setStoryCroppedAreaPixels,
	setStoryRotationVal,
	setActiveStory,
	setStoryCropVal,
	setStoryZoomVal,
	setStoryStages,
} from "src/app/slices/storySlice/storySlice";
import { storyStages, postRatios } from "src/utils/constants";
import Video from "src/components/common/Video";
import Image from "src/components/common/Image";

const MainBox = styled(Box)(({ theme }) => ({
	width: "100%",
	height: "100%",
	aspectRatio: 9 / 16,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	position: "relative",
	flexDirection: "column",
	overflow: "hidden",
	background: theme.palette.background.paper,
}));

const CommonBox = styled(Box)(({ theme }) => ({
	width: "100%",
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

function StoryView() {
	const theme = useTheme();
	const dispatch = useDispatch();
	const storyStates = useSelector((state) => state.story);

	// test useEffect
	useEffect(() => {
		console.log(storyStates.activeStory?.crop);
		console.log(storyStates.activeStory);
	}, [storyStates.activeStory]);

	// handle post slide view change to get current item to manage values for each one
	const onSlideChange = (activeIndex) =>
		dispatch(setActiveStory(storyStates.storyMedias[activeIndex]));
	// handling crop
	const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
		console.log(croppedArea, croppedAreaPixels);
		dispatch(
			setStoryCroppedAreaPixels({
				uID: storyStates?.activeStory?.uID,
				croppedAreaPixels,
			})
		);
	}, []);
	// handling media Rotation
	const onRotationChange = (rotation) => {
		console.log({ rotationChange: rotation });
		dispatch(
			setStoryRotationVal({
				uID: storyStates.activeStory?.uID,
				rotation: rotation == 360 ? 90 : rotation + 90,
			})
		);
	};

	return (
		<MainBox sx={{ position: "relative" }}>
			{storyStates?.storyStages[storyStages.EDIT] && (
				<CommonBox
					sx={{
						position: "absolute",
						height: "max-content",
						justifyContent: "space-between",
						zIndex: 100,
						inset: 0,
						p: 1,
					}}
				>
					<CommonBox sx={{ width: "auto" }}>
						<IconButton
							disableRipple
							sx={{ background: theme.palette.grey[800] }}
							size="medium"
							onClick={() =>
								dispatch(
									setStoryStages({ type: storyStages.CROP, value: true })
								)
							}
						>
							<ReactIcons.IoClose style={{ color: "white" }} />
						</IconButton>
					</CommonBox>
					<CommonBox sx={{ width: "auto", gap: "0.5rem" }}>
						<IconButton
							disableRipple
							sx={{ background: theme.palette.grey[800] }}
							size="medium"
						>
							<ReactIcons.IoText style={{ color: "white" }} />
						</IconButton>
						<IconButton
							disableRipple
							sx={{ background: theme.palette.grey[800] }}
							size="medium"
						>
							<ReactIcons.LuSticker style={{ color: "white" }} />
						</IconButton>
						<IconButton
							disableRipple
							sx={{ background: theme.palette.grey[800] }}
							size="medium"
						>
							<ReactIcons.IoMusicalNotesOutline style={{ color: "white" }} />
						</IconButton>
						<IconButton
							disableRipple
							sx={{ background: theme.palette.grey[800] }}
							size="medium"
						>
							<ReactIcons.MdMoreHoriz style={{ color: "white" }} />
						</IconButton>
					</CommonBox>
				</CommonBox>
			)}
			<Slider
				sx={{ width: "100%", height: "100%", zIndex: 5 }}
				onSlideChange={onSlideChange}
				disableDrag={true}
			>
				{Array.isArray(storyStates.storyMedias) &&
					storyStates.storyMedias?.map((media, ind) => (
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
								background: "black",
							}}
						>
							{storyStates.storyStages[storyStages.CROP] && (
								<Cropper
									showGrid={false}
									image={media.type === "image" ? media.url : ""}
									video={media.type === "video" ? media.url : ""}
									crop={storyStates.activeStory?.crop}
									zoom={storyStates.activeStory?.zoom}
									// rotation={storyStates.activeStory?.rotation}
									aspect={storyStates.aspectRatio}
									onCropComplete={onCropComplete}
									onCropChange={(crop) => {
										dispatch(
											setStoryCropVal({
												uID: storyStates.activeStory?.uID,
												crop,
											})
										);
									}}
									// onRotationChange={(rotation) => onRotationChange(rotation)}
									onZoomChange={(zoom) => {
										dispatch(
											setStoryZoomVal({
												uID: storyStates.activeStory?.uID,
												zoom,
											})
										);
									}}
									style={{
										containerStyle: {
											background: "black",
										},
									}}
								/>
							)}
							{storyStates.storyStages[storyStages.EDIT] && (
								<>
									{media?.type === "image" && (
										<Image
											loading="lazy"
											draggable={false}
											src={media?.croppedUrl}
											style={{
												display: "block",
												height: "100%",
												width: "100%",
												objectFit: "contain",
											}}
										/>
									)}
									{media?.type === "video" && (
										<Video
											loading="lazy"
											draggable={false}
											src={media?.croppedUrl}
											style={{
												display: "block",
												height: "100%",
												width: "100%",
												objectFit: "contain",
											}}
										/>
									)}
								</>
							)}
						</Slide>
					))}
			</Slider>
		</MainBox>
	);
}

export default StoryView;
