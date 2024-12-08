/* eslint-disable react/display-name */
import { Box, styled, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { forwardRef } from "react";

// chat type components
import MediaChat from "./chatTypes/MediaChat";
import TextChat from "./chatTypes/TextChat";
import ReplyChat from "./chatTypes/ReplyChat";
import TimeLine from "./chatTypes/TimeLine";
import {
	messageContentTypes,
	messageStatusTypes,
	messageTypes,
} from "src/utils/constants";
import { useSelector } from "react-redux";
import ChatMessagesSkeleton from "./skelton";
import DragBox from "src/components/common/DragBox";
import ReactIcons from "src/utils/ReactIcons";

const StyledBox = styled(Box)(({ theme, chat, user }) => ({
	display: "flex",
	width: "100%",
	alignItems: "center",
	justifyContent: chat.sender?._id === user?._id ? "flex-end" : "flex-start",
	minHeight: "30px",
	marginBottom: 6,
	"&:last-child": {
		marginBottom: 0,
	},
	position: "relative",
}));

const StyledMessageStatus = styled(Box)(({ theme, chat, user }) => ({
	display: "flex",
	width: "auto",
	alignItems: "center",
	justifyContent: "center",
	position: "absolute",
	left: "100%",
	gap: "0.2rem",
}));

const renderMessageType = (data) => {
	switch (data?.contentType) {
		case messageContentTypes.MEDIA:
			return <MediaChat chat={data} />;
		case messageContentTypes.TEXT:
			return <TextChat chat={data} />;
	}
};

const Chat = forwardRef(({ data, isLoading = false }, ref) => {
	const user = useSelector((state) => state?.user?.user);
	const theme = useTheme();

	if (isLoading || !data) {
		return <ChatMessagesSkeleton />;
	}

	return (
		<DragBox
			sx={{
				width: "100%",
				// minHeight: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "start",
				flexDirection: "column",
			}}
		>
			{data?.map((item, index, dataArr) => (
				<StyledBox
					key={index}
					chat={item}
					user={user}
					ref={index === 0 ? ref : undefined}
				>
					{(() => {
						switch (item?.messageType) {
							case messageTypes.GENERAL:
								return renderMessageType(item);
							case messageTypes.REPLY:
								return <ReplyChat chat={item} />;
							case "time":
								return <TimeLine chat={item} />;
						}
					})()}
					<StyledMessageStatus>
						{item?.status === messageStatusTypes.SENDING && (
							<Box
								sx={{
									width: "6px",
									height: "6px",
									borderRadius: "50%",
									background: theme.palette.grey[400],
								}}
							></Box>
						)}
						<Box
							sx={{
								width: "max-content",
								height: "auto",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								gap: "0.3rem",
								color: theme.palette.grey[400],
							}}
						>
							{item?.status === messageStatusTypes.SENDING ? (
								<>
									<ReactIcons.LuSendHorizonal
										size={13}
										// style={{ marginLeft: 10 }}
									/>
									<Typography variant="greyTagsXs" sx={{ fontSize: "0.6rem" }}>
										sending...
									</Typography>
								</>
							) : (
								<>
									{item?.sender?._id === user?._id ? (
										<ReactIcons.IoArrowForwardCircleOutline
											size={17}
											style={{ marginLeft: 10 }}
										/>
									) : (
										<ReactIcons.IoArrowBackCircleOutline
											size={17}
											style={{ marginLeft: 10 }}
										/>
									)}
									<Typography variant="greyTagsXs" sx={{ fontSize: "0.6rem" }}>
										{item?.createdAt}
									</Typography>
								</>
							)}
						</Box>
					</StyledMessageStatus>
				</StyledBox>
			))}
		</DragBox>
	);
});

export default Chat;
