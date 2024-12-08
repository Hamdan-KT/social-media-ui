import ScrollBox from "src/components/ui-components/Wrappers/ScrollBox";
import { Users } from "src/data";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import UserList from "src/components/ui-components/UserList";
import MessageList from "src/components/ui-components/MessageList";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import DefaultLoader from "src/components/common/DefaultLoader";
import { getChatSearchUsers, inintializeChat } from "src/api/messageAPI";
import { useNavigate } from "react-router";
import { RoutePath } from "src/utils/routes";
import { useDispatch } from "react-redux";
import { setSelectedChat } from "src/app/slices/messageSlice/messageSlice";

function MsgUserSearchList({ value = "", setValue = () => {} }) {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
	const { ref, inView } = useInView();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const {
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isSuccess,
		isFetching,
		isLoading,
		data,
	} = useInfiniteQuery({
		queryKey: ["get-message-search-users", value],
		queryFn: ({ pageParam = 1 }) =>
			getChatSearchUsers({ search: value }, pageParam, 10),
		initialPageParam: 1,
		enabled: !!value,
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

	useEffect(() => {
		console.log({ users: data });
	}, [data]);

	const initialChat = useMutation({
		mutationKey: ["initial-chat"],
		mutationFn: (info) => inintializeChat(info?._id),
		onSuccess: (data) => {
			console.log(data);
			setValue("");
			dispatch(setSelectedChat(data?.data));
			navigate(`/${RoutePath.MESSAGES}/${data?.data?._id}`);
		},
	});

	const handleClick = async (info) => {
		console.log({ info });
		if (info?.chat?._id) {
			setValue("");
			dispatch(setSelectedChat(info?.chat));
			return navigate(`/${RoutePath.MESSAGES}/${info?.chat?._id}`);
		} else {
			return initialChat.mutate(info);
		}
	};

	return (
		<Box sx={{ width: "100%" }}>
			<ScrollBox
				sx={{
					mt: 0.5,
					flexDirection: "column",
					height: { xs: "100%", md: "85vh" },
				}}
			>
				<UserList
					ref={ref}
					data={data}
					sx={{ maxWidth: "100%" }}
					onClick={(info) => handleClick(info)}
					profileNavigation={false}
					customButton={
						initialChat.isPending ? <DefaultLoader size={25} /> : null
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
			</ScrollBox>
		</Box>
	);
}

export default MsgUserSearchList;
