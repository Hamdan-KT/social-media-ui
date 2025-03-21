import Image from "src/components/common/Image";
import {
	Avatar,
	Box,
	IconButton,
	styled,
	Typography,
	useTheme,
} from "@mui/material";
import React, {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { forwardRef } from "react";
import ReplyInput from "src/components/common/ReplyInput";
import StoryBottomBar from "../../BottomBar";
import StoryHeader from "../../Header";
import ProfileAvatar from "src/components/common/ProfileAvatar";
import ReactIcons from "src/utils/ReactIcons";
import Video from "src/components/common/Video";
import {
	commonMediaTypes,
	defaultStoryDuration,
	defaultStoryVideoDuration,
	storyTouchHoldDurationInframe,
} from "src/utils/constants";
import { useParams } from "react-router";

const CommonBox = styled("div")(({ theme }) => ({
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "auto",
}));

const StorySM = forwardRef(function Story(
	{ story, isActive, handleNext, handlePrev, containerSx, sx, ...others },
	ref
) {
	const theme = useTheme();
	const { uId, sId } = useParams(); // userId and storyId from params
	const [activeItem, setActiveItem] = useState({ item: {}, index: 0 });
	const videoRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const animationRef = useRef(null);
	const touchHoldAnimationRef = useRef(null);
	const touchHoldDurationRef = useRef(0);
	const imageDurationStartRef = useRef(0);
	const [progress, setProgress] = useState(0);
	const [vidDuration, setVidDuration] = useState(null);
	const [isPressed, setIsPressed] = useState(false);

	// play video
	const handlePlay = () => {
		if (videoRef?.current) {
			videoRef?.current?.play();
		} else {
			imageDurationStartRef.current =
				Date.now() - (progress / 100) * (defaultStoryDuration * 1000);
		}
		setIsPlaying(true);
		animationRef.current = requestAnimationFrame(updateProgress);
	};

	// pause video
	function handlePause() {
		if (videoRef?.current) {
			videoRef?.current?.pause();
		} else {
			imageDurationStartRef.current =
				Date.now() - (progress / 100) * (defaultStoryDuration * 1000);
		}
		if (animationRef?.current) {
			cancelAnimationFrame(animationRef.current);
		}
		setIsPlaying(false);
	}

	// handle restart video
	function restartVideo() {
		if (videoRef.current) {
			videoRef.current.currentTime = 0;
			setProgress(0);
			videoRef?.current?.play();
			setIsPlaying(true);
		}
	}

	function handleMetadataLoad() {
		if (videoRef.current) {
			setVidDuration(videoRef.current.duration || defaultStoryVideoDuration);
		}
	}

	const findInitialItem = useCallback(
		(story) => {
			if (!story?.items?.length) return;
			let itemIndex = sId
				? story.items.findIndex((item) => item?._id === sId)
				: -1;
			if (itemIndex === -1) {
				itemIndex = story.items.findIndex((item) => item?.seen === false);
			}
			itemIndex = itemIndex !== -1 ? itemIndex : 0; // updating latest itemIndex
			return { item: story.items[itemIndex], index: itemIndex };
		},
		[sId]
	);

	// Navigate to next story
	const navigateToNext = useCallback(() => {
		if (activeItem?.index < story?.items?.length - 1) {
			setActiveItem((prev) => ({
				index: prev.index + 1,
				item: story?.items[prev.index + 1],
			}));
		} else {
			handleNext();
		}
		setProgress(0); // Reset progress immediately
		cancelAnimationFrame(animationRef.current);
	}, [story, activeItem, handleNext]);

	// Navigate to previous story
	const navigateToPrev = useCallback(() => {
		if (activeItem?.index > 0) {
			setActiveItem((prev) => ({
				index: prev.index - 1,
				item: story?.items[prev.index - 1],
			}));
		} else {
			handlePrev();
		}
		setProgress(0); // Reset progress immediately
		cancelAnimationFrame(animationRef.current);
	}, [story, activeItem, handlePrev]);

	useLayoutEffect(() => {
		const initialItem = findInitialItem(story);
		setActiveItem(initialItem);
		setProgress(0);
	}, [story, findInitialItem]);

	// progress update for animationFrame
	const updateProgress = useCallback(() => {
		if (videoRef.current) {
			const duration = Math.min(vidDuration, defaultStoryVideoDuration);
			const percentage = (videoRef?.current?.currentTime / duration) * 100;
			setProgress(percentage);
			if (percentage >= 100) {
				navigateToNext();
			} else {
				animationRef.current = requestAnimationFrame(updateProgress);
			}
		} else {
			const elapsed = Date?.now() - imageDurationStartRef?.current;
			const percentage = (elapsed / (defaultStoryDuration * 1000)) * 100;
			setProgress(percentage);
			if (percentage >= 100) {
				navigateToNext();
			} else {
				animationRef.current = requestAnimationFrame(updateProgress);
			}
		}
	}, [vidDuration, navigateToNext]);

	//handling video play pause based on active item
	useEffect(() => {
		if (!isActive) {
			// Pause video and reset progress when inactive
			if (activeItem?.item?.fileType === commonMediaTypes.VIDEO) {
				videoRef.current.pause();
				videoRef.current.currentTime = 0;
			}
			setIsPlaying(false);
			setProgress(0);
			cancelAnimationFrame(animationRef?.current);
		} else {
			if (activeItem?.item?.fileType === commonMediaTypes.VIDEO) {
				// Restart video and start progress update
				restartVideo();
				animationRef.current = requestAnimationFrame(updateProgress);
			} else if (activeItem?.item?.fileType === commonMediaTypes.IMAGE) {
				// Update image duration ref while changing
				imageDurationStartRef.current = Date.now();
				setProgress(0);
				setIsPlaying(true);
				animationRef.current = requestAnimationFrame(updateProgress);
			}
		}
		// useEffect clean up
		return () => {
			setProgress(0);
			setIsPlaying(false);
			if (videoRef.current) {
				videoRef.current.pause();
			}
			if (animationRef.current) cancelAnimationFrame(animationRef.current);
		};
	}, [isActive, activeItem, videoRef, updateProgress]);

	// Function to update hold duration counter
	const updateTouchDownDurationCounter = () => {
		if (touchHoldDurationRef.current >= storyTouchHoldDurationInframe) {
			console.log("Hold duration reached!");
			handlePause();
			cancelAnimationFrame(touchHoldAnimationRef.current);
			touchHoldAnimationRef.current = null; // Clear reference
		} else {
			touchHoldDurationRef.current++;
			touchHoldAnimationRef.current = requestAnimationFrame(
				updateTouchDownDurationCounter
			);
		}
	};

	// Handle touch start
	const handleTouchStart = (e) => {
		e.preventDefault();
		setIsPressed(true);
		if (!touchHoldAnimationRef.current) {
			touchHoldAnimationRef.current = requestAnimationFrame(
				updateTouchDownDurationCounter
			);
		}
	};

	// Handle touch end
	const handleTouchEnd = useCallback(
		(dir = "right") => {
			if (isPressed) {
				console.log({ durationCount: touchHoldDurationRef.current });
				console.log({ storyTouchHoldDurationInframe });
				if (touchHoldDurationRef.current < storyTouchHoldDurationInframe) {
					console.log("Short hold detected! Navigating to next.");
					if (dir === "right") {
						navigateToNext();
					} else {
						navigateToPrev();
					}
				} else {
					console.log("Long hold detected!");
					handlePlay();
				}
			}

			// Cancel animation and reset state
			if (touchHoldAnimationRef.current) {
				cancelAnimationFrame(touchHoldAnimationRef.current);
				touchHoldAnimationRef.current = null;
			}
			touchHoldDurationRef.current = 0;
			setIsPressed(false);
		},
		[isPressed, navigateToNext, navigateToPrev]
	);

	return (
		<Box
			ref={ref}
			sx={{
				borderRadius: "10px",
				position: "relative",
				zIndex: 9,
				maxWidth: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "start",
				background: theme.palette.common.black,
				...containerSx,
			}}
		>
			<CommonBox
				sx={{
					overflow: "hidden",
					width: "100%",
					height: "auto",
					borderRadius: "10px",
					cursor: "pointer",
					aspectRatio: "9/16",
					justifyContent: "start",
					alignItems: "start",
					flexDirection: "column",
					position: "relative",
					mt: 2,
					...sx,
				}}
				{...others}
			>
				{/* Header */}
				<StoryHeader
					story={story}
					activeItem={activeItem}
					isPlaying={isPlaying}
					isVideo={activeItem?.item?.fileType === commonMediaTypes.VIDEO}
					progress={progress}
				/>
				{/* content section */}
				{activeItem?.item?.fileType === commonMediaTypes.IMAGE && (
					<Image
						id={activeItem?.index}
						key={activeItem?.index}
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
						id={activeItem?.index}
						key={activeItem?.index}
						ref={videoRef}
						src={activeItem?.item?.fileUrl}
						draggable={false}
						controls={false}
						playsInline
						onLoadedMetadata={handleMetadataLoad}
						style={{
							display: "block",
							width: "100%",
							objectFit: "cover",
							userSelect: "none",
						}}
					/>
				)}
				{/* Left & Right Click Navigation */}
				<div
					style={{
						position: "absolute",
						inset: 0,
						display: "flex",
					}}
				>
					<div
						style={{ width: "50%", height: "100%" }}
						onPointerDown={handleTouchStart}
						onPointerUp={() => handleTouchEnd("left")}
						onPointerLeave={() => handleTouchEnd("left")}
					/>
					<div
						style={{ width: "50%", height: "100%" }}
						onPointerDown={handleTouchStart}
						onPointerUp={() => handleTouchEnd("right")}
						onPointerLeave={() => handleTouchEnd("right")}
					/>
				</div>
			</CommonBox>
			{/* bottom bar */}
			<StoryBottomBar
				story={story}
				sx={{ position: "relative", padding: "0.5rem" }}
			/>
		</Box>
	);
});

export default StorySM;
