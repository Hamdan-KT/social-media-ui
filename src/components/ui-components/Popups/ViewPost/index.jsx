import React from "react";
import CustomModal from "components/common/Modal";
import PostLarge from "../../Post/large";

function ViewPost({ open = true, onClose }) {
	return (
		<CustomModal open={open} onClose={onClose} closeIcon={true}>
			<PostLarge />
		</CustomModal>
	);
}

export default ViewPost;
