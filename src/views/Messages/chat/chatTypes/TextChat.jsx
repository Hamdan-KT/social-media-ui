import DragBox from "components/common/DragBox";
import { Box, Stack, Typography, styled, useTheme } from "@mui/material";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAttachment } from "app/slices/messageSlice/messageSlice";
import ReactIcons from "utils/ReactIcons";
import ChatOptions from "../ChatOptions";
import PopOver from "components/common/Popover";

const ChatText = styled(Box)(({ theme, chat, user }) => ({
	display: "flex",
	maxWidth: "100%",
	alignItems: "center",
	justifyContent: "center",
	background:
		chat.sender?._id === user?._id
			? "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(94,4,167,0.6951155462184874) 0%, rgba(241,0,203,1) 100%)"
			: theme.palette.grey[500],
	padding: "0.5rem 0.8rem",
	borderRadius: "20px",
	position: "relative",
}));

const StyledDisableLayer = styled(Stack)(({ theme, chat }) => ({
	position: "absolute",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
	height: "100%",
	left: 0,
	top: 0,
	zIndex: 2,
	borderRadius: "20px",
	backgroundColor: "rgba(0, 0, 0, 0.5)",
	userSelect: "none",
	pointerEvents: "none",
}));

const StyledOptionsBox = styled(Box)(({ theme, chat, user }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	gap: "0.3rem",
	padding: "0.2rem 0.3rem",
	position: "absolute",
	...(chat.sender?._id === user?._id ? { left: -49 } : { right: -49 }),
	flexDirection: chat.sender?._id === user?._id ? "row-reverse" : "row",
	top: "50%",
	transform: "translateY(-50%)",
}));

function TextChat({
	chat,
	disabled = false,
	dragBoxStyle = {},
	disableDrag = false,
	options = true,
}) {
	const theme = useTheme();
	const dispatch = useDispatch();
	const [showOptions, setShowOptions] = useState(false);
	const optionsRef = useRef();
	const user = useSelector((state) => state?.user?.user);

	// handling reply attachment
	const handleUpdateReplyAttachment = () => {
		dispatch(
			updateAttachment({
				userId: chat?.sender?._id,
				messageId: chat?._id,
				name: chat?.sender?.userName,
				message: chat?.content,
			})
		);
	};

	// showing options menu if hover on chat item element
	const handleMouseEnter = () => {
		setShowOptions(true);
	};

	// hiding options menu on mouse leave
	const handleMouseLeave = () => {
		setShowOptions(false);
	};

	return (
		<DragBox
			sx={{
				maxWidth: "70%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				...dragBoxStyle,
			}}
			onDragEnd={handleUpdateReplyAttachment}
			disableDrag={disableDrag}
			dragLockDir={chat.sender?._id === user?._id ? "right" : "left"}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<ChatText chat={chat} user={user}>
				<Typography
					variant="body2"
					sx={{ userSelect: "none" }}
					color={theme.palette.background.paper}
				>
					{chat.content}
				</Typography>
				{disabled && <StyledDisableLayer />}
			</ChatText>
			{options && showOptions && (
				<StyledOptionsBox
					chat={chat}
					user={user}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<ReactIcons.LuReply
						style={{ cursor: "pointer" }}
						size={18}
						onClick={handleUpdateReplyAttachment}
					/>
					<PopOver
						ref={optionsRef}
						Button={
							<ReactIcons.MdMoreVert style={{ cursor: "pointer" }} size={17} />
						}
						anchorOrigin={{
							vertical: "top",
							horizontal: "left",
						}}
						transformOrigin={{
							vertical: "bottom",
							horizontal: chat.sender?._id === user?._id ? "right" : "left",
						}}
						sx={{
							"& .MuiPopover-paper": {
								borderRadius: 4,
							},
						}}
					>
						<ChatOptions />
					</PopOver>
				</StyledOptionsBox>
			)}
		</DragBox>
	);
}

export default TextChat;
