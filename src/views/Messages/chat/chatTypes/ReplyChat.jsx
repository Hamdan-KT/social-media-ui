import { Box, Grid, Typography, styled, useTheme } from "@mui/material";
import React, { useState } from "react";
import PhotoType from "./mediaTypes/PhotoType";
import VideoType from "./mediaTypes/VideoType";
import AudioType from "./mediaTypes/AudioType";
import TextChat from "./TextChat";
import { useSelector } from "react-redux";
import { messageContentTypes } from "src/utils/constants";

const StyledReplyBox = styled(Box)(({ theme, chat, user }) => ({
	display: "flex",
	maxWidth: "40%",
	alignItems: "center",
	justifyContent: chat.sender?._id === user?._id ? "flex-end" : "flex-start",
	borderRight:
		chat.sender?._id === user?._id && `4px solid ${theme.palette.grey[300]}`,
	borderLeft:
		chat.sender?._id !== user?._id && `4px solid ${theme.palette.grey[300]}`,
	paddingRight: chat.sender?._id === user?._id && "0.3rem",
	paddingLeft: chat.sender?._id !== user?._id && "0.3rem",
	[theme.breakpoints.down("sm")]: {
		maxWidth: "70%",
	},
}));

function ReplyChat({ chat }) {
	const theme = useTheme();
	const user = useSelector((state) => state?.user?.user);

	return (
		<>
			{(() => {
				switch (chat?.replyRef?.contentType) {
					case messageContentTypes.TEXT:
						return (
							<Box
								sx={{
									width: "100%",
									gap: "0.4rem",
									display: "flex",
									justifyContent:
										chat.sender?._id !== user?._id ? "flex-start" : "flex-end",
									flexDirection: "column",
									alignItems: chat.sender?._id !== user?._id ? "start" : "end",
								}}
							>
								<Typography
									sx={{ padding: "0rem 0.7rem", userSelect: "none" }}
									variant="caption"
								>
									{chat.sender?._id !== user?._id
										? "Replied to You"
										: "You Replied"}
								</Typography>
								<StyledReplyBox chat={chat} user={user}>
									<TextChat
										dragBoxStyle={{ maxWidth: "100%" }}
										chat={chat?.replyRef}
										disabled={true}
										disableDrag={true}
										options={false}
									/>
								</StyledReplyBox>
								<TextChat chat={chat} />
							</Box>
						);
					case "image":
						return (
							<Box
								sx={{
									width: "100%",
									gap: "0.4rem",
									display: "flex",
									justifyContent:
										chat.sender?._id !== user?._id ? "flex-start" : "flex-end",
									flexDirection: "column",
									alignItems: chat.sender?._id !== user?._id ? "start" : "end",
								}}
							>
								<Typography
									sx={{ padding: "0rem 0.7rem", userSelect: "none" }}
									variant="caption"
								>
									{chat.sender?._id !== user?._id
										? "Replied to You"
										: "You Replied"}
								</Typography>
								<StyledReplyBox chat={chat} user={user}>
									<Grid
										container
										justifyContent={
											chat.sender?._id !== user?._id ? "flex-start" : "flex-end"
										}
									>
										<Grid item xs={3}>
											<PhotoType mediaItem={chat.replyRef?.media[0]} />
										</Grid>
									</Grid>
								</StyledReplyBox>
								<TextChat chat={chat} />
							</Box>
						);
					case "video":
						return (
							<Box
								sx={{
									width: "100%",
									gap: "0.4rem",
									display: "flex",
									justifyContent:
										chat.sender?._id !== user?._id ? "flex-start" : "flex-end",
									flexDirection: "column",
									alignItems: chat.sender?._id !== user?._id ? "start" : "end",
								}}
							>
								<Typography
									sx={{ padding: "0rem 0.7rem", userSelect: "none" }}
									variant="caption"
								>
									{chat.sender?._id !== user?._id
										? "Replied to You"
										: "You Replied"}
								</Typography>
								<StyledReplyBox chat={chat} user={user}>
									<Grid
										container
										justifyContent={
											chat.sender?._id !== user?._id ? "flex-start" : "flex-end"
										}
									>
										<Grid item xs={3}>
											<VideoType mediaItem={chat.replyRef} />
										</Grid>
									</Grid>
								</StyledReplyBox>
								<TextChat chat={chat} />
							</Box>
						);
					case "voice":
						return (
							<Box
								sx={{
									width: "100%",
									gap: "0.4rem",
									display: "flex",
									justifyContent:
										chat.sender?._id !== user?._id ? "flex-start" : "flex-end",
									flexDirection: "column",
									alignItems: chat.sender?._id !== user?._id ? "start" : "end",
								}}
							>
								<Typography
									sx={{ padding: "0rem 0.7rem", userSelect: "none" }}
									variant="caption"
								>
									{chat.sender?._id !== user?._id
										? "Replied to You"
										: "You Replied"}
								</Typography>
								<StyledReplyBox chat={chat} user={user}>
									<Grid
										container
										justifyContent={
											chat.sender?._id !== user?._id ? "flex-start" : "flex-end"
										}
									>
										<Grid item xs={12} md={12}>
											<AudioType chat={chat?.replyRef} disabled={true} />
										</Grid>
									</Grid>
								</StyledReplyBox>
								<TextChat chat={chat} />
							</Box>
						);
				}
			})()}
		</>
	);
}

export default ReplyChat;
