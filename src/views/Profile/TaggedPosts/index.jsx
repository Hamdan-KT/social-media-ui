import React, { useEffect } from "react";
import PhotoGallery from "components/ui-components/PhotoGallery";
import { getTaggedPosts } from "src/api/postAPI";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { useInView } from "react-intersection-observer";

function ProfileTaggedPosts() {
	const { uid } = useParams();
	const { ref, inView } = useInView();

	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ["get-tagged-posts", uid],
		queryFn: () => getTaggedPosts(uid),
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
		<>
			<PhotoGallery data={data?.data} />
			<div ref={ref}></div>
		</>
	);
}

export default ProfileTaggedPosts;
