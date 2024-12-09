/* eslint-disable react/jsx-key */
import { Box, Grid, Typography, styled, useTheme } from "@mui/material";
import React, { useRef, useState } from "react";
import AudioType from "./mediaTypes/AudioType";
import PhotoType from "./mediaTypes/PhotoType";
import VideoType from "./mediaTypes/VideoType";
import ReplyChat from "./ReplyChat";
import DragBox from "components/common/DragBox";
import ImageViewer from "components/ui-components/ImageViewer";
import { updateAttachment } from "app/slices/messageSlice/messageSlice";
import { useDispatch, useSelector } from "react-redux";
import ReactIcons from "utils/ReactIcons";
import PopOver from "components/common/Popover";
import ChatOptions from "../chatOptions";
import { messageMediaTypes } from "src/utils/constants";

const StyledMedia = styled(Box)(({ theme }) => ({
	display: "flex",
	maxWidth: "40%",
	position: "relative",
	[theme.breakpoints.down("sm")]: {
		maxWidth: "70%",
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
	pointerEvents: "none",
}));

const StyledOptionsBox = styled(Box)(({ theme, chat, user }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	gap: "0.3rem",
	padding: "0.2rem 0.3rem",
	position: "absolute",
	...(chat.sender?._id !== user?._id ? { right: -49 } : { left: -49 }),
	flexDirection: chat.sender?._id !== user?._id ? "row" : "row-reverse",
	top: "50%",
	transform: "translateY(-50%)",
}));

function MediaChat({ chat, options = true }) {
	const theme = useTheme();
	const [viewOpen, setViewOpen] = useState(false);
	const [showOptions, setShowOptions] = useState(false);
	const optionsRef = useRef();
	const dispatch = useDispatch();
	const user = useSelector((state) => state?.user?.user);

	// handling reply attachment
	const handleUpdateReplyAttachment = () => {
		dispatch(
			updateAttachment({
				userId: chat?.sender?._id,
				message: chat,
			})
		);
	};

	// handleMedia open on photos or videos
	const openMedia = (mediaItem) => {
		if (
			mediaItem?.type === (messageMediaTypes.IMAGE || messageMediaTypes.VIDEO)
		)
			setViewOpen(true);
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
		<StyledMedia>
			<Grid
				container
				rowGap={0.5}
				columnGap={0.5}
				justifyContent={
					chat.sender?._id !== user?._id ? "flex-start" : "flex-end"
				}
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
												case messageMediaTypes.IMAGE:
													return (
														<PhotoType mediaItem={mediaItem} chat={chat} />
													);
												case messageMediaTypes.VIDEO:
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
								<Grid item xs={12} md={12}>
									<DragBox
										sx={{
											width: "100%",
											// background: "yellow",
											justifyContent:
												chat.sender?._id !== user?._id ? "start" : "end",
										}}
										onDragEnd={handleUpdateReplyAttachment}
										dragLockDir={
											chat.sender?._id !== user?._id ? "left" : "right"
										}
										onMouseEnter={handleMouseEnter}
										onMouseLeave={handleMouseLeave}
									>
										{(() => {
											switch (mediaItem?.type) {
												case messageMediaTypes.IMAGE:
													return (
														<PhotoType
															mediaItem={mediaItem}
															chat={chat}
															onClick={() => openMedia(mediaItem)}
														/>
													);
												case messageMediaTypes.AUDIO:
													return (
														<AudioType mediaItem={mediaItem} chat={chat} />
													);
												case messageMediaTypes.VIDEO:
													return (
														<VideoType
															mediaItem={mediaItem}
															chat={chat}
															onClick={() => openMedia(mediaItem)}
															// sx={{ width: "80%" }}
														/>
													);
												case "reply":
													return (
														<ReplyChat mediaItem={mediaItem} chat={chat} />
													);
											}
										})()}
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
														<ReactIcons.MdMoreVert
															style={{ cursor: "pointer" }}
															size={17}
														/>
													}
													anchorOrigin={{
														vertical: "top",
														horizontal: "left",
													}}
													transformOrigin={{
														vertical: "bottom",
														horizontal:
															chat.sender?._id !== user?._id ? "left" : "right",
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
								</Grid>
								{mediaItem?.type ===
									(messageMediaTypes.IMAGE || messageMediaTypes.VIDEO) && (
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
