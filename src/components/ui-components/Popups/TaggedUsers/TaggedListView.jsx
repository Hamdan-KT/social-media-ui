import { getTaggedUsers } from "src/api/postAPI";
import { Box, styled, Typography } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import UserList from "../../UserList";
import DefaultLoader from "src/components/common/DefaultLoader";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";

const CommonBox = styled("div")(({ theme }) => ({
	display: "flex",
	width: "100%",
	alignItems: "center",
	justifyContent: "center",
	gap: "0.5rem",
}));

function TaggedListView() {
	const { ref, inView } = useInView();
	const taggedFileId = useSelector((state) => state.post.taggedFileId);

	const {
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isSuccess,
		isFetching,
		data,
	} = useInfiniteQuery({
		queryKey: ["get-tagged-users", taggedFileId],
		queryFn: ({ pageParam = 1 }) => getTaggedUsers(taggedFileId, pageParam, 10),
		initialPageParam: 1,
		enabled: !!taggedFileId,
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
	}, [isSuccess, data]);

	return (
		<CommonBox
			sx={{
				flexDirection: "column",
				gap: "1rem",
				padding: { xs: "0.5rem", sm: "1rem" },
			}}
		>
			{data?.pages[0]?.data?.length === 0 && (
				<CommonBox
					sx={{
						height: "100%",
						padding: "20vh 0rem",
						width: "100%",
					}}
				>
					<Typography variant="h4">No Peoples tagged in this post.</Typography>
				</CommonBox>
			)}
			<UserList
				sx={{ maxWidth: "100%" }}
				data={data}
				ref={ref}
				actionButton={true}
			/>
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
		</CommonBox>
	);
}

export default TaggedListView;
