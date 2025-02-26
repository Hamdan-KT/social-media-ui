import Image from "src/components/common/Image";
import { Box, IconButton, styled, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { forwardRef } from "react";
import StoryBottomBar from "../../BottomBar";
import StoryHeader from "../../Header";
import ProfileAvatar from "src/components/common/ProfileAvatar";
import ReactIcons from "src/utils/ReactIcons";
import DefaultLoader from "src/components/common/DefaultLoader";
import { useNavigate, useParams } from "react-router";
import { RoutePath } from "src/utils/routes";

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
		setActiveSlide,
		activeSlide,
		sx,
		...others
	},
	ref
) {
	const DEFAULT_STORY_DURATION = 7000;
	const theme = useTheme();
	const { uId, sId } = useParams();
	const navigate = useNavigate();
	const initialMedia = useMemo(() => findInitialMedia(sId), [sId]);
	const [currentMedia, setCurrentMedia] = useState(initialMedia);
	const [duration, setDuration] = useState(DEFAULT_STORY_DURATION);
	const [isLoaded, setIsLoaded] = useState(false);
	const [progress, setProgress] = useState(0);
	const intervalRef = useRef(null);

	// console.log({ initialMedia, currentMedia });

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
		if (isActive) {
			navigate(`/${RoutePath.STORY}/${uId}/${currentMedia?.media?._id}`, {
				replace: true,
			});
			if (isLoaded) {
				startProgress(currentMedia);
			}
		}
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [currentMedia, isActive, activeSlide, isLoaded]);

	const startProgress = () => {
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
		if (currentMedia?.index < story?.medias?.length - 1) {
			setCurrentMedia({
				media: story?.medias[currentMedia.index + 1],
				index: currentMedia.index + 1,
			});
		} else {
			handleNext();
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

	const gotoIndex = () => {
		setActiveSlide();
		navigate(`/${RoutePath.STORY}/${uId}/${currentMedia?.media?._id}`, {
			replace: true,
		});
		setIsLoaded(false);
		setProgress(0);
	};

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
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					...sx,
				}}
				// onClick={() => gotoIndex(currentMedia, currentMedia.index)}
				{...others}
			>
				{/* Header */}
				{isActive && (
					<StoryHeader
						story={story}
						isActive={isActive}
						currentMedia={currentMedia}
						// progress={progress}
						// setProgress={setProgress}
						// duration={duration}
					/>
				)}
				{/* content section */}
				<Image
					src={currentMedia?.media?.fileUrl}
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
						<ProfileAvatar profile={story?.avatar} userName={story?.name} />
						<Typography
							variant="userName"
							sx={{ color: theme.palette.background.paper }}
						>
							{story?.name}
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
					{!isStart && (
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
								right: "-30px",
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
				</>
			)}
		</Box>
	);
});

export default StoryLG;
