import { useTheme } from "@mui/material/styles";
import { Box, Divider, Grid, styled, useMediaQuery } from "@mui/material";
import { defaultSpacing } from "utils/constants";
import StorySlider from "components/ui-components/StorySlider";
import Suggessions from "components/ui-components/ProfileAndSuggession";
import PostMobile from "components/ui-components/Post/mobile";

// dummy data
import { userPosts } from "../../data";
import MobileHeader from "layouts/MainLayout/Header";
import { memo, useEffect } from "react";
import DefaultLoader from "components/common/DefaultLoader";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getAllPosts } from "src/api/postAPI";
import { useInView } from "react-intersection-observer";

const StyledBox = styled(Box)(({ theme }) => ({
	width: "100%",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	background: theme.palette.background.default,
	gap: "1rem",
}));

// memorize post component
const MemoizedPost = memo(PostMobile);

function Home() {
	const theme = useTheme();
	const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
	const { ref, inView } = useInView();

	const {
		fetchNextPage,
		fetchPreviousPage,
		hasNextPage,
		hasPreviousPage,
		isFetchingNextPage,
		isFetchingPreviousPage,
		isFetching,
		refetch,
		data,
		isLoading,
		isSuccess,
	} = useInfiniteQuery({
		queryKey: ["get-all-user-posts"],
		queryFn: ({ pageParam = 1 }) => getAllPosts(pageParam, 2),
		enabled: true,
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

	useEffect(() => {
		if (isSuccess) {
			console.log({ user_posts: data });
		}
	}, [isSuccess]);

	return (
		<Grid container spacing={defaultSpacing}>
			<Grid item md={8.5} sm={12} lg={8.5} xs={12}>
				<StyledBox>
					{/* mobile header in xs devices */}
					<MobileHeader />
					{/* story Slider */}
					<StorySlider />
					{/* post rendering */}

					{data?.pages?.map((page, pageIndex, pageArr) => {
						return page?.data?.map((post, postIndex, postArr) => (
							<MemoizedPost
								key={post?._id}
								data={post}
								divider={Boolean(pageIndex !== pageArr.length - 1)}
							/>
						));
					})}
					{isFetchingNextPage && <DefaultLoader />}
					<div
						style={{ height: 0, width: 0, margin: 0, padding: 0 }}
						ref={ref}
					></div>
				</StyledBox>
			</Grid>
			{/* suggession adn profile section */}
			{!matchDownMd && (
				<Grid item md={3.5} lg={3.5} xs={0} sm={0}>
					<Suggessions />
				</Grid>
			)}
		</Grid>
	);
}

export default Home;
