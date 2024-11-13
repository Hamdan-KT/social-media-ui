import {
	Avatar,
	Box,
	Checkbox,
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

const CommentListItem = React.forwardRef(function CommentListItem(
	{ data = {} },
	ref
) {
	const theme = useTheme();
	const [showReply, setShowReply] = useState(false);

	const handleViewReply = () => {
		setShowReply(!showReply);
	};

	const handleLikeComment = useMutation({
		mutationKey: ["like-comment"],
		mutationFn: (values) => likeComment(),
		onSuccess: (data) => {},
		onError: (error) => {},
	});

	const handleUnLikeComment = useMutation({
		mutationKey: ["unlike-comment"],
		mutationFn: (values) => unlikeComment(),
		onSuccess: (data) => {},
		onError: (error) => {},
	});

	const {
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isFetching,
		data: replyComments,
		isSuccess,
	} = useInfiniteQuery({
		queryKey: ["get-all-reply-comments", data?._id],
		queryFn: ({ pageParam = 1 }) => getReplyComments(data?._id),
		initialPageParam: 1,
		refetchOnWindowFocus: false,
		enabled: !!data?._id,
		getNextPageParam: (lastPage, allPages) => {
			const nextPage = lastPage?.data?.length
				? allPages?.length + 1
				: undefined;
			return nextPage;
		},
	});

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
							<Typography variant="userName">{data?.user?.userName}</Typography>
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
							<Typography variant="caption">{data?.createdAt}</Typography>
							<Typography variant="caption" sx={{ fontWeight: "bold" }}>
								Reply
							</Typography>
						</Box>
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
								<Typography
									onClick={handleViewReply}
									variant="caption"
									sx={{ cursor: "pointer", mt: 0.5, fontWeight: "bold" }}
								>
									{showReply
										? `--- Hide replies`
										: `--- View replies(${data?.repliesCount})`}
								</Typography>
							</Box>
						)}
					</Box>
				</ListItemText>
			</ListItem>
			{showReply && (
				<Box sx={{ ml: 6.7 }}>
					<CommentList data={data?.replies} />
				</Box>
			)}
		</>
	);
});

export default CommentListItem;
