import React, { useEffect } from "react";
import PhotoGallery from "components/ui-components/PhotoGallery";
import { getSavedPosts } from "src/api/postAPI";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { useInView } from "react-intersection-observer";
import DefaultLoader from "src/components/common/DefaultLoader";
import { Box } from "@mui/material";

function ProfileSavedPosts() {
	const { ref, inView } = useInView();

	const {
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		isFetching,
		data,
	} = useInfiniteQuery({
		queryKey: ["get-all-saved-posts"],
		queryFn: ({ pageParam = 1 }) => getSavedPosts(pageParam, 9),
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

	return (
		<>
			<PhotoGallery data={data} ref={ref} isLoading={isLoading} />
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
		</>
	);
}

export default ProfileSavedPosts;
