import React, { useEffect, useState } from "react";
import CustomModal from "components/common/Modal";
import PostLarge from "../../Post/large";
import { useNavigate, useParams } from "react-router";
import { explorePosts, userPosts } from "src/data";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "src/api/postAPI";
import SkeletonPostLarge from "../../Post/large/skelton";

function ViewPost({ open = true }) {
	const navigate = useNavigate();
	const { pId } = useParams();
	console.log({ pId });

	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ["get-post", pId],
		queryFn: () => getPost(pId),
	});
	// temp post
	const [tempPost, setTempPost] = useState({});
	useEffect(() => {
		const post = [...userPosts, ...explorePosts]?.find(
			(post) => post.id == pId
		);
		setTempPost(post);
	}, [pId]);

	return (
		<CustomModal open={open} onClose={() => navigate(-1)} closeIcon={true}>
			<PostLarge data={data?.data} />
		</CustomModal>
	);
}

export default ViewPost;
