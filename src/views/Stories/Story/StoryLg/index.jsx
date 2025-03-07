import Image from "src/components/common/Image";
import {
	Avatar,
	Box,
	IconButton,
	styled,
	Typography,
	useTheme,
} from "@mui/material";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { forwardRef } from "react";
import StoryBottomBar from "../../BottomBar";
import StoryHeader from "../../Header";
import ProfileAvatar from "src/components/common/ProfileAvatar";
import ReactIcons from "src/utils/ReactIcons";
import { commonMediaTypes, defaultStoryDuration } from "src/utils/constants";
import Video from "src/components/common/Video";
import { useParams } from "react-router";

const CommonBox = styled("div")(({ theme }) => ({
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "auto",
}));

const StoryLG = forwardRef(function Story(
	{
		story,
		isActive,
		handleNext,
		handlePrev,
		isStart,
		isEnd,
		containerSx,
		sx,
		activeSlide,
		...others
	},
	ref
) {
	const theme = useTheme();
	const { uId, sId } = useParams(); // userId and storyId from params
	const [activeItem, setActiveItem] = useState({ item: {}, index: 0 });
	const videoRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isMuted, setIsMuted] = useState(false);

	// handle toggle play / pause
	function togglePlayPause() {
		if (videoRef?.current) {
			if (isPlaying) {
				videoRef?.current?.pause();
			} else {
				videoRef?.current?.play();
			}
			setIsPlaying(!isPlaying);
		}
	}

	// handle restart video
	function restartVideo() {
		if (videoRef.current) {
			videoRef.current.currentTime = 0;
			videoRef?.current?.play();
			setIsPlaying(true);
		}
	}

	// handle toggle mute / unmute
	function toggleMute() {
		if (videoRef?.current) {
			videoRef.current.muted = !isMuted;
			setIsMuted(!isMuted);
		}
	}

	function findInitialItem(story) {
		if (!story?.items?.length) return;
		let itemIndex = sId
			? story.items.findIndex((item) => item?._id === sId)
			: -1;
		if (itemIndex === -1) {
			itemIndex = story.items.findIndex((item) => item?.seen === false);
		}
		itemIndex = itemIndex !== -1 ? itemIndex : 0; // updating latest itemIndex
		return { item: story.items[itemIndex], index: itemIndex };
	}

	function navigateToNext() {
		if (activeItem?.index < story?.items?.length - 1) {
			setActiveItem((prev) => ({
				index: prev?.index + 1,
				item: story?.items[prev?.index + 1],
			}));
		} else {
			handleNext();
		}
	}
	function navigateToPrev() {
		if (activeItem?.index > 0) {
			setActiveItem((prev) => ({
				index: prev?.index - 1,
				item: story?.items[prev?.index - 1],
			}));
		} else {
			handlePrev();
		}
	}

	useLayoutEffect(() => {
		const initialItem = findInitialItem(story);
		console.log({ initialItem });
		setActiveItem(initialItem);
	}, [story]);

	//handling video play pause based on active item
	useEffect(() => {
		if (!isActive && activeItem?.item?.fileType === commonMediaTypes.VIDEO) {
			videoRef.current.pause();
			videoRef.current.currentTime = 0;
			setIsPlaying(false);
		} else if (
			isActive &&
			activeItem?.item?.fileType === commonMediaTypes.VIDEO
		) {
			restartVideo();
			setIsPlaying(true);
		}
	}, [isActive, activeItem, videoRef]);

	return (
		<Box
			className="story"
			ref={ref}
			sx={{
				borderRadius: "10px",
				position: "relative",
				zIndex: 9,
				...containerSx,
			}}
		>
			<CommonBox
				sx={{
					overflow: "hidden",
					height: "100%",
					borderRadius: "10px",
					cursor: !isActive && "pointer",
					aspectRatio: "9/16",
					...sx,
				}}
				{...others}
			>
				{/* Header */}
				{isActive && (
					<StoryHeader
						story={story}
						activeItem={activeItem}
						isPlaying={isPlaying}
						isMuted={isMuted}
						isVideo={activeItem?.item?.fileType === commonMediaTypes.VIDEO}
						togglePlayPause={togglePlayPause}
						toggleMute={toggleMute}
					/>
				)}
				{/* content section */}
				{activeItem?.item?.fileType === commonMediaTypes.IMAGE && (
					<Image
						src={activeItem?.item?.fileUrl}
						draggable={false}
						style={{
							display: "block",
							width: "100%",
							objectFit: "cover",
							userSelect: "none",
						}}
					/>
				)}
				{activeItem?.item?.fileType === commonMediaTypes.VIDEO && (
					<Video
						ref={videoRef}
						src={activeItem?.item?.fileUrl}
						draggable={false}
						controls={false}
						playsInline
						// autoPlay
						style={{
							display: "block",
							width: "100%",
							objectFit: "cover",
							userSelect: "none",
						}}
					/>
				)}
				{/* profile Avatar for in active stories */}
				{!isActive && (
					<CommonBox
						sx={{
							position: "absolute",
							zIndex: 10,
							left: "50%",
							top: "50%",
							transform: "translate(-50%, -50%)",
							flexDirection: "column",
							transition: "0.3s ease-in-out",
						}}
					>
						<ProfileAvatar profile={story?.avatar} userName={story?.userName} />
						<Typography
							variant="userName"
							sx={{ color: theme.palette.background.paper }}
						>
							{story?.userName}
							<Typography
								variant="greyTags"
								sx={{
									color: theme.palette.grey[300],
									fontSize: "0.8rem",
									fontWeight: "medium",
									ml: 1,
								}}
							>
								2d
							</Typography>
						</Typography>
					</CommonBox>
				)}
				{/* bottom bar */}
				{isActive && <StoryBottomBar story={story} />}
			</CommonBox>
			{/* controle btns */}
			{isActive && (
				<>
					{((isStart && activeItem?.index > 0) || !isStart) && (
						<IconButton
							disableRipple
							size="small"
							sx={{
								position: "absolute",
								left: "-30px",
								top: "50%",
								transform: "translateY(-50%)",
								zIndex: 10,
								backgroundColor: "rgba(202, 202, 202, 0.61)",
								"&:hover": {
									backgroundColor: theme.palette.background.paper,
								},
							}}
							onClick={navigateToPrev}
							// onClick={handlePrev}
						>
							<ReactIcons.MdNavigateBefore
								style={{ color: theme.palette.common.black }}
							/>
						</IconButton>
					)}
					{((isEnd && activeItem?.index < story?.items?.length - 1) ||
						!isEnd) && (
						<IconButton
							disableRipple
							size="small"
							sx={{
								position: "absolute",
								right: "-30px",
								top: "50%",
								transform: "translateY(-50%)",
								zIndex: 10,
								backgroundColor: "rgba(202, 202, 202, 0.61)",
								"&:hover": {
									backgroundColor: theme.palette.background.paper,
								},
							}}
							onClick={navigateToNext}
							// onClick={handleNext}
						>
							<ReactIcons.MdNavigateNext
								style={{ color: theme.palette.common.black }}
							/>
						</IconButton>
					)}
				</>
			)}
		</Box>
	);
});

export default StoryLG;
