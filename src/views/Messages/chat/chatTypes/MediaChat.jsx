/* eslint-disable react/jsx-key */
import { Box, Grid, Typography, styled, useTheme } from "@mui/material";
import React, { useState } from "react";
import AudioType from "./mediaTypes/AudioType";
import PhotoType from "./mediaTypes/PhotoType";
import VideoType from "./mediaTypes/VideoType";
import ReplyChat from "./ReplyChat";
import DragBox from "components/common/DragBox";
import ImageViewer from "components/ui-components/ImageViewer";
import { updateAttachment } from "app/slices/messageSlice/messageSlice";
import { useDispatch } from "react-redux";

const StyledMedia = styled(Box)(({ theme }) => ({
	display: "flex",
	maxWidth: "40%",
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
	pointerEvents: "none"
}));

function MediaChat({ chat }) {
	const theme = useTheme();
	const [viewOpen, setViewOpen] = useState(false);
	const dispatch = useDispatch();

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
									xs={5.5}
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
										mediaItem?.type === ("image" || "video") &&
											setViewOpen(true);
									}}
									item
									xs={12}
									md={12}
								>
									<DragBox
										sx={{ maxWidth: "100%" }}
										onDragEnd={() =>
											dispatch(
												updateAttachment({
													userId: 1,
													messageId: chat?.id,
													name: "Jhon",
													message: chat?.caption ? chat?.caption : "Attachment",
												})
											)
										}
									>
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
								{mediaItem?.type === ("image" || "video") && (
									<ImageViewer
										medias={mediaArr}
										open={viewOpen}
										onClose={() => {
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
