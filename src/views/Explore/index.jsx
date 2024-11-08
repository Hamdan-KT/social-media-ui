import { RoutePath } from "utils/routes";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import PhotoGallery from "components/ui-components/PhotoGallery";
import { useNavigate } from "react-router";
import SearchInput from "components/common/SearchInput";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "src/api/postAPI";
import { useInView } from "react-intersection-observer";

function Explore() {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const navigate = useNavigate();
	const { ref, inView } = useInView();

	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ["get-explore-posts"],
		queryFn: () => getAllPosts(),
	});

	// const {
	// 	fetchNextPage,
	// 	fetchPreviousPage,
	// 	hasNextPage,
	// 	hasPreviousPage,
	// 	isFetchingNextPage,
	// 	isFetchingPreviousPage,
	// 	isFetching,
	// 	refetch,
	// 	data,
	// 	isLoading,
	// } = useInfiniteQuery({
	// 	queryKey: ["get-all-user-posts"],
	// 	queryFn: ({ pageParam = 1 }) => getAllPosts(),
	// 	enabled: false,
	// 	initialPageParam: 1,
	// 	refetchOnWindowFocus: false,
	// 	getNextPageParam: (lastPage, allPages) => {
	// 		const nextPage = lastPage?.data?.length
	// 			? allPages?.length + 1
	// 			: undefined;
	// 		return nextPage;
	// 	},
	// });

	// useEffect(() => {
	// 	if (inView && hasNextPage && !isFetching) {
	// 		fetchNextPage();
	// 	}
	// }, [inView, hasNextPage, fetchNextPage]);

	return (
		<Grid container>
			{matchDownSm && (
				<Grid item xs={12} md={12} sm={12} lg={12}>
					<SearchInput
						onClick={() => navigate(`/${RoutePath.EXPLORE_SEARCH}`)}
					/>
				</Grid>
			)}
			<Grid item xs={12} md={12} sm={12} lg={12} mt={1}>
				<PhotoGallery
					sx={{ padding: { md: "0 2rem", lg: "0 6rem" } }}
					data={data?.data}
				/>
				<div ref={ref}></div>
			</Grid>
		</Grid>
	);
}

export default Explore;
