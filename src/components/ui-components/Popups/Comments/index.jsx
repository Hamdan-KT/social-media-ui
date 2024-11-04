import { forwardRef, useState } from "react";
import { Box, IconButton, InputBase, styled, useTheme } from "@mui/material";
import BottomSheet from "components/common/BottomSheet";
import CommentList from "components/ui-components/CommentList";
import { commentList } from "src/data";
import ReactIcons from "utils/ReactIcons";
import { useDispatch, useSelector } from "react-redux";
import { handleCommentWindowOpen } from "src/app/slices/commentSlice/commentSlice";

const InputBox = styled(Box)(({ theme }) => ({
	display: "flex",
	position: "relative",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "space-between",
	borderRadius: "55px",
	width: "100%",
	padding: "0.2rem 0.2rem",
	border: `1px solid ${theme.palette.grey[300]}`,
	marginBottom: 4,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `0.3rem`,
		transition: theme.transitions.create("width"),
	},
}));

const Comments = function () {
	const [value, setValue] = useState("");
	const theme = useTheme();
	const commentWindowOpen = useSelector(
		(state) => state.comment.commentWindowOpen
	);
	const dispatch = useDispatch();

	return (
		<BottomSheet
			open={commentWindowOpen}
			onClose={() => dispatch(handleCommentWindowOpen(false))}
			title="Comments"
			sheetBodyStyles={{ position: "relative" }}
		>
			<Box
				sx={{
					display: "flex",
					padding: "0.3rem",
					width: "100%",
					height: "auto",
				}}
			>
				<CommentList data={commentList} />
			</Box>
			<Box
				sx={{
					display: "flex",
					width: "100%",
					position: "sticky",
					left: 0,
					bottom: 0,
					padding: "0.4rem",
					background: theme.palette.background.paper,
					borderTop: `1px solid ${theme.palette.grey[100]}`,
				}}
			>
				<InputBox>
					<StyledInputBase
						sx={{ paddingLeft: "0.5rem" }}
						fullWidth
						value={value}
						onChange={(e) => setValue(e.target.value)}
						type="text"
						placeholder="Add a comment for ..."
						inputProps={{ "aria-label": "text" }}
					/>
					{value && (
						<IconButton
							disableRipple
							sx={{
								background: theme.palette.primary.main,
								color: theme.palette.background.paper,
							}}
						>
							<ReactIcons.IoArrowUp size={20} />
						</IconButton>
					)}
				</InputBox>
			</Box>
		</BottomSheet>
	);
};

export default Comments;
