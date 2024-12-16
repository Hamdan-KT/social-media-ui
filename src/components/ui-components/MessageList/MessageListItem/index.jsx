import React, { useEffect, useState } from "react";
import Btn from "components/common/Button";
import ProfileAvatar from "components/common/ProfileAvatar";
import {
	Box,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	Typography,
	useTheme,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { forwardRef } from "react";
import { useSelector } from "react-redux";
import { messageEvents } from "src/services/socket/events";
import { messageContentTypes } from "src/utils/constants";

const RenderSecondayText = ({ chat }) => {
	const user = useSelector((state) => state?.user?.user);
	if (chat?.unreadMessagesCount > 0) {
		return (
			<Typography>
				<Typography variant="userName">
					{chat?.unreadMessagesCount > 4
						? `${4}+`
						: `${chat?.unreadMessagesCount}`}{" "}
					{chat?.unreadMessagesCount > 1 ? "New Messages" : "New Message"}{" "}
					&#183;{" "}
				</Typography>
				<Typography variant="greyTagsXs" sx={{ fontWeight: "medium" }}>
					{chat?.lastMessage?.formattedCreatedAt}
				</Typography>
			</Typography>
		);
	} else {
		return (
			<Typography>
				<Typography variant="greyTagsXs" sx={{ fontWeight: "medium" }}>
					{chat?.lastMessage?.sender !== user?._id
						? chat?.lastMessage?.contentType === messageContentTypes.MEDIA
							? "sent you attachment "
							: `${chat?.lastMessage?.content} `
						: "sent "}
					&#183;{" "}
				</Typography>
				<Typography variant="greyTagsXs" sx={{ fontWeight: "medium" }}>
					{chat?.lastMessage?.formattedCreatedAt}
				</Typography>
			</Typography>
		);
	}
};

// eslint-disable-next-line react/display-name
const MessageListItem = forwardRef(
	(
		{
			customButton,
			onButtonClick = () => {},
			onClick,
			data = {},
			urlPrefix,
			navigateId,
			primaryText,
			secondaryText,
			actionButton = false,
			customButtonProps,
		},
		ref
	) => {
		const navigate = useNavigate();
		const { pathname } = useLocation();
		const theme = useTheme();
		const socket = useSelector((state) => state?.socket?.socket);
		const [isTyping, setIsTyping] = useState(false);
		// custom button
		const ModifiedCustomBtn = React.Children.map(customButton, (child) =>
			React.cloneElement(child, {
				onClick: () => onButtonClick(data),
				...customButtonProps,
			})
		);

		useEffect(() => {
			socket?.on(messageEvents.USERLIST_TYPING, ({ chatId, isTyping }) => {
				if (data?._id === chatId) {
					setIsTyping(isTyping);
				}
			});

			return () => {
				socket?.off(messageEvents.USERLIST_TYPING);
			};
		}, [socket, data?._id]);

		return (
			<ListItem
				ref={ref}
				secondaryAction={
					<Box
						sx={{
							width: "auto",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							gap: "0.3rem",
							padding: "0.5rem",
						}}
					>
						{data?.unreadMessagesCount > 0 && (
							<Box
								sx={{
									width: "6px",
									height: "6px",
									borderRadius: "50%",
									background: theme.palette.primary.dark,
								}}
							></Box>
						)}
						{actionButton ? ModifiedCustomBtn : null}
					</Box>
				}
				disablePadding
				disableGutters
			>
				<ListItemButton
					onClick={() => {
						typeof onClick === "function" && onClick(data);
						urlPrefix &&
							navigateId &&
							pathname !== `${urlPrefix}/${navigateId}` &&
							navigate(`${urlPrefix}/${navigateId}`);
					}}
				>
					<ListItemAvatar>
						<ProfileAvatar
							profile={
								data?.isGroupChat ? data?.groupAvatar : data?.receiver?.avatar
							}
							userName={
								data?.isGroupChat ? data?.groupName : data?.receiver?.userName
							}
							sx={{
								width: { xs: 50, sm: 46 },
								height: { xs: 50, sm: 46 },
							}}
							containerSx={{ padding: { xs: "2px", sm: "2px" }, mr: 1 }}
						/>
					</ListItemAvatar>
					<ListItemText
						primaryTypographyProps={{
							fontSize: 13,
							noWrap: true,
							fontWeight: "bold",
							mr: actionButton || customButton ? 5 : 0,
						}}
						secondaryTypographyProps={{
							noWrap: true,
							fontSize: 12,
							mr: {
								xs: actionButton || customButton ? 3 : 0,
								sm: actionButton || customButton ? 3 : 0,
							},
						}}
						primary={primaryText}
						secondary={
							isTyping
								? "Typing..."
								: secondaryText ?? <RenderSecondayText chat={data} />
						}
					/>
				</ListItemButton>
			</ListItem>
		);
	}
);

export default MessageListItem;
