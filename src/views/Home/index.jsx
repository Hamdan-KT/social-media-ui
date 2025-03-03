import { useTheme } from "@mui/material/styles";
import { Box, Grid, styled, useMediaQuery } from "@mui/material";
import { defaultSpacing } from "utils/constants";
import StorySlider from "components/ui-components/StorySlider";
import Suggessions from "components/ui-components/ProfileAndSuggession";
import PostMobile from "components/ui-components/Post/mobile";
import { Virtuoso } from "react-virtuoso";
// dummy data
import MobileHeader from "layouts/MainLayout/Header";
import { memo, useEffect } from "react";
import DefaultLoader from "components/common/DefaultLoader";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllPosts } from "src/api/postAPI";
import { useInView } from "react-intersection-observer";
import PostMobileSkeleton from "src/components/ui-components/Post/mobile/skelton";

const StyledBox = styled(Box)(({ theme }) => ({
	width: "100%",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "start",
	background: theme.palette.background.default,
	gap: "1rem",
	position: "relative",
	minHeight: "100vh",
}));

// memorize post component
const MemoizedPost = memo(PostMobile);

function Home() {
	const theme = useTheme();
	const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const { ref, inView } = useInView();

	const {
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isFetching,
		data,
		isSuccess,
		isLoading,
	} = useInfiniteQuery({
		queryKey: ["get-all-posts"],
		queryFn: ({ pageParam = 1 }) => getAllPosts(pageParam, 2),
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
	}, [isSuccess, data]);

	return (
		<Grid container spacing={defaultSpacing}>
			<Grid item md={8.5} sm={12} lg={8.5} xs={12}>
				<StyledBox>
					{/* mobile header in xs devices */}
					<MobileHeader />
					{/* story Slider */}
					<StorySlider />
					{/* post rendering */}
					{!data || isLoading ? (
						<>
							{Array.from({ length: 2 }).map((_, ind) => (
								<PostMobileSkeleton key={ind} />
							))}
						</>
					) : (
						<>
							<Virtuoso
								useWindowScroll
								data={data.pages.flatMap((page) => page.data)}
								style={{
									height: "100vh",
									width: matchDownSm ? "100%" : "470px",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									flexDirection: "column",
								}}
								itemContent={(index, post) => (
									<MemoizedPost
										ref={
											index ===
											data.pages.flatMap((page) => page.data).length - 1
												? ref
												: undefined
										}
										key={post._id}
										data={post}
										divider={true}
									/>
								)}
							/>
						</>
					)}
					{isFetchingNextPage && <DefaultLoader />}
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
