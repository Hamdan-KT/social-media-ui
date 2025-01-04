import ReactIcons from "utils/ReactIcons";
import { Box, Typography, styled, useTheme } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { messageEvents } from "src/services/socket/events";
import { setChatMessages } from "src/app/slices/messageSlice/messageSlice";

const StyledPopoverBox = styled(Box)(({ theme }) => ({
	width: "100%",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	flexDirection: "column",
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
	width: "100%",
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	flexDirection: "row",
	padding: "0.5rem 0.7rem",
	borderRadius: "7px",
	cursor: "pointer",
	gap: "0.5rem",
	"&:hover": {
		background: theme.palette.grey[200],
	},
}));

function ChatOptions({ chat, user }) {
	const theme = useTheme();
	const socket = useSelector((state) => state?.socket?.socket);
	const chatMessages = useSelector((state) => state.message?.chatMessages);
	const selectedChat = useSelector((state) => state.message?.selectedChat);
	const dispatch = useDispatch();

	const unsendChat = (unsend = true) => {
		socket.emit(
			messageEvents.DELETE_MESSAGE,
			{
				messageId: chat?._id,
				receiverId: selectedChat?.receiver?._id,
				unsend,
			},
			(response) => {
				console.log({ response });
				if (response?.status === true) {
					const updatedMessages = chatMessages.filter(
						(message) => message._id !== chat?._id
					);
					dispatch(setChatMessages(updatedMessages));
				}
			}
		);
	};

	return (
		<StyledPopoverBox sx={{ width: "180px" }}>
			<Typography
				variant="greyTags"
				sx={{
					width: "100%",
					padding: "0.6rem 1rem",
					borderBottom: `1px solid ${theme.palette.grey[300]}`,
				}}
			>
				1 Aug 2024, 12:06
			</Typography>
			<StyledPopoverBox sx={{ padding: "0.5rem" }}>
				<StyledTypography>
					Forward
					<ReactIcons.LuSend size={17} />
				</StyledTypography>
				<StyledTypography>
					Copy
					<ReactIcons.FaRegCopy size={17} />
				</StyledTypography>
				{/* red tags */}
				{chat?.sender?._id === user?._id && (
					<StyledTypography
						// sx={{ color: theme.palette.error.main }}
						onClick={() => unsendChat(false)}
					>
						Delete for you
						<ReactIcons.LuTrash size={17} />
					</StyledTypography>
				)}
				{chat?.sender?._id === user?._id && (
					<StyledTypography
						sx={{ color: theme.palette.error.main }}
						onClick={() => unsendChat(true)}
					>
						Unsend
						<ReactIcons.TbArrowBackUp size={17} />
					</StyledTypography>
				)}
			</StyledPopoverBox>
		</StyledPopoverBox>
	);
}

export default ChatOptions;
