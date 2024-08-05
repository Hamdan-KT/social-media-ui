import { Box, Grid, Typography, styled, useTheme } from "@mui/material";
import React from "react";
import PhotoType from "./mediaTypes/PhotoType";
import VideoType from "./mediaTypes/VideoType";
import AudioType from "./mediaTypes/AudioType";
import TextChat from "./TextChat";

const StyledReplyBox = styled(Box)(({ theme, chat }) => ({
	display: "flex",
	maxWidth: "40%",
	alignItems: "center",
	justifyContent: chat.incoming ? "flex-start" : "flex-end",
	borderRight: !chat?.incoming && `4px solid ${theme.palette.grey[300]}`,
	borderLeft: chat?.incoming && `4px solid ${theme.palette.grey[300]}`,
	paddingRight: !chat?.incoming && "0.3rem",
	paddingLeft: chat?.incoming && "0.3rem",
	[theme.breakpoints.down("sm")]: {
		maxWidth: "65%",
	},
}));

function ReplyChat({ chat }) {
	const theme = useTheme();
	return (
		<>
			{(() => {
				switch (chat.ref.type) {
					case "text":
						return (
							<Box
								sx={{
									width: "100%",
									gap: "0.4rem",
									display: "flex",
									justifyContent: chat?.incoming ? "flex-start" : "flex-end",
									flexDirection: "column",
									alignItems: chat?.incoming ? "start" : "end",
								}}
							>
								<Typography
									sx={{ padding: "0rem 0.7rem", userSelect: "none" }}
									variant="caption"
								>
									{chat?.incoming ? "Replied to You" : "You Replied"}
								</Typography>
								<StyledReplyBox chat={chat}>
									<TextChat
										chat={{ caption: chat.ref.caption }}
										disabled={true}
										disableDrag={true}
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
									justifyContent: chat?.incoming ? "flex-start" : "flex-end",
									flexDirection: "column",
									alignItems: chat?.incoming ? "start" : "end",
								}}
							>
								<Typography
									sx={{ padding: "0rem 0.7rem", userSelect: "none" }}
									variant="caption"
								>
									{chat?.incoming ? "Replied to You" : "You Replied"}
								</Typography>
								<StyledReplyBox chat={chat}>
									<Grid
										container
										justifyContent={chat.incoming ? "flex-start" : "flex-end"}
									>
										<Grid item xs={3}>
											<PhotoType mediaItem={chat.ref} />
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
									justifyContent: chat?.incoming ? "flex-start" : "flex-end",
									flexDirection: "column",
									alignItems: chat?.incoming ? "start" : "end",
								}}
							>
								<Typography
									sx={{ padding: "0rem 0.7rem", userSelect: "none" }}
									variant="caption"
								>
									{chat?.incoming ? "Replied to You" : "You Replied"}
								</Typography>
								<StyledReplyBox chat={chat}>
									<Grid
										container
										justifyContent={chat.incoming ? "flex-start" : "flex-end"}
									>
										<Grid item xs={3}>
											<VideoType mediaItem={chat.ref} />
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
									justifyContent: chat?.incoming ? "flex-start" : "flex-end",
									flexDirection: "column",
									alignItems: chat?.incoming ? "start" : "end",
								}}
							>
								<Typography
									sx={{ padding: "0rem 0.7rem", userSelect: "none" }}
									variant="caption"
								>
									{chat?.incoming ? "Replied to You" : "You Replied"}
								</Typography>
								<StyledReplyBox chat={chat}>
									<Grid
										container
										justifyContent={chat.incoming ? "flex-start" : "flex-end"}
									>
										<Grid item xs={12} md={12}>
											<AudioType chat={chat} disabled={true} />
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
