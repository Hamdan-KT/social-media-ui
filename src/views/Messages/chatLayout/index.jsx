import React, { useEffect, useRef, useState } from "react";
import ChatHeader from "./Header";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import ChatInput from "./chatInput/Index";
import { motion } from "framer-motion";
import { chatData } from "src/data";
import Chat from "../chat";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { fetchChatMessages } from "src/api/messageAPI";
import { messageEvents } from "src/services/socket/events";
import DefaultLoader from "src/components/common/DefaultLoader";
import { setChatMessages } from "src/app/slices/messageSlice/messageSlice";
import DragBox from "src/components/common/DragBox";
import useOutSlideClick from "src/hooks/useOutSlideClick";
import TypingIndicator from "src/components/common/TypingIndicator";

function ChatLayout() {
	const theme = useTheme();
	const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
	const messageState = useSelector((state) => state.message);
	const socket = useSelector((state) => state?.socket?.socket);
	const bottomDivRef = useRef();
	const dispatch = useDispatch();
	const inputRef = useRef();
	const { outSide } = useOutSlideClick(inputRef);
	const { ref, inView } = useInView();
	const [isTyping, setIsTyping] = useState(false);

	useEffect(() => {
		if (bottomDivRef.current) {
			bottomDivRef.current.scrollIntoView();
		}
	}, [messageState, isTyping]);

	const {
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isSuccess,
		isFetching,
		isLoading,
		data,
	} = useInfiniteQuery({
		queryKey: ["get-user-chat-messages", messageState?.selectedChat?._id],
		queryFn: ({ pageParam = 1 }) =>
			fetchChatMessages(messageState?.selectedChat?._id, pageParam, 10),
		getNextPageParam: (lastPage, allPages) => {
			const nextPage = lastPage?.data?.length
				? allPages?.length + 1
				: undefined;
			return nextPage;
		},
		enabled: !!messageState?.selectedChat?._id,
		initialPageParam: 1,
	});

	useEffect(() => {
		if (inView && hasNextPage && !isFetching) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, fetchNextPage, isFetching]);

	useEffect(() => {
		dispatch(setChatMessages(data?.pages?.flatMap((page) => page?.data) || []));
	}, [data, dispatch]);

	useEffect(() => {
		// Listen for incoming messages
		socket?.on(messageEvents.RECEIVE, (newMessage) => {
			console.log({ newMessage });
			if (newMessage.chat === messageState?.selectedChat?._id) {
				dispatch(
					setChatMessages([...(messageState?.chatMessages ?? []), newMessage])
				);
			}
		});

		return () => {
			socket?.off(messageEvents.RECEIVE);
		};
	}, [
		socket,
		messageState?.selectedChat?._id,
		messageState?.chatMessages,
		dispatch,
	]);

	useEffect(() => {
		if (outSide) {
			socket?.emit(messageEvents.TYPING, {
				chatId: messageState?.selectedChat?._id,
				isTyping: false,
			});
		} else {
			socket?.emit(messageEvents.TYPING, {
				chatId: messageState?.selectedChat?._id,
				isTyping: true,
			});
		}
		socket?.on(messageEvents.USER_TYPING, (isTyping) => {
			setIsTyping(isTyping);
		});

		return () => {
			socket?.off(messageEvents.TYPING);
			socket?.off(messageEvents.USER_TYPING);
		};
	}, [outSide, messageState?.selectedChat?._id, socket]);

	return (
		<motion.div style={{ width: "100%" }}>
			<Grid container>
				{matchDownMd && <ChatHeader />}
				<Grid item xs={12}>
					<Box
						sx={{
							width: "100%",
							position: "relative",
							padding: 0,
						}}
					>
						{/* message header */}
						{!matchDownMd && <ChatHeader />}
					</Box>
				</Grid>
				<Grid item xs={12}>
					<Box
						sx={{
							overflowX: "hidden",
							mt: { xs: 6, sm: 7, md: 7 },
							height: {
								md: messageState?.attachment?.messageId
									? `calc(100vh - 26.2vh)`
									: `calc(100vh - 20vh)`,
							},
							maxHeight: {
								xs: `100%`,
								md: messageState?.attachment?.messageId
									? `calc(100vh - 26.2vh)`
									: `calc(100vh - 20vh)`,
							},
							overflowY: { md: "scroll" },
							p: { xs: 0.5, sm: 1 },
							mb: {
								xs: messageState?.attachment?.messageId ? 8 : 0.7,
								sm: messageState?.attachment?.messageId ? 13.5 : 7,
								md: 0,
							},
							width: "100%",
						}}
					>
						{isFetchingNextPage && (
							<Box
								sx={{
									width: "100%",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<DefaultLoader />
							</Box>
						)}
						{/* chats will render heare */}
						<Chat
							data={messageState?.chatMessages}
							ref={ref}
							isLoading={isLoading}
						/>
						{isTyping && <TypingIndicator isVisible={isTyping} />}
						<Box
							sx={{
								height: 0,
								margin: 0,
								padding: 0,
								width: 0,
								boxSizing: "border-box",
							}}
							ref={bottomDivRef}
						></Box>
					</Box>
				</Grid>
				<Grid item xs={12}>
					{!matchDownMd && <ChatInput ref={inputRef} />}
				</Grid>
				{matchDownMd && <ChatInput ref={inputRef} />}
			</Grid>
		</motion.div>
	);
}

export default ChatLayout;
