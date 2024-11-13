import { forwardRef, useEffect, useState } from "react";
import { Box, IconButton, InputBase, styled, useTheme } from "@mui/material";
import BottomSheet from "components/common/BottomSheet";
import CommentList from "components/ui-components/CommentList";
import { commentList } from "src/data";
import ReactIcons from "utils/ReactIcons";
import { useDispatch, useSelector } from "react-redux";
import {
	handleCommentWindowOpen,
	setCommentData,
} from "src/app/slices/commentSlice/commentSlice";
import {
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { createComment, getComments } from "src/api/commentAPI";
import { useInView } from "react-intersection-observer";
import DefaultLoader from "src/components/common/DefaultLoader";

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
	const { ref, inView } = useInView();
	const theme = useTheme();
	const postId = useSelector((state) => state.comment.postId);
	const commentBody = useSelector((state) => state.comment.commentBody);
	const commentWindowOpen = useSelector(
		(state) => state.comment.commentWindowOpen
	);
	const dispatch = useDispatch();
	const queryClient = useQueryClient();

	const handleCreateComment = useMutation({
		mutationKey: ["create-comment"],
		mutationFn: () => createComment(postId, { ...commentBody, content: value }),
		onSuccess: (data) => {
			setValue("");
			queryClient.invalidateQueries({ queryKey: ["get-all-comments"] });
		},
	});

	const {
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isFetching,
		data,
	} = useInfiniteQuery({
		queryKey: ["get-all-comments", postId],
		queryFn: ({ pageParam = 1 }) => getComments(postId, pageParam),
		initialPageParam: 1,
		enabled: !!postId,
		getNextPageParam: (lastPage, allPages) => {
			const nextPage = lastPage?.data?.length
				? allPages?.length + 1
				: undefined;
			return nextPage;
		},
	});

	useEffect(() => {
		if (inView && hasNextPage && !isFetching) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, fetchNextPage, isFetching]);

	return (
		<BottomSheet
			open={commentWindowOpen}
			onClose={() => {
				dispatch(setCommentData(null));
				dispatch(handleCommentWindowOpen(false));
			}}
			title="Comments"
			sheetBodyStyles={{ position: "relative" }}
		>
			<Box
				sx={{
					display: "flex",
					padding: "0.3rem",
					width: "100%",
					height: "auto",
					flexDirection: "column",
				}}
			>
				<CommentList data={data} ref={ref} />
				{isFetchingNextPage && (
					<Box
						sx={{
							width: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							p: 1,
						}}
					>
						<DefaultLoader />
					</Box>
				)}
			</Box>
			<Box
				sx={{
					display: "flex",
					width: "100%",
					position: "fixed", // Change to fixed to lock position
					left: 0,
					bottom: 0,
					padding: "0.4rem",
					background: "red",
					// background: theme.palette.background.paper,
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
							onClick={() => handleCreateComment.mutate()}
							sx={{
								background: theme.palette.primary.main,
								color: theme.palette.background.paper,
							}}
						>
							{handleCreateComment.isPending ? (
								<DefaultLoader size={20} />
							) : (
								<ReactIcons.IoArrowUp size={20} />
							)}
						</IconButton>
					)}
				</InputBox>
			</Box>
		</BottomSheet>
	);
};

export default Comments;
