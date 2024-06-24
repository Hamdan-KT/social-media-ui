import { useState } from "react";
import {
    Typography,
	useTheme,
} from "@mui/material";
import BottomSheet from "components/common/BottomSheet";
import CommentList from "components/ui-components/CommentList";
import { commentList } from "src/data";

function Comments({ open = false, handleClose }) {
	return (
		<BottomSheet title="Comments" open={open} onClose={handleClose}>
			<CommentList data={commentList} />
		</BottomSheet>
	);
}

export default Comments;
