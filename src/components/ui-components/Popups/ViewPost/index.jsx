import React, { useEffect, useState } from "react";
import CustomModal from "components/common/Modal";
import PostLarge from "../../Post/large";
import { useNavigate, useParams } from "react-router";
import { explorePosts } from "src/data";

function ViewPost({ open = true }) {
	const navigate = useNavigate();
	const { pId } = useParams();
	// temp post
	const [tempPost, setTempPost] = useState({});
	useEffect(() => {
		const post = explorePosts.find((post) => post.id == pId);
		setTempPost(post);
	}, [pId]);
	return (
		<CustomModal open={open} onClose={() => navigate(-1)} closeIcon={true}>
			<PostLarge data={tempPost} />
		</CustomModal>
	);
}

export default ViewPost;
