import DragBox from "components/common/DragBox";
import { Box, Stack, Typography, styled, useTheme } from "@mui/material";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateAttachment } from "app/slices/messageSlice/messageSlice";
import ReactIcons from "utils/ReactIcons";
import ChatOptions from "../chatOptions";
import PopOver from "components/common/Popover";

const ChatText = styled(Box)(({ theme, chat }) => ({
	display: "flex",
	maxWidth: "100%",
	alignItems: "center",
	justifyContent: "center",
	background: chat.incoming
		? theme.palette.grey[500]
		: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(94,4,167,0.6951155462184874) 0%, rgba(241,0,203,1) 100%)",
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

const StyledOptionsBox = styled(Box)(({ theme, chat }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	gap: "0.3rem",
	flexDirection: "row",
	padding: "0.2rem 0.3rem",
	position: "absolute",
	...(chat?.incoming ? { right: -49 } : { left: -49 }),
	flexDirection: chat?.incoming ? "row" : "row-reverse",
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

	// handling reply attachment
	const handleUpdateReplyAttachment = () => {
		dispatch(
			updateAttachment({
				userId: 1,
				messageId: chat?.id,
				name: "Jhon",
				message: chat?.caption,
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
			dragLockDir={chat.incoming ? "left" : "right"}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<ChatText chat={chat}>
				<Typography
					variant="body2"
					sx={{ userSelect: "none" }}
					color={theme.palette.background.paper}
				>
					{chat.caption}
				</Typography>
				{disabled && <StyledDisableLayer />}
			</ChatText>
			{options && showOptions && (
				<StyledOptionsBox
					chat={chat}
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
							horizontal: chat?.incoming ? "left" : "right",
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
