/* eslint-disable react/display-name */
import {
	Avatar,
	Box,
	Checkbox,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
	useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CommentList from "..";
import DefaultLoader from "components/common/DefaultLoader";
import ReactIcons from "utils/ReactIcons";
import {
	getReplyComments,
	likeComment,
	unlikeComment,
} from "src/api/commentAPI";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setCommentBody } from "src/app/slices/commentSlice/commentSlice";
import { commentTypes } from "src/utils/constants";

const CommentListItem = React.forwardRef(
	({ data = {}, parent_comment = null }, ref) => {
		const theme = useTheme();
		const [showReply, setShowReply] = useState(false);
		const dispatch = useDispatch();

		const handleLikeComment = useMutation({
			mutationKey: ["like-comment"],
			mutationFn: (values) => likeComment(data?._id),
			onSuccess: (data) => {
				data.isLiked = true;
			},
			onError: (error) => {
				data.isLiked = false;
			},
		});

		const handleUnLikeComment = useMutation({
			mutationKey: ["unlike-comment"],
			mutationFn: (values) => unlikeComment(data?._id),
			onSuccess: (data) => {
				data.isLiked = false;
			},
			onError: (error) => {
				data.isLiked = true;
			},
		});

		const handleLiking = (liked = false) => {
			if (liked) {
				data.isLiked = false;
				data.likes = data?.likes - 1
				handleUnLikeComment.mutate();
			} else {
				data.isLiked = true;
				data.likes = data?.likes + 1;
				handleLikeComment.mutate();
			}
		};

		const {
			fetchNextPage,
			hasNextPage,
			isFetchingNextPage,
			isFetching,
			data: replyComments,
			isSuccess,
		} = useInfiniteQuery({
			queryKey: ["get-all-reply-comments", data?._id],
			queryFn: ({ pageParam = 1 }) =>
				getReplyComments(data?._id, pageParam, 10),
			initialPageParam: 1,
			enabled: false,
			getNextPageParam: (lastPage, allPages) => {
				const nextPage = lastPage?.data?.length
					? allPages?.length + 1
					: undefined;
				return nextPage;
			},
		});

		const handleReply = () => {
			dispatch(
				setCommentBody({
					parent_comment: parent_comment ?? data?._id,
					type: commentTypes.REPLY,
					mentions: [],
					replyUserName: data?.user?.userName,
				})
			);
		};

		const handleReplyFetch = () => {
			setShowReply(true);
			fetchNextPage();
		};

		return (
			<>
				<ListItem
					ref={ref}
					dense
					disableGutters
					disablePadding
					sx={{ p: "0.9rem 2rem 0.2rem 0.5rem", userSelect: "none" }}
					alignItems="flex-start"
					secondaryAction={
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Checkbox
								sx={{ padding: "0.2rem 0.5rem" }}
								size="small"
								aria-label="like"
								checked={data?.isLiked}
								onChange={() => handleLiking(data?.isLiked)}
								icon={
									<ReactIcons.AiOutlineHeart
										size={17}
										style={{
											color: `${theme.palette.grey[500]}`,
										}}
									/>
								}
								checkedIcon={
									<ReactIcons.AiFillHeart
										size={17}
										style={{
											color: `${theme.palette.error.main}`,
										}}
									/>
								}
							/>
							{data?.likes ? (
								<Typography variant="caption" sx={{ fontWeight: "bold" }}>
									{data?.likes}
								</Typography>
							) : null}
						</Box>
					}
				>
					<ListItemAvatar>
						<Avatar sx={{ width: 33, height: 33 }} src={data?.user?.avatar} />
					</ListItemAvatar>
					<ListItemText
						sx={{ width: "100%" }}
						primaryTypographyProps={{
							fontSize: 13,
							fontWeight: "bold",
							whiteSpace: "wrap",
							flexWrap: "wrap",
						}}
						secondaryTypographyProps={{
							whiteSpace: "wrap",
							flexWrap: "wrap",
							fontSize: 12,
						}}
					>
						<Box>
							<Box sx={{ display: "flex", flexDirection: "column" }}>
								<Typography variant="userName">
									{data?.user?.userName}
									<Typography variant="caption">{` ${data?.createdAt}`}</Typography>
								</Typography>
								<Typography variant="commonText">{data?.content}</Typography>
							</Box>
							<Box
								sx={{
									display: "flex",
									width: "100%",
									gap: "1rem",
									cursor: "pointer",
								}}
							>
								<Typography
									variant="caption"
									onClick={handleReply}
									sx={{ fontWeight: "bold" }}
								>
									Reply
								</Typography>
							</Box>
						</Box>
					</ListItemText>
				</ListItem>
				<Box sx={{ ml: 8 }}>
					{showReply && (
						<>
							{replyComments?.pages?.map((page, pageIndex, pageArr) => (
								<>
									{page?.data?.map((comment, commentIndex, commentArr) => {
										console.log({ comment });
										return (
											<CommentListItem
												parent_comment={data?._id}
												key={commentIndex}
												data={comment}
											/>
										);
									})}
								</>
							))}
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
									<DefaultLoader size={18} />
								</Box>
							)}
						</>
					)}
					{data?.isReplies && (
						<Box
							sx={{
								display: "flex",
								width: "max-content",
								alignItems: "center",
								justifyContent: "center",
								gap: "0.3rem",
							}}
						>
							<>
								{showReply && !hasNextPage ? (
									<Typography
										variant="caption"
										sx={{ cursor: "pointer", mt: 0.5, fontWeight: "bold" }}
										onClick={() => setShowReply(false)}
									>{`--- Hide replies`}</Typography>
								) : (
									<Typography
										variant="caption"
										sx={{ cursor: "pointer", mt: 0.5, fontWeight: "bold" }}
										onClick={handleReplyFetch}
									>{`--- View replies(${data?.repliesCount})`}</Typography>
								)}
							</>
						</Box>
					)}
				</Box>
			</>
		);
	}
);

export default CommentListItem;
