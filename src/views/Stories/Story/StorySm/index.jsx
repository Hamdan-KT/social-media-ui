import Image from "src/components/common/Image";
import {
	Avatar,
	Box,
	IconButton,
	styled,
	Typography,
	useTheme,
} from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { forwardRef } from "react";
import ReplyInput from "src/components/common/ReplyInput";
import StoryBottomBar from "../../BottomBar";
import StoryHeader from "../../Header";
import ProfileAvatar from "src/components/common/ProfileAvatar";
import ReactIcons from "src/utils/ReactIcons";
import { useNavigate, useParams } from "react-router";
import { RoutePath } from "src/utils/routes";
import DefaultLoader from "src/components/common/DefaultLoader";

const CommonBox = styled("div")(({ theme }) => ({
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "auto",
}));

const StorySM = forwardRef(function Story(
	{
		story,
		isActive,
		handleNext,
		handlePrev,
		isStart,
		isEnd,
		containerSx,
		sx,
		...others
	},
	ref
) {
	const theme = useTheme();
	const DEFAULT_STORY_DURATION = 7000;
	const { uId, sId } = useParams();
	const navigate = useNavigate();
	const initialMedia = useMemo(() => findInitialMedia(sId), [sId]);
	const [currentMedia, setCurrentMedia] = useState(initialMedia);
	const [duration, setDuration] = useState(DEFAULT_STORY_DURATION);
	const [isLoaded, setIsLoaded] = useState(false);
	const [progress, setProgress] = useState(0);
	const intervalRef = useRef(null);

	console.log({ isActive });

	//find initial media based on storyId, if not found return first unseen media
	function findInitialMedia(sId) {
		if (!story?.medias?.length) return { media: {}, index: -1 };
		let index;
		if (sId && isActive) {
			index = story?.medias?.findIndex((media) => media?._id === sId);
		} else {
			index = story?.medias?.findIndex((media) => !media?.seen);
		}
		if (index === -1) index = 0; // If all are seen, start from the first one
		return {
			media: story?.medias[index] || {},
			index,
		};
	}

	useEffect(() => {
		if (isActive && isLoaded) {
			startProgress(currentMedia);
		}
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [currentMedia, isActive, isLoaded]);

	const startProgress = (currentMedia) => {
		// setProgress(0);
		// clearInterval(intervalRef.current);
		// const startTime = Date.now();

		// intervalRef.current = setInterval(() => {
		// 	const elapsedTime = Date.now() - startTime;
		// 	const progress = (elapsedTime / duration) * 100;
		// 	setProgress(progress);
		// 	if (progress >= 100) {
		// 		clearInterval(intervalRef.current);
		// 		gotoNext(currentMedia);
		// 	}
		// }, 50);
	};

	const gotoNext = (currentMedia) => {
		console.log({ currentMediaNext: currentMedia });
		if (currentMedia?.index < story?.medias?.length - 1) {
			setCurrentMedia({
				media: story?.medias[currentMedia.index + 1],
				index: currentMedia.index + 1,
			});
		} else {
			handleNext();
			navigate(`/${RoutePath.STORY}/${uId}/${currentMedia?.media?._id}`, {
				replace: true,
			});
		}
		setIsLoaded(false);
		setProgress(0);
	};

	const gotoPrev = (currentMedia) => {
		if (currentMedia?.index > 0) {
			setCurrentMedia({
				media: story?.medias[currentMedia.index - 1],
				index: currentMedia.index - 1,
			});
		} else {
			handlePrev();
		}
		setIsLoaded(false);
		setProgress(0);
	};

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
					currentMedia={currentMedia}
					// progress={progress}
					// duration={duration}
				/>
				{/* content section */}
				<Image
					src={story?.medias[0]?.fileUrl}
					draggable={false}
					style={{
						display: "block",
						width: "100%",
						objectFit: "cover",
						userSelect: "none",
					}}
					onLoad={() => setIsLoaded(true)}
				/>
				{/* loader */}
				{!isLoaded && isActive && (
					<CommonBox
						sx={{
							position: "absolute",
							left: 0,
							top: 0,
							width: "100%",
							height: "100%",
							background: theme.palette.common.black,
						}}
					>
						<DefaultLoader />
					</CommonBox>
				)}
			</CommonBox>
			{/* bottom bar */}
			<StoryBottomBar
				story={story}
				sx={{ position: "relative", padding: "0.5rem" }}
			/>
			<div style={{ zIndex: 100 }}>
				{!isStart && (
					<IconButton
						disableRipple
						size="small"
						sx={{
							position: "absolute",
							left: "30px",
							top: "50%",
							transform: "translateY(-50%)",
							zIndex: 10,
							backgroundColor: "rgba(202, 202, 202, 0.61)",
							"&:hover": {
								backgroundColor: theme.palette.background.paper,
							},
						}}
						onClick={() => gotoPrev(currentMedia)}
					>
						<ReactIcons.MdNavigateBefore
							style={{ color: theme.palette.common.black }}
						/>
					</IconButton>
				)}
				{!isEnd && (
					<IconButton
						disableRipple
						size="small"
						sx={{
							position: "absolute",
							right: "30px",
							top: "50%",
							transform: "translateY(-50%)",
							zIndex: 10,
							backgroundColor: "rgba(202, 202, 202, 0.61)",
							"&:hover": {
								backgroundColor: theme.palette.background.paper,
							},
						}}
						onClick={() => gotoNext(currentMedia)}
					>
						<ReactIcons.MdNavigateNext
							style={{ color: theme.palette.common.black }}
						/>
					</IconButton>
				)}
			</div>
		</Box>
	);
});

export default StorySM;
