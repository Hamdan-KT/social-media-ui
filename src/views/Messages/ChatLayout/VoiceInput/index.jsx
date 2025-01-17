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
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { uploadMessageMedias } from "src/api/messageAPI";
import { v4 as uuidv4 } from "uuid";
import {
	messageContentTypes,
	messageStatusTypes,
	messageTypes,
} from "src/utils/constants";
import {
	setChatMessages,
	updateAttachment,
} from "src/app/slices/messageSlice/messageSlice";
import { blobUrlToFile } from "src/utils/common";
import { messageEvents } from "src/services/socket/events";

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
	barMinHeight: 40,
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
	normalize: true,
});

// eslint-disable-next-line react/display-name
const VoiceInput = forwardRef(function ({ setRecording }, ref) {
	const theme = useTheme();
	const messageState = useSelector((state) => state.message);
	const user = useSelector((state) => state.user?.user);
	const socket = useSelector((state) => state.socket.socket);
	const dispatch = useDispatch();
	const { chatId } = useParams();
	const mimeType = "audio/webm";

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
						if (typeof e.data === "undefined") return;
						if (e.data.size === 0) return;
						// creates a playable URL from the blob file.
						const audioUrl = URL.createObjectURL(e.data);
						//creates a blob file from the audiochunks data
						// const audioBlob = new Blob(e.data, { type: mimeType });
						setAudioUrl(audioUrl);
						setPreview(true);
					};
					// start recording
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

	const uploadMessagMedia = useMutation({
		mutationKey: ["upload-messge-media"],
		mutationFn: (data) => uploadMessageMedias(data),
	});

	const sendMediaMessage = async (medias = []) => {
		const newMessage = {
			_id: uuidv4(),
			chatId: chatId ?? messageState?.selectedChat?._id,
			senderId: user?._id,
			receiverId: messageState?.selectedChat?.receiver?._id,
			messageType: messageState?.attachment?.message
				? messageTypes.REPLY
				: messageTypes.GENERAL,
			contentType:
				medias?.length > 0
					? messageContentTypes.MEDIA
					: messageContentTypes.TEXT,
			replyRef: messageState?.attachment?.message ?? null,
			content: "",
			media: medias,
			...(messageState?.attachment?.media && {
				details: {
					mediaId: messageState.attachment.media?._id,
				},
			}),
			sender: {
				_id: user?._id,
			},
		};
		let updatedMessages = [
			...(messageState?.chatMessages ?? []),
			{ ...newMessage, status: messageStatusTypes.SENDING },
		];
		dispatch(setChatMessages(updatedMessages));
		const formData = new FormData();
		await Promise.all(
			medias?.map(async (media) => {
				formData.append(
					[media?.name],
					await blobUrlToFile(media?.url, uuidv4(), mimeType)
				);
			})
		);
		formData.append("chatId", chatId ?? messageState?.selectedChat?._id);
		await uploadMessagMedia.mutateAsync(formData).then((data) => {
			socket.emit(
				messageEvents.SEND_MESSAGE,
				{
					...newMessage,
					replyRef: newMessage?.replyRef?._id,
					media: data?.data,
				},
				(response) => {
					console.log({ response });
					dispatch(
						setChatMessages(
							updatedMessages.map((msg) =>
								msg._id === newMessage._id
									? {
											...response.formattedMessage,
											status: messageStatusTypes.SEND,
									  }
									: msg
							)
						)
					);
				}
			);
			if (newMessage?.messageType === messageTypes.REPLY) {
				dispatch(updateAttachment({}));
			}
		});
	};

	const handleSendAudio = () => {
		stopRecording();
		setIsRecording(false);
		setRecording(false);
		setPreview(false);
		const audio = [{ url: audioUrl }];
		sendMediaMessage(audio);
	};

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
					<Lottie animationData={waveAnimation} style={{ height: "40px" }} />
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
					onClick={handleSendAudio}
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
