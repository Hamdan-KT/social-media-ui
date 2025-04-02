import Video from "src/components/common/Video";
import React, { forwardRef, useEffect, useState } from "react";
import { IconButton, styled, useTheme } from "@mui/material";
import { useRef } from "react";
import ReactIcons from "src/utils/ReactIcons";

const CommonBox = styled("div")(({ theme }) => ({
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "auto",
}));

const ReelVideo = ({
	src = "",
	isActive = false,
	wrapperSx = {},
	style = {},
	...others
}) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isMuted, setIsMuted] = useState(false);
	const [showContols, setShowControls] = useState(false);
	const [duration, setDuration] = useState(null);
	const videoRef = useRef();
	const theme = useTheme();

	// handle video play
	const handlePlay = () => {
		if (videoRef?.current) {
			videoRef?.current?.play();
			setIsPlaying(true);
			setShowControls(false);
		}
	};

	//handle video pause
	const handlePause = () => {
		if (videoRef?.current) {
			videoRef?.current?.pause();
			setIsPlaying(false);
			setShowControls(true);
		}
	};

	// handle toggle mute / unmute
	function toggleMute() {
		if (videoRef?.current) {
			videoRef.current.muted = !isMuted;
			setIsMuted(!isMuted);
			handlePlay();
		}
	}

	function handleMetadataLoad() {
		if (videoRef.current) {
			setDuration(videoRef.current.duration);
		}
	}

	// handling auto play
	useEffect(() => {
		if (isActive) {
			handlePlay();
		} else {
			handlePause();
		}
	}, [isActive]);

	return (
		<CommonBox
			sx={{
				height: "100%",
				position: "relative",
				...wrapperSx,
			}}
		>
			{showContols && (
				<IconButton
					size="large"
					onClick={toggleMute}
					sx={{
						position: "absolute",
						left: "50%",
						top: "40%",
						transform: "translate(-50%)",
						padding: "0.5rem",
						background: "rgba(0, 0, 0, 0.5)",
						zIndex: 5,
					}}
				>
					<>
						{isMuted ? (
							<ReactIcons.ImVolumeMute
								size={15}
								style={{ color: theme.palette.background.paper }}
							/>
						) : (
							<ReactIcons.ImVolumeMute2
								size={15}
								style={{ color: theme.palette.background.paper }}
							/>
						)}
					</>
				</IconButton>
			)}
			{showContols && (
				<IconButton
					size="large"
					sx={{
						position: "absolute",
						left: "50%",
						top: "50%",
						transform: "translate(-50%, -50%)",
						padding: "1rem",
						background: "rgba(0, 0, 0, 0.5)",
						zIndex: 5,
					}}
					onClick={handlePlay}
				>
					<ReactIcons.FaPlay
						style={{ color: theme.palette.background.paper }}
					/>
				</IconButton>
			)}
			<Video
				ref={videoRef}
				src={src}
				onClick={() => {
					isPlaying ? handlePause() : handlePlay();
				}}
				controls={false}
				playsInline
				draggable={false}
				onLoadedMetadata={handleMetadataLoad}
				style={{
					width: "auto",
					height: "100%",
					objectFit: "cover",
					display: "flex",
					boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
					borderRadius: "8px",
					userSelect: "none",
					...style,
				}}
				{...others}
			/>
		</CommonBox>
	);
};

export default ReelVideo;
