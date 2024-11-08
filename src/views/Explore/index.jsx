import { RoutePath } from "utils/routes";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import PhotoGallery from "components/ui-components/PhotoGallery";
import { useNavigate } from "react-router";
import SearchInput from "components/common/SearchInput";
import { useEffect } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getAllPosts } from "src/api/postAPI";
import { useInView } from "react-intersection-observer";
import DefaultLoader from "src/components/common/DefaultLoader";

function Explore() {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const navigate = useNavigate();
	const { ref, inView } = useInView();

	const { fetchNextPage, hasNextPage, isFetchingNextPage, isFetching, data } =
		useInfiniteQuery({
			queryKey: ["get-explore-posts"],
			queryFn: ({ pageParam = 1 }) => getAllPosts(pageParam, 9),
			initialPageParam: 1,
			refetchOnWindowFocus: false,
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
					data={data}
					ref={ref}
				/>
				{isFetchingNextPage && (
					<Box
						sx={{
							width: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							p: 1,
						}}
					>
						<DefaultLoader />
					</Box>
				)}
			</Grid>
		</Grid>
	);
}

export default Explore;
