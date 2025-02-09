/* eslint-disable react/jsx-key */
import { Box, Grid, Typography, styled, useTheme } from "@mui/material";
import React, { useState } from "react";
import AudioType from "./mediaTypes/AudioType";
import PhotoType from "./mediaTypes/PhotoType";
import VideoType from "./mediaTypes/VideoType";
import ReplyChat from "./ReplyChat";
import DragBox from "components/common/DragBox";
import ImageViewer from "components/ui-components/ImageViewer";

const StyledMedia = styled(Box)(({ theme }) => ({
	display: "flex",
	maxWidth: "50%",
	position: "relative",
	[theme.breakpoints.down("sm")]: {
		maxWidth: "65%",
	},
}));

const StyledOverlay = styled(Box)(({ theme }) => ({
	position: "absolute",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
	height: "100%",
	borderRadius: "20px",
	top: 0,
	left: 0,
	backgroundColor: "rgba(0, 0, 0, 0.5)",
	userSelect: "none",
}));

function MediaChat({ chat }) {
	const theme = useTheme();
	const [viewOpen, setViewOpen] = useState(false);

	return (
		<StyledMedia>
			<Grid
				container
				rowGap={0.5}
				columnGap={0.5}
				justifyContent={chat.incoming ? "flex-start" : "flex-end"}
			>
				{chat?.media?.map((mediaItem, index, mediaArr) => (
					<>
						{mediaArr.length > 3 ? (
							<>
								<Grid
									onClick={() => setViewOpen(true)}
									item
									xs={5}
									sx={{ position: index === 3 && "relative" }}
								>
									{index <= 3 &&
										(() => {
											switch (mediaItem?.type) {
												case "image":
													return (
														<PhotoType mediaItem={mediaItem} chat={chat} />
													);
												case "video":
													return (
														<VideoType mediaItem={mediaItem} chat={chat} />
													);
											}
										})()}
									{index === 3 && (
										<StyledOverlay>
											<Typography
												variant="h3"
												color={theme.palette.background.default}
											>
												{Number(mediaArr?.length - 3) + "+"}
											</Typography>
										</StyledOverlay>
									)}
								</Grid>
								{index === 0 && (
									<ImageViewer
										medias={mediaArr}
										open={viewOpen}
										onClose={() => setViewOpen(false)}
									/>
								)}
							</>
						) : (
							<>
								<Grid
									onClick={(e) => {
										console.log("grid clicked...");
										e.preventDefault();
										e.stopPropagation();
										setViewOpen(true);
									}}
									item
									xs={12}
									md={10}
								>
									<DragBox sx={{ maxWidth: "100%" }}>
										{(() => {
											switch (mediaItem?.type) {
												case "image":
													return (
														<PhotoType mediaItem={mediaItem} chat={chat} />
													);
												case "voice":
													return (
														<AudioType mediaItem={mediaItem} chat={chat} />
													);
												case "video":
													return (
														<VideoType mediaItem={mediaItem} chat={chat} />
													);
												case "reply":
													return (
														<ReplyChat mediaItem={mediaItem} chat={chat} />
													);
											}
										})()}
									</DragBox>
								</Grid>
								{mediaItem?.type === "image" && (
									<ImageViewer
										medias={mediaArr}
										open={viewOpen}
										onClose={() => {
											console.log("close popup..");
											setViewOpen(false);
										}}
									/>
								)}
							</>
						)}
					</>
				))}
			</Grid>
		</StyledMedia>
	);
}

export default MediaChat;
