import MessageList from "src/components/ui-components/MessageList";
import ScrollBox from "src/components/ui-components/Wrappers/ScrollBox";
import {
	Box,
	IconButton,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { Users } from "src/data";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { fetchUserChats } from "src/api/messageAPI";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import {
	setPrimaryChatList,
	setSelectedChat,
} from "src/app/slices/messageSlice/messageSlice";
import { useLocation, useNavigate } from "react-router";
import { RoutePath } from "src/utils/routes";
import DefaultLoader from "src/components/common/DefaultLoader";
import { messageEvents } from "src/services/socket/events";

function MsgPrimary() {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
	const user = useSelector((state) => state.user?.user);
	const socket = useSelector((state) => state?.socket?.socket);
	const primaryChatList = useSelector(
		(state) => state.message?.primaryChatList
	);
	const { ref, inView } = useInView();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const CustomButton = (props) => (
		<IconButton size="medium" color="inherit" {...props}>
			<CameraAltOutlinedIcon />
		</IconButton>
	);

	const mergeChatLists = (currentList, newChats) => {
		const chatMap = new Map();
		// Add existing chats to the map (use _id as the key)
		currentList.forEach((chat) => chatMap.set(chat._id, chat));
		// Add new chats to the map, updating duplicates
		newChats.forEach((chat) => chatMap.set(chat._id, chat));
		// Convert the map back to an array and sort by createdAt
		return Array.from(chatMap.values()).sort(
			(a, b) =>
				new Date(b.lastMessage?.createdAt) - new Date(a.lastMessage?.createdAt)
		);
	};

	const {
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isSuccess,
		isLoading,
		isFetching,
		data,
	} = useInfiniteQuery({
		queryKey: ["get-general-messages"],
		queryFn: ({ pageParam = 1 }) => fetchUserChats(pageParam, 10),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			const nextPage = lastPage?.data?.length
				? allPages?.length + 1
				: undefined;
			return nextPage;
		},
	});

	useEffect(() => {
		if (inView && hasNextPage && !isFetching) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, fetchNextPage, isFetching]);

	//updating chats based on paginated data
	useEffect(() => {
		if (isSuccess) {
			console.log({ chatlist: data?.pages?.flatMap((page) => page?.data) });
			console.log({ primaryChatList });
			const updatedChatlist = mergeChatLists(
				primaryChatList,
				data?.pages?.flatMap((page) => page?.data) ?? []
			);
			console.log({ updatedChatlist });
			dispatch(setPrimaryChatList(updatedChatlist));
		}
	}, [data, dispatch, isSuccess]);

	//listed to chat updates
	useEffect(() => {
		// update chatlist based on new message
		socket?.on(messageEvents.CHATLIST_UPDATED, (newChat) => {
			console.log({ newChat });
			const updatedChatlist = mergeChatLists(primaryChatList, [newChat]);
			dispatch(setPrimaryChatList(updatedChatlist));
		});

		return () => {
			socket?.off(messageEvents.CHATLIST_UPDATED);
		};
	}, [socket, dispatch, primaryChatList]);

	// click handler
	const onChatClick = (chat) => {
		console.log({ chat });
		dispatch(setSelectedChat(chat));
		const route = `/${RoutePath.MESSAGES}/${chat?._id}`;
		pathname !== route && navigate(route);
	};

	return (
		<Box sx={{ width: "100%" }}>
			<ScrollBox
				sx={{
					mt: 0.5,
					flexDirection: "column",
					height: { xs: "100%", md: "80vh" },
				}}
			>
				{!isLoading && primaryChatList?.length === 0 ? (
					<Box
						sx={{
							width: "100%",
							height: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							flexDirection: "column",
							mt: { xs: "50%", md: 0 },
						}}
					>
						<Typography variant="h4">No conversations yet.</Typography>
						<Typography variant="greyTagsXs">
							Search and start new conversation with friends.
						</Typography>
					</Box>
				) : (
					<>
						<MessageList
							isLoading={isLoading}
							data={primaryChatList}
							ref={ref}
							onClick={onChatClick}
							sx={{ maxWidth: "100%" }}
							actionButton={matchDownMd || matchDownSm ? true : false}
							customButton={
								matchDownMd || matchDownSm ? <CustomButton /> : null
							}
						/>
						{(isFetchingNextPage || isLoading) && (
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
					</>
				)}
			</ScrollBox>
		</Box>
	);
}

export default MsgPrimary;
