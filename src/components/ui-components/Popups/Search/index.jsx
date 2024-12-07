import { styled } from "@mui/material/styles";
import { Box, Divider, Paper } from "@mui/material";
import UserList from "components/ui-components/UserList";
import { Users } from "src/data";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import _ from "lodash";
import SearchInput from "components/common/SearchInput";
import { getUsers } from "src/api/userAPI";
import { useDebounceValue } from "src/hooks/useDebounce";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import DefaultLoader from "src/components/common/DefaultLoader";

const StyledPaper = styled(Paper)(({ theme }) => ({
	width: "100%",
	display: "flex",
	padding: "1rem 0.5rem",
	background: theme.palette.background.default,
	height: "86vh",
	[theme.breakpoints.up("xs")]: {
		height: "81vh",
	},
	position: "relative",
	"&::before": {
		content: `""`,
		position: "absolute",
		display: "flex",
		width: "100%",
		background: `linear-gradient(to top, rgba(255,0,0,0), ${theme.palette.background.paperLight}, ${theme.palette.background.default})`,
		padding: "1rem",
		top: 2,
		left: 0,
		zIndex: 7,
	},
	"&::after": {
		content: `""`,
		position: "absolute",
		display: "flex",
		width: "100%",
		background: `linear-gradient(to bottom, rgba(255,0,0,0), ${theme.palette.background.paperLight}, ${theme.palette.background.default})`,
		padding: "1rem",
		bottom: 2,
		left: 0,
	},
}));

function SearchPopUp() {
	const { debouncedValue, value, setValue } = useDebounceValue("", 500);
	const { ref, inView } = useInView();

	const {
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isSuccess,
		isFetching,
		isLoading,
		data,
	} = useInfiniteQuery({
		queryKey: ["get-search-users", debouncedValue],
		queryFn: ({ pageParam = 1 }) => getUsers({ search: value }, pageParam, 10),
		initialPageParam: 1,
		enabled: !!debouncedValue,
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

	return (
		<Box sx={{ width: "100%" }}>
			<Typography variant="h2" p="0.5rem">
				Search
			</Typography>
			<SearchInput value={value} setValue={setValue} />
			<Divider sx={{ mt: 3 }} />
			<Box
				sx={{
					display: "flex",
					width: "100%",
					height: "max-content",
					alignItems: "center",
					justifyContent: "center",
					zIndex: 10,
				}}
			>
				<StyledPaper elevation={0}>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							height: "100%",
							alignItems: "flex-start",
							overflowY: "scroll",
							width: "100%",
							scrollBehavior: "smooth",
						}}
						className="scrollbar-hide"
					>
						{!_.isEmpty(value) ? (
							<Box sx={{width: "100%", display: "flex", flexDirection: "column"}}>
								<UserList ref={ref} sx={{ maxWidth: "100%" }} data={data} />
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
							</Box>
						) : (
							<Typography mt={3} variant="h5">
								No recent searches!
							</Typography>
						)}
					</Box>
				</StyledPaper>
			</Box>
		</Box>
	);
}

export default SearchPopUp;
