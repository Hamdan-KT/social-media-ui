import React, { useEffect } from "react";
import PhotoGallery from "components/ui-components/PhotoGallery";
import { getSavedPosts } from "src/api/postAPI";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

function ProfileSavedPosts() {
	const { uid } = useParams();

	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ["get-saved-posts"],
		queryFn: () => getSavedPosts(uid),
	});

	useEffect(() => {
		if (isSuccess) {
			console.log({ posts: data });
		}
	}, [isSuccess]);

	return <PhotoGallery data={data?.data} />;
}

export default ProfileSavedPosts;
