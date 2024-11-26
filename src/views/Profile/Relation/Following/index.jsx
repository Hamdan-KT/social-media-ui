import {
	Box,
	Typography,
	styled,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import ProfileSavedPosts from "src/views/Profile/SavedPosts";
import FollowHeader from "../Header";
import { useLocation, useParams } from "react-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import DefaultLoader from "src/components/common/DefaultLoader";
import UserList from "src/components/ui-components/UserList";
import { getFollowingUsers, getUsers } from "src/api/userAPI";

const CommonBox = styled("div")(({ theme }) => ({
	display: "flex",
	width: "100%",
	alignItems: "center",
	justifyContent: "center",
	gap: "0.5rem",
}));

function FollowingRel() {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const { uid } = useParams();
	const location = useLocation()

	const { ref, inView } = useInView();

	const {
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isSuccess,
		isFetching,
		data,
	} = useInfiniteQuery({
		queryKey: ["get-following-users"],
		queryFn: ({ pageParam = 1 }) => getFollowingUsers(uid, {}, pageParam, 10),
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

	useEffect(() => {
		console.log({ users: data });
	}, [isSuccess, data]);

	return (
		<>
			{/* <FollowHeader title="Following" /> */}
			<Box
				sx={{
					width: "100%",
					p: { sm: "0.5rem", md: "0 2rem", lg: "0 1rem" },
				}}
			>
				<CommonBox
					sx={{
						flexDirection: "column",
						gap: "1rem",
					}}
				>
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
			</Box>
		</>
	);
}

export default FollowingRel;
