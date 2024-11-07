import React, { useEffect } from "react";
import PhotoGallery from "components/ui-components/PhotoGallery";
import { getTaggedPosts } from "src/api/postAPI";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

function ProfileTaggedPosts() {
	const { uid } = useParams();

	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ["get-tagged-posts"],
		queryFn: () => getTaggedPosts(uid),
	});

	useEffect(() => {
		if (isSuccess) {
			console.log({ posts: data });
		}
	}, [isSuccess]);

	return <PhotoGallery data={data?.data} />;
}

export default ProfileTaggedPosts;
