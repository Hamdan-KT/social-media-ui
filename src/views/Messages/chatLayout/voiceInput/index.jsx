// lottie icons
import waveAnimation from "assets/lottie/wave.json";
// file imports
import ReactIcons from "utils/ReactIcons";
import { Box, IconButton, Typography, styled, useTheme } from "@mui/material";
import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import WaveSurfer from "wavesurfer.js";
import Lottie from "lottie-react";
import { formatDuration } from "utils/common";
import useStopwatch from "hooks/useStopWatch";

const RecordingWrapper = styled(Box)(({ theme }) => ({
	display: "flex",
	position: "relative",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "space-between",
	borderRadius: "55px",
	width: "100%",
	background: theme.palette.primary.main,
	gap: "0.5rem",
}));

const PreviewBox = styled(Box)(({ theme, preview }) => ({
	display: "flex",
	position: "relative",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
    width: preview ? "calc(100% - 12.2rem)" : "100%",
}));

const formWaveSurferOptions = (ref) => ({
	container: ref,
	barWidth: 3,
	barRadius: 50,
	barGap: 3,
	barMinHeight: 20,
	cursorWidth: 1,
	backend: "WebAudio",
	height: 30,
	progressColor: "#ffff",
	responsive: true,
	waveColor: "#C4C4C4",
	cursorColor: "transparent",
	minPxPerSec: 10,
	hideScrollbar: true,
	dragToSeek: true,
	fillParent: false,
	audioRate: 1,
});

const VoiceInput = forwardRef(function ({ setRecording }, ref) {
	const theme = useTheme();
	const [isRecording, setIsRecording] = useState(false);
	const [audioUrl, setAudioUrl] = useState("");
	const [preview, setPreview] = useState(false);

	// recording instance states
	const recorderRef = useRef(null);
	const gumStreamRef = useRef(null);
	const { elapsedTime, start, stop, reset } = useStopwatch();

	// wavesurfer states
	const containerRef = useRef();
	const waveSurferRef = useRef();
	const [isPlaying, setIsPlaying] = useState(false);
	const [duration, setDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);

	useEffect(() => {
		const options = formWaveSurferOptions(containerRef.current);
        const wavesurfer = WaveSurfer.create(options);
        if (audioUrl) {
            wavesurfer.load(audioUrl);
        }

		wavesurfer.on("ready", () => setDuration(wavesurfer.getDuration()));
		wavesurfer.on("audioprocess", () =>
			setCurrentTime(wavesurfer.getCurrentTime())
		);
		wavesurfer.on("seeking", () => setCurrentTime(wavesurfer.getCurrentTime()));
		wavesurfer.on("finish", () => setIsPlaying(false));

		waveSurferRef.current = wavesurfer;

		return () => {
			wavesurfer.destroy();
            stopRecording();
			reset();
		};
	}, [audioUrl, preview]);

	const handlePlayPause = () => {
		setIsPlaying(!isPlaying);
		waveSurferRef.current.playPause();
	};

    const stopRecording = () => {
		if (recorderRef.current && recorderRef.current.state === "recording") {
			setIsRecording(false);
			setPreview(false);
			recorderRef.current.stop();
			stop();
			gumStreamRef.current.getAudioTracks()[0].stop();
		}
	};

	const startRecording = () => {
		navigator.permissions
			.query({ name: "microphone" })
			.then(function (permissionStatus) {
				if (permissionStatus.state !== "granted") {
					alert("Microphone access is required for recording.");
					setRecording(false);
					setIsRecording(false);
					setPreview(false);
				}
			});

		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices
				.getUserMedia({ audio: true })
				.then((stream) => {
					gumStreamRef.current = stream;
					const recorder = new MediaRecorder(stream);
					recorder.ondataavailable = (e) => {
						const blobUrl = URL.createObjectURL(e.data);
						setAudioUrl(blobUrl);
						setPreview(true);
					};
					setIsRecording(true);
					recorder.start();
					reset();
                    start();
					recorderRef.current = recorder;
				})
				.catch((error) => {
					console.error("Error accessing audio stream:", error);
					reset();
					setIsRecording(false);
					setPreview(false);
				});
		} else {
			alert("navigator not found!");
			setIsRecording(false);
			setPreview(false);
		}
	};

	// recording controller function expose to parent
	useImperativeHandle(
		ref,
		() => ({
			stopRecording,
			startRecording,
		}),
		[]
	);

	return (
		<RecordingWrapper>
			<IconButton
				sx={{
					background: theme.palette.error.main,
					color: theme.palette.background.paper,
					"&:hover": { background: theme.palette.error.main },
				}}
				onClick={() => {
					stopRecording();
					setIsRecording(false);
					setRecording(false);
					setPreview(false);
				}}
			>
				<ReactIcons.IoMdTrash size={24} />
			</IconButton>
			{!isRecording && preview && (
				<IconButton
					size="small"
					onClick={handlePlayPause}
					sx={{
						background: theme.palette.background.paper,
						color: theme.palette.primary.main,
						padding: "0.7rem",
						"&:hover": { background: theme.palette.background.paper },
					}}
				>
					{isPlaying ? <ReactIcons.FaPause /> : <ReactIcons.FaPlay />}
				</IconButton>
			)}
			<PreviewBox preview={preview}>
				{isRecording && !preview ? (
					<Lottie animationData={waveAnimation} style={{ height: "40px"}} />
				) : (
					<Box
						sx={{
							width: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							minHeight: "4px",
						}}
						ref={containerRef}
					/>
				)}
				{isRecording && !preview && (
					<Typography
						variant="caption"
						sx={{
							color: theme.palette.primary.main,
							background: theme.palette.background.paper,
							padding: "0.1rem 0.3rem",
							fontWeight: "bold",
							borderRadius: 3,
						}}
					>
						{formatDuration(elapsedTime)}
					</Typography>
				)}
			</PreviewBox>
			{!isRecording && preview && (
				<Typography
					variant="caption"
					sx={{
						color: theme.palette.primary.main,
						background: theme.palette.background.paper,
						padding: "0.1rem 0.3rem",
						fontWeight: "bold",
						borderRadius: 3,
					}}
				>
					{formatDuration(duration - currentTime)}
				</Typography>
			)}
			{!isRecording ? (
				<IconButton
					sx={{
						background: theme.palette.background.paper,
						color: theme.palette.primary.main,
						"&:hover": { background: theme.palette.background.paper },
					}}
				>
					<ReactIcons.IoArrowUp size={24} />
				</IconButton>
			) : (
				<IconButton
					onClick={() => {
						stopRecording();
						setPreview(true);
					}}
					sx={{
						background: theme.palette.background.paper,
						color: theme.palette.primary.main,
						"&:hover": { background: theme.palette.background.paper },
					}}
				>
					<ReactIcons.IoIosSquare size={24} />
				</IconButton>
			)}
		</RecordingWrapper>
	);
});

export default VoiceInput;
