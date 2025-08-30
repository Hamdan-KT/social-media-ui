/* eslint-disable react/jsx-key */
import { Box, Grid, Typography, styled, useTheme } from "@mui/material";
import React, { useRef, useState } from "react";
import AudioType from "./MediaTypes/AudioType";
import PhotoType from "./MediaTypes/PhotoType";
import VideoType from "./MediaTypes/VideoType";
import ReplyChat from "./ReplyChat";
import DragBox from "components/common/DragBox";
import ImageViewer from "src/components/ui-components/ImageViewer";
import { updateAttachment } from "app/slices/messageSlice/messageSlice";
import { useDispatch, useSelector } from "react-redux";
import ReactIcons from "utils/ReactIcons";
import PopOver from "components/common/Popover";
import ChatOptions from "../ChatOptions";
import { messageMediaTypes } from "src/utils/constants";
import { RiLightbulbLine } from "react-icons/ri";

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

function MediaChat({ chat, options = true, user }) {
	const theme = useTheme();
	const [viewOpen, setViewOpen] = useState(false);
	const [showOptions, setShowOptions] = useState(false);
	const optionsRef = useRef();
	const dispatch = useDispatch();

	// handling reply attachment
	const handleUpdateReplyAttachment = (media) => {
		dispatch(
			updateAttachment({
				userId: chat?.sender?._id,
				message: { ...chat, media: [media] },
				media,
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
				{chat.media?.length > 1 ? (
					<Box
						sx={{
							width: 250,
							height: 200,
							position: "relative",
							borderRadius: 2,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							cursor: "pointer",
						}}
					>
						{chat?.media?.map((mediaItem, index, mediaArr) => {
							// scatter positions
							const positions = [
								{ bottom: 10, right: 10, rotateDeg: 10, zIndex: 3 },
								{ bottom: 25, right: 30, rotateDeg: 0, zIndex: 2 },
								{ bottom: 40, right: 60, rotateDeg: -10, zIndex: 1 },
								{ bottom: 15, right: 100, rotateDeg: -10, zIndex: 0 },
							];

							const pos = positions[index] || {
								top: index * 10,
								left: index * 20,
								zIndex: 0,
							};

							return (
								<Box
									key={index}
									onClick={() => setViewOpen(true)}
									sx={{
										position: "absolute",
										transform: `rotate(${pos.rotateDeg}deg)`,
										bottom: pos.bottom,
										right: pos.right,
										zIndex: pos.zIndex,
										width: 130,
										height: 150,
										borderRadius: "10px",
										overflow: "hidden",
										boxShadow: 3,
										cursor: "pointer",
									}}
								>
									{(() => {
										switch (mediaItem?.type) {
											case messageMediaTypes.IMAGE:
												return <PhotoType mediaItem={mediaItem} chat={chat} sx={{borderRadius: "10px"}}/>;
											case messageMediaTypes.VIDEO:
												return (
													<VideoType
														mediaItem={mediaItem}
														chat={chat}
														sx={{ borderRadius: "10px" }}
													/>
												);
											default:
												return null;
										}
									})()}
								</Box>
							);
						})}

						{/* Image Viewer */}
						<ImageViewer
							medias={chat?.media}
							open={viewOpen}
							onClose={() => setViewOpen(false)}
						/>
					</Box>
				) : (
					<>
						{chat?.media?.map((mediaItem, index, mediaArr) => (
							<>
								<Grid item xs={12} md={12}>
									<DragBox
										sx={{
											width: "100%",
											// background: "yellow",
											justifyContent:
												chat.sender?._id !== user?._id ? "start" : "end",
										}}
										onDragEnd={() => handleUpdateReplyAttachment(mediaItem)}
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
															controls
															loop={false}
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
													onClick={() => handleUpdateReplyAttachment(mediaItem)}
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
													<ChatOptions chat={chat} user={user} />
												</PopOver>
											</StyledOptionsBox>
										)}
									</DragBox>
								</Grid>
								{mediaItem?.type ===
									(messageMediaTypes.IMAGE || messageMediaTypes.VIDEO) && (
									<ImageViewer
										medias={[mediaArr[index]]}
										open={viewOpen}
										onClose={() => {
											setViewOpen(false);
										}}
									/>
								)}
							</>
						))}
					</>
				)}
			</Grid>
		</StyledMedia>
	);
}

export default MediaChat;
