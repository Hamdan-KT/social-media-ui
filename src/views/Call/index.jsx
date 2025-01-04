import { Avatar, Box, Grid, styled, Typography, useTheme } from "@mui/material";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import CallHeader from "./Header/Index";
import CallOptions from "./CallOptions";
import Image from "src/components/common/Image";
import Video from "src/components/common/Video";
import { useEffect } from "react";
import zIndex from "@mui/material/styles/zIndex";

const CommonBox = styled("div")(({ theme }) => ({
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
}));

function Call() {
	const theme = useTheme();
	const selectedChat = useSelector((state) => state?.message?.selectedChat);
	const [stream, setStream] = useState(null);
	const [participants, setParticipants] = useState([]);
	const [fullscreenParticipant, setFullScreenParticipant] = useState(null);
	const videoRef = useRef(null);

	// useEffect(() => {
	// 	// Get user media stream
	// 	navigator.mediaDevices
	// 		.getUserMedia({ video: true, audio: true })
	// 		.then((mediaStream) => {
	// 			setStream(mediaStream);
	// 			// Assign the stream to the video element
	// 			if (videoRef.current) {
	// 				videoRef.current.srcObject = mediaStream;
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			console.error("Error accessing media devices:", err);
	// 		});

	// 	return () => {
	// 		// Stop all tracks when the component unmounts
	// 		if (stream) {
	// 			stream.getTracks().forEach((track) => track.stop());
	// 		}
	// 	};
	// }, []);

	useEffect(() => {
		const participants = Array.from({ length: 4 }).map((_, index) => ({
			id: index,
			userName: selectedChat?.receiver?.userName,
			avatar: selectedChat?.receiver?.avatar,
		}));
		setParticipants(participants);
	}, []);

	const calculateGrid = (count) => {
		const cols = Math.ceil(Math.sqrt(count));
		const rows = Math.ceil(count / cols);
		return { cols, rows };
	};
	const { cols, rows } = calculateGrid(participants.length);

	const handleFullScreenMode = (participant) => {
		setFullScreenParticipant((prev) =>
			prev?.id === participant?.id ? null : participant
		);
	};

	return (
		<CommonBox
			sx={{
				background: theme.palette.grey[900],
				justifyContent: "start",
				height: "100vh",
				maxHeight: "100vh",
				overflow: "hidden",
				flexDirection: "column",
				position: "relative",
			}}
		>
			{/* call header */}
			<CallHeader />
			{/* bottom controlls */}
			<CallOptions />

			{/* video off background */}
			<CommonBox sx={{ height: "100%", userSelect: "none", width: "100%" }}>
				<Box
					sx={{
						padding: fullscreenParticipant || participants.length < 3 ? 0 : 0.5,
						flex: 1,
						display: "grid",
						height: "100%",
						gridTemplateColumns: fullscreenParticipant
							? "1fr"
							: `repeat(${cols}, 1fr)`,
						gridTemplateRows: fullscreenParticipant
							? "1fr"
							: `repeat(${rows}, 1fr)`,
						gap: fullscreenParticipant ? 0 : 0.5,
					}}
				>
					{participants.map((participant, i) => (
						<CommonBox
							key={participant?.id}
							sx={{
								position: "relative",
								width: "100%",
								height: "100%",
								overflow: "hidden",
							}}
							onDoubleClick={() => handleFullScreenMode(participant)}
						>
							<Image
								src={participant?.avatar}
								alt={participant?.userName}
								style={{
									position: "absolute",
									top: 0,
									left: 0,
									width: "100%",
									height: "100%",
									objectFit: "cover",
									filter: "blur(50px)",
								}}
							/>
							<CommonBox
								sx={{
									width: "100%",
									height: "100%",
									flexDirection: "column",
									zIndex: 1,
								}}
							>
								<Avatar
									sx={{
										width: { xs: 80, md: 110 },
										height: { xs: 80, md: 110 },
									}}
									alt={participant?.userName}
									src={participant?.avatar}
								/>
								<Typography
									variant="userName"
									sx={{ mt: 1, color: theme.palette.common.white }}
								>
									{participant?.userName}
								</Typography>
								<Typography
									variant="greyTagsXs"
									sx={{ color: theme.palette.common.white }}
								>
									Calling...
								</Typography>
							</CommonBox>
						</CommonBox>
					))}
				</Box>

				{/* <CommonBox
					sx={{
						width: "auto",
						height: "20vh",
						borderRadius: "10px",
						zIndex: 1,
						position: "absolute",
						bottom: 30,
						right: 10,
						overflow: "hidden",
					}}
				>
					<Video
						ref={videoRef}
						style={{
							width: "auto",
							height: "100%",
							zIndex: 3,
							objectFit: "contain",
							transform: "scaleX(-1)",
						}}
						autoPlay
						muted
					/>
				</CommonBox> */}
			</CommonBox>
		</CommonBox>
	);
}

export default Call;
