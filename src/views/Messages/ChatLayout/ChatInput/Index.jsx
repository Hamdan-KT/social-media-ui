import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import {
	Box,
	IconButton,
	Menu,
	Toolbar,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import _ from "lodash";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SendIcon from "@mui/icons-material/Send";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import ReactIcons from "utils/ReactIcons";
import { updateAttachment } from "app/slices/messageSlice/messageSlice";
import PopOver from "components/common/Popover";
import VoiceInput from "../VoiceInput";
import { messageEvents } from "src/services/socket/events";
import { useParams } from "react-router";
import {
	messageContentTypes,
	messageStatusTypes,
	messageTypes,
} from "src/utils/constants";
import { v4 as uuidv4 } from "uuid";
import { setChatMessages } from "src/app/slices/messageSlice/messageSlice";
import { forwardRef } from "react";
import FileSelect from "./fileSelect";

const StyledToolBar = styled(Toolbar)(({ theme, isAttachment }) => ({
	display: "flex",
	flexDirection: "column",
	width: "100%",
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: theme.palette.background.default,
	borderTop: isAttachment ? `1px solid ${theme.palette.grey[300]}` : "",
	padding: "0.5rem 0.5rem",
	[theme.breakpoints.down("md")]: {
		position: "fixed",
		bottom: 0,
		padding: "0.5rem 0.3rem",
		width: `calc(100% - ${theme.spacing(10)})`,
		left: `calc(${theme.spacing(10)} + 1px)`,
	},
	[theme.breakpoints.down("sm")]: {
		position: "fixed",
		width: `100%`,
		bottom: 0,
		left: 0,
		padding: "0.5rem 0.3rem 0.8rem 0.3rem",
	},
	zIndex: 7,
}));

const Search = styled("div")(({ theme, recording }) => ({
	display: "flex",
	position: "relative",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "space-between",
	borderRadius: "55px",
	width: "100%",
	padding: "0.2rem 0.2rem",
	background: recording ? theme.palette.primary.main : "transparent",
	border: `1px solid ${theme.palette.grey[300]}`,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `0.5rem`,
		transition: theme.transitions.create("width"),
	},
}));

const AttachmentView = styled("div")(({ theme }) => ({
	display: "flex",
	position: "relative",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "space-between",
	width: "100%",
	padding: "0.2rem 0.5rem",
}));

// eslint-disable-next-line react/display-name
const ChatInput = forwardRef((props, ref) => {
	const [value, setValue] = useState("");
	const [recording, setRecording] = useState(false);
	const recordingRef = useRef();
	const theme = useTheme();
	const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
	const emojPopRef = useRef();
	const dispatch = useDispatch();
	const messageState = useSelector((state) => state.message);
	const user = useSelector((state) => state.user?.user);
	const socket = useSelector((state) => state.socket.socket);
	const { chatId } = useParams();

	useEffect(() => {
		if (recording && recordingRef.current)
			return recordingRef.current?.startRecording();
	}, [recording]);

	const sendMessage = () => {
		const newMessage = {
			_id: uuidv4(),
			chatId: chatId ?? messageState?.selectedChat?._id,
			senderId: user?._id,
			receiverId: messageState?.selectedChat?.receiver?._id,
			messageType: messageState?.attachment?.message
				? messageTypes.REPLY
				: messageTypes.GENERAL,
			contentType: messageContentTypes.TEXT,
			replyRef: messageState?.attachment?.message ?? null,
			content: value,
			media: [],
			...(messageState?.attachment?.media && {
				details: {
					mediaId: messageState.attachment.media?._id,
				},
			}),
			sender: {
				_id: user?._id,
			},
		};
		console.log({ newMessage });
		setValue("");
		let updatedMessages = [
			...(messageState?.chatMessages ?? []),
			{ ...newMessage, status: messageStatusTypes.SENDING },
		];
		dispatch(setChatMessages(updatedMessages));
		socket.emit(
			messageEvents.SEND_MESSAGE,
			{ ...newMessage, replyRef: newMessage?.replyRef?._id },
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
	};

	return (
		<StyledToolBar
			disableGutters
			isAttachment={Boolean(messageState?.attachment?.message?._id)}
		>
			{messageState?.attachment?.message?._id && (
				<AttachmentView>
					<Box sx={{ display: "flex", flexDirection: "column", width: "90%" }}>
						<Typography variant="subtitle1">
							Replying to {/* GrAttachment */}
							<Typography variant="userName">
								{messageState?.attachment?.message?.sender?.userName}
							</Typography>
						</Typography>
						<Typography variant="disabled" textOverflow="ellipsis" noWrap>
							{messageState?.attachment?.message?.contentType ===
							messageContentTypes.TEXT
								? messageState?.attachment?.message?.content
								: "Attachment"}
						</Typography>
					</Box>
					<Box>
						<ReactIcons.IoClose
							style={{ cursor: "pointer" }}
							size={20}
							onClick={() => dispatch(updateAttachment({}))}
						/>
					</Box>
				</AttachmentView>
			)}
			<Search recording={recording}>
				{recording ? (
					<VoiceInput setRecording={setRecording} ref={recordingRef} />
				) : (
					<>
						{matchDownMd ? (
							<IconButton
								sx={{
									background: "#673ab7",
									"&:hover": { background: "#673ab7" },
								}}
							>
								<CameraAltIcon sx={{ color: "#ffff" }} />
							</IconButton>
						) : (
							<PopOver
								ref={emojPopRef}
								Button={
									<IconButton color="inherit">
										<ReactIcons.LuSmile />
									</IconButton>
								}
							>
								<Picker
									data={data}
									theme="light"
									onEmojiSelect={(e) => setValue((prev) => prev + e.native)}
								/>
							</PopOver>
						)}
						<StyledInputBase
							ref={ref}
							fullWidth
							value={value}
							onChange={(e) => setValue(e.target.value)}
							type="text"
							placeholder="Message..."
							inputProps={{ "aria-label": "text" }}
						/>
						{value ? (
							<IconButton
								color="inherit"
								sx={{
									width: 70,
									borderRadius: 50,
									background: "#673ab7",
									"&:hover": { background: "#673ab7" },
								}}
								onClick={sendMessage}
							>
								<ReactIcons.IoMdSend style={{ color: "#ffff" }} />
							</IconButton>
						) : (
							<>
								<IconButton color="inherit">
									<ReactIcons.AiOutlineHeart />
								</IconButton>
								<IconButton
									color="inherit"
									onClick={() => {
										setRecording(true);
									}}
								>
									<ReactIcons.LuMic />
								</IconButton>
								<FileSelect />
							</>
						)}
					</>
				)}
			</Search>
		</StyledToolBar>
	);
});

export default ChatInput;
