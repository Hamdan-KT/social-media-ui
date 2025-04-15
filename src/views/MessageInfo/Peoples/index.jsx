import { fetchChatMembers } from "src/api/messageAPI";
import UserList from "src/components/ui-components/UserList";
import { Box, Typography, useTheme } from "@mui/material";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RoutePath } from "src/utils/routes";
import DefaultLoader from "src/components/common/DefaultLoader";

function MessageInfoPeoples({ count = true }) {
	const theme = useTheme();
	const selectedChat = useSelector((state) => state?.message?.selectedChat);
	const { ref, inView } = useInView();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ["get-chat-members", selectedChat?._id],
		queryFn: () => fetchChatMembers(selectedChat?._id),
		enabled: !!selectedChat?._id,
	});

	useEffect(() => {
		console.log({ users: data });
	}, [data]);

	const handleClick = async (info) => {
		console.log({ info });
		if (info?._id) {
			return navigate(`/${RoutePath.PROFILE}/${info?._id}`);
		}
	};

	return (
		<div style={{ width: "100%" }}>
			{count && (
				<Typography variant="body" sx={{ fontWeight: "bold" }}>
					{`Members (${data?.data?.length ?? 0})`}
				</Typography>
			)}
			<UserList
				ref={ref}
				data={data?.data ?? []}
				sx={{ maxWidth: "100%" }}
				onClick={(info) => handleClick(info)}
				profileNavigation={false}
				// customButton={
				// 	initialChat.isPending ? <DefaultLoader size={25} /> : null
				// }
			/>
			{isLoading && (
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
		</div>
	);
}

export default MessageInfoPeoples;
