import React, { useEffect } from "react";
import PhotoGallery from "components/ui-components/PhotoGallery";
import { useQuery } from "@tanstack/react-query";
import { getUserPosts } from "src/api/postAPI";
import { useParams } from "react-router";

function ProfilePosts() {
	const { uid } = useParams();

	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ["get-user-posts"],
		queryFn: () => getUserPosts(uid),
	});

	useEffect(() => {
		if (isSuccess) {
			console.log({ posts: data }); 
		}
	}, [isSuccess]);

	return <PhotoGallery data={data?.data} />;
}

export default ProfilePosts;
