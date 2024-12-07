import MessageList from "src/components/ui-components/MessageList";
import ScrollBox from "src/components/ui-components/Wrappers/ScrollBox";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { Users } from "src/data";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { fetchUserChats } from "src/api/messageAPI";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChat } from "src/app/slices/messageSlice/messageSlice";
import { useLocation, useNavigate } from "react-router";
import { RoutePath } from "src/utils/routes";

function MsgGeneral() {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
	const user = useSelector((state) => state.user?.user);
	const { ref, inView } = useInView();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const CustomButton = (props) => (
		<IconButton size="medium" color="inherit" {...props}>
			<CameraAltOutlinedIcon />
		</IconButton>
	);

	const {
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isSuccess,
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

	const flattenedData = data?.pages?.flatMap((page) => page?.data) || [];

	useEffect(() => {
		if (inView && hasNextPage && !isFetching) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, fetchNextPage, isFetching]);

	useEffect(() => {
		console.log({ chats: data });
	}, [data]);

	const onChatClick = (chat) => {
		console.log({ chat });
		dispatch(setSelectedChat(chat));
		const route = `/${RoutePath.MESSAGES}/${chat?._id}`;
		pathname !== route && navigate(route);
	};

	return (
		<Box sx={{ width: "100%" }}>
			<ScrollBox sx={{ mt: 0.5, height: { xs: "100%", md: "80vh" } }}>
				<MessageList
					data={flattenedData}
					ref={ref}
					onClick={onChatClick}
					sx={{ maxWidth: "100%" }}
					actionButton={matchDownMd || matchDownSm ? true : false}
					customButton={matchDownMd || matchDownSm ? <CustomButton /> : null}
				/>
			</ScrollBox>
		</Box>
	);
}

export default MsgGeneral;
