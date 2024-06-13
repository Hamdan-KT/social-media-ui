import { useState } from "react";
import {
    Typography,
	useTheme,
} from "@mui/material";
import BottomSheet from "components/common/BottomSheet";
import CommentList from "components/ui-components/CommentList";
import { commentList } from "src/data";

function Comments() {
	const theme = useTheme();
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false)
    }

	return (
		<BottomSheet
			title="Comments"
			open={open}
			onClose={handleClose}
        >
            {/* <CommentList data={commentList} /> */}
            <Typography variant="h1">Hello</Typography>
        </BottomSheet>
	);
}

export default Comments;
