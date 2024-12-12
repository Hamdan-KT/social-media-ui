import { Box, Grid, Typography, styled, useTheme } from "@mui/material";
import React, { useState } from "react";
import PhotoType from "./mediaTypes/PhotoType";
import VideoType from "./mediaTypes/VideoType";
import AudioType from "./mediaTypes/AudioType";
import TextChat from "./TextChat";
import { useSelector } from "react-redux";
import { messageContentTypes, messageMediaTypes } from "src/utils/constants";
import MediaChat from "./MediaChat";

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

function MediaChats({ chat, user }) {
	switch (chat?.replyRef?.media[0]?.type) {
		case messageMediaTypes.IMAGE:
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
						{chat?.replyRef?.sender?._id === chat.sender?._id
							? chat.sender?._id === user?._id
								? "Replied to yourself"
								: "Replied to themself"
							: chat?.replyRef?.sender?._id === user?._id
							? "Replied to you"
							: chat?.sender?._id === user?._id
							? "You replied"
							: "Replied to someone"}
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
					{chat?.contentType === messageContentTypes.TEXT ? (
						<TextChat chat={chat} user={user} />
					) : (
						<MediaChat chat={chat} user={user} />
					)}
				</Box>
			);
		case messageMediaTypes.VIDEO:
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
						{chat?.replyRef?.sender?._id === chat.sender?._id
							? chat.sender?._id === user?._id
								? "Replied to yourself"
								: "Replied to themself"
							: chat?.replyRef?.sender?._id === user?._id
							? "Replied to you"
							: chat?.sender?._id === user?._id
							? "You replied"
							: "Replied to someone"}
					</Typography>
					<StyledReplyBox chat={chat} user={user}>
						<Grid
							container
							justifyContent={
								chat.sender?._id !== user?._id ? "flex-start" : "flex-end"
							}
						>
							<Grid item xs={3}>
								<VideoType mediaItem={chat.replyRef?.media[0]} />
							</Grid>
						</Grid>
					</StyledReplyBox>
					{chat?.contentType === messageContentTypes.TEXT ? (
						<TextChat chat={chat} user={user} />
					) : (
						<MediaChat chat={chat} user={user} />
					)}
				</Box>
			);
		case messageMediaTypes.AUDIO:
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
						{chat?.replyRef?.sender?._id === chat.sender?._id
							? chat.sender?._id === user?._id
								? "Replied to yourself"
								: "Replied to themself"
							: chat?.replyRef?.sender?._id === user?._id
							? "Replied to you"
							: chat?.sender?._id === user?._id
							? "You replied"
							: "Replied to someone"}
					</Typography>
					<StyledReplyBox chat={chat} user={user}>
						<Grid
							container
							justifyContent={
								chat.sender?._id !== user?._id ? "flex-start" : "flex-end"
							}
						>
							<Grid item xs={12} md={12}>
								<AudioType
									chat={chat?.replyRef}
									mediaItem={chat?.replyRef?.media[0]}
									disabled={true}
								/>
							</Grid>
						</Grid>
					</StyledReplyBox>
					{chat?.contentType === messageContentTypes.TEXT ? (
						<TextChat chat={chat} user={user} />
					) : (
						<MediaChat chat={chat} user={user} />
					)}
				</Box>
			);
	}
}

function ReplyChat({ chat, user }) {
	console.log({ repUser: user?._id });
	console.log({ replyRef_sender: chat?.replyRef?.sender?._id });
	console.log({ chat_sender: chat.sender?._id });
	console.log({ chat });

	//conditions
	console.log(chat?.replyRef?.sender?._id == chat.sender?._id);
	console.log(chat.sender?._id == user?._id);
	console.log(chat?.replyRef?.sender?._id == user?._id);
	console.log(chat?.sender?._id == user?._id);

	{
		chat?.replyRef?.sender?._id == chat.sender?._id
			? chat.sender?._id == user?._id
				? "Replied to yourself"
				: "Replied to themself"
			: chat?.replyRef?.sender?._id == user?._id
			? "Replied to you"
			: chat?.sender?._id == user?._id
			? "You replied"
			: "Replied to someone";
	}

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
									{chat?.replyRef?.sender?._id == chat.sender?._id
										? chat.sender?._id == user?._id
											? "Replied to yourself"
											: "Replied to themself"
										: chat?.replyRef?.sender?._id == user?._id
										? "Replied to you"
										: chat?.sender?._id == user?._id
										? "You replied"
										: "Replied to someone"}
								</Typography>
								<StyledReplyBox chat={chat} user={user}>
									<TextChat
										dragBoxStyle={{ maxWidth: "100%" }}
										chat={chat?.replyRef}
										disabled={true}
										disableDrag={true}
										options={false}
										user={user}
									/>
								</StyledReplyBox>
								{chat?.contentType === messageContentTypes.TEXT ? (
									<TextChat chat={chat} user={user} />
								) : (
									<MediaChat chat={chat} user={user} />
								)}
							</Box>
						);
					case messageContentTypes.MEDIA:
						return <MediaChats chat={chat} user={user} />;
				}
			})()}
		</>
	);
}

export default ReplyChat;
