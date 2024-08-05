/* eslint-disable react-hooks/exhaustive-deps */
import {
	Box,
	IconButton,
	Stack,
	Typography,
	styled,
	useTheme,
} from "@mui/material";
import { useEffect, useState, useRef } from "react";
// import sampleAudio from "/audio/TujhMein.mp3";
import sampleAudio from "/audio/sample.mp3";
// import sampleAudio from "/audio/audio.mp3";
import WaveSurfer from "wavesurfer.js";
import { formatDuration } from "utils/common";
import ReactIcons from "utils/ReactIcons";

const StyledStack = styled(Box)(({ theme, chat, disabled = false }) => ({
	position: "relative",
	display: "flex",
	width: "max-content",
	maxWidth: "100%",
	padding: "0.2rem",
	alignItems: "center",
	flexDirection: "row",
	paddingRight: "0.8rem",
	justifyContent: "space-between",
	gap: "0.3rem",
	borderRadius: "20px",
	background: chat.incoming
		? disabled
			? "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(94,4,167,0.6951155462184874) 0%, rgba(241,0,203,1) 100%)"
			: theme.palette.grey[500]
		: disabled
		? theme.palette.grey[500]
			: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(94,4,167,0.6951155462184874) 0%, rgba(241,0,203,1) 100%)",
	pointerEvents: disabled && "none",
	userSelect: disabled && "none"
}));

const StyledDisableLayer = styled(Box)(({ theme, chat }) => ({
	position: "absolute",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
	height: "100%",
	left: 0,
	top: 0,
	zIndex: 7,
	borderRadius: "20px",
	backgroundColor: "rgba(0, 0, 0, 0.5)",
	userSelect: "none",
	pointerEvents: "none",
}));

const StyledProgressContainer = styled(Box)(() => ({
	position: "relative",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "calc(100% - 4rem)",
	height: "100%",
}));

// wavesurfer options
const formWaveSurferOptions = (ref) => ({
	container: ref,
	barWidth: 2,
	barRadius: 10,
	barGap: 2,
	barMinHeight: 20,
	cursorWidth: 1,
	backend: "WebAudio",
	height: 40,
	progressColor: "#ffff",
	responsive: true,
	waveColor: "#C4C4C4",
	cursorColor: "transparent",
	minPxPerSec: 10,
	hideScrollbar: true,
	dragToSeek: true,
	fillParent: false,
});

function AudioType({ chat, disabled = false }) {
	const theme = useTheme();
	const containerRef = useRef();
	const waveSurferRef = useRef();
	const [isPlaying, setIsPlaying] = useState(false);
	const [duration, setDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState(false);

	useEffect(() => {
		// creating wavesurfer instance with options
		const options = formWaveSurferOptions(containerRef.current);
		const wavesurfer = WaveSurfer.create(options);
		// loading audio
		wavesurfer.load(sampleAudio);
		// when wavesurfer is ready
		wavesurfer.on("ready", () => {
			setDuration(wavesurfer.getDuration());
		});
		// update current time while audio processing
		wavesurfer.on("audioprocess", () => {
			setCurrentTime(wavesurfer.getCurrentTime());
		});
		wavesurfer.on("seeking", () => {
			setCurrentTime(wavesurfer.getCurrentTime());
		});
		// function to update when audio playing is finished
		wavesurfer.on("finish", () => {
			setIsPlaying(false);
		});

		// assigning wavesurfer to ref
		waveSurferRef.current = wavesurfer;

		// clean up function to remove event listeners and destroy instancd
		return () => {
			wavesurfer.un("seeking");
			wavesurfer.un("audioprocess");
			wavesurfer.un("ready");
			wavesurfer.destroy();
		};
	}, [sampleAudio]);

	// handling play pause
	const handlePlayPause = () => {
		setIsPlaying(!isPlaying);
		waveSurferRef.current.playPause();
	};

	return (
		<StyledStack chat={chat} disabled={disabled}>
			<IconButton
				size="small"
				onClick={handlePlayPause}
				sx={{ color: theme.palette.background.paper }}
			>
				{isPlaying ? <ReactIcons.FaPause /> : <ReactIcons.FaPlay />}
			</IconButton>
			<StyledProgressContainer>
				<Box
					sx={{
						width: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						minHeight: "4px",
						padding: "0.4rem 0rem",
					}}
					ref={containerRef}
				/>
			</StyledProgressContainer>
			<Typography
				variant="caption"
				color={theme.palette.background.paper}
			>
				{formatDuration(duration - currentTime)}
			</Typography>
			{disabled && <StyledDisableLayer chat={chat} />}
		</StyledStack>
	);
}

export default AudioType;
