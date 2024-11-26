import {
	Box,
	Typography,
	useTheme,
	IconButton,
	Checkbox,
	useMediaQuery,
	Menu,
	styled,
	InputBase,
	Grid,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { commentList } from "src/data";
import CommentList from "components/ui-components/CommentList";
import Picker from "@emoji-mart/react";
import ReactIcons from "utils/ReactIcons";
import emojiData from "@emoji-mart/data";
import Slide from "components/common/Carousel/Slide";
import Slider from "components/common/Carousel/Carousel";
import ProfileAvatar from "components/common/ProfileAvatar";
import PopOver from "components/common/Popover";
import { useDispatch, useSelector } from "react-redux";
import { handleShareWindowOpen } from "app/slices/shareSlice/shareSlice";
import AvatarSet from "components/common/AvatarSet";
import Video from "components/common/Video";
import Image from "components/common/Image";
import {
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { likePost, unlikePost } from "src/api/postAPI";
import { useParams } from "react-router";
import LikeSvg from "src/components/common/LikeSvg";
import { motion } from "framer-motion";
import DefaultLoader from "src/components/common/DefaultLoader";
import { clearCommentBody } from "src/app/slices/commentSlice/commentSlice";
import { createComment, getComments } from "src/api/commentAPI";
import { commentTypes } from "src/utils/constants";
import { useInView } from "react-intersection-observer";
import SkeletonPostLarge from "./skelton";
import {
	handleTaggedUsersWindowOpen,
	setTaggedFileId,
} from "src/app/slices/postSlice/postSlice";

const commonStyle = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

const InputBox = styled("div")(({ theme }) => ({
	display: "flex",
	position: "relative",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "space-between",
	borderRadius: "55px",
	width: "100%",
	padding: "0.2rem 0.2rem",
	border: `1px solid ${theme.palette.grey[300]}`,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `0.3rem`,
		transition: theme.transitions.create("width"),
	},
}));

const CommonBox = styled("div")(({ theme }) => ({
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
	gap: "1rem",
}));

function PostLarge({ data }) {
	const theme = useTheme();
	const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
	const [value, setValue] = useState("");
	const emojPopRef = useRef();
	const dispatch = useDispatch();
	const [likes, setLikes] = useState([]);
	const commentBody = useSelector((state) => state.comment.commentBody);
	console.log({ commentBody });
	const queryClient = useQueryClient();
	const { ref, inView } = useInView();

	const handleLikePost = useMutation({
		mutationKey: ["like-post"],
		mutationFn: (values) => likePost(data?._id),
		onSuccess: (data) => {
			data.isLiked = true;
		},
		onError: (error) => {
			data.isLiked = false;
		},
	});

	const handleUnLikePost = useMutation({
		mutationKey: ["unlike-post"],
		mutationFn: (values) => unlikePost(data?._id),
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
			data.likes = data?.likes - 1;
			handleUnLikePost.mutate();
		} else {
			data.isLiked = true;
			data.likes = data?.likes + 1;
			handleLikePost.mutate();
		}
	};

	const handleLike = (event) => {
		if (data?.isLiked === false) {
			data.likes = data?.likes + 1;
			data.isLiked = true;
			handleLikePost.mutate();
		}
		const x = event.clientX;
		const y = event.clientY;
		const newLike = {
			id: Date.now(),
			x: x,
			y: y,
		};
		setLikes((prev) => [...prev, newLike]);
		setTimeout(() => {
			setLikes((prev) => prev.filter((like) => like.id !== newLike.id));
		}, 2000);
	};

	const handleCreateComment = useMutation({
		mutationKey: ["create-comment"],
		mutationFn: () => {
			const { replyUserName, ...others } = commentBody;
			return createComment(data?._id, { ...others, content: value });
		},
		onSuccess: (data) => {
			setValue("");
			if (commentBody?.type === commentTypes.GENERAL) {
				queryClient.invalidateQueries({ queryKey: ["get-all-comments"] });
			} else {
				queryClient.invalidateQueries({
					queryKey: ["get-all-reply-comments", data?.data?.parent_comment],
				});
			}
			dispatch(clearCommentBody());
		},
	});

	const {
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isFetching,
		isLoading,
		data: comments,
	} = useInfiniteQuery({
		queryKey: ["get-all-comments", data?._id],
		queryFn: ({ pageParam = 1 }) => getComments(data?._id, pageParam),
		initialPageParam: 1,
		enabled: !!data?._id,
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

	if (!data) {
		return <SkeletonPostLarge />;
	}

	return (
		<Box
			sx={{
				...commonStyle,
				height: "auto",
				display: "flex",
				width: { sm: "90vw", md: "77.9vw" },
				// maxWidth: { sm: "90vw", md: "77.9vw" },
				overflow: "hidden",
				position: "relative",
				background: theme.palette.common.white,
			}}
		>
			<Grid container sx={{ border: `1px solid ${theme.palette.grey[300]}` }}>
				<Grid
					item
					sm={7}
					md={8}
					onDoubleClick={handleLike}
					sx={{ position: "relative" }}
				>
					{likes.map((like) => (
						<motion.div
							key={like.id}
							style={{
								position: "fixed",
								top: like.y,
								left: like.x,
								transform: "translate(-50%, -50%)",
								pointerEvents: "none",
								zIndex: 1000,
							}}
							initial={{ opacity: 0, scale: 0.5, x: 0 }}
							animate={[
								{
									opacity: 1,
									scale: 1,
									rotate: [20, -20, 20],
									transition: { duration: 0.5 },
								},
								{ y: -1000, transition: { duration: 0.5, delay: 0.5 } },
							]}
							exit={{
								opacity: 0,
								scale: 0.5,
								transition: { duration: 0.5 },
							}}
							transition={{ duration: 1.5 }}
						>
							<LikeSvg />
						</motion.div>
					))}
					<Slider
						sx={{
							width: "100%",
							height: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							position: "relative",
						}}
					>
						{Array.isArray(data?.files) &&
							data?.files.map((file, ind) => (
								<Slide
									key={ind}
									sx={{
										width: "100%",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										position: "relative",
										overflow: "hidden",
										height: "100%",
									}}
								>
									{file.fileType === "image" && (
										<Image
											style={{
												maxHeight: "92vh",
												width: "100%",
												display: "block",
												objectFit: "contain",
											}}
											alt="Not found!"
											key={file._id}
											src={file?.fileUrl}
											loading="lazy"
											draggable={false}
										/>
									)}
									{file.fileType === "video" && (
										<Video
											controls
											key={file._id}
											src={file?.fileUrl}
											alt="Not Found!"
											style={{
												maxHeight: "92vh",
												width: "100%",
												display: "block",
												objectFit: "contain",
											}}
											loading="lazy"
											draggable={false}
										/>
									)}
									{/* {media?.isTagged && } */}
									<Box
										sx={{
											position: "absolute",
											padding: "5px",
											display: "flex",
											widht: "auto",
											height: "auto",
											left: "10px",
											bottom: "10px",
											borderRadius: "50%",
											background: "black",
											cursor: "pointer",
										}}
										onClick={() => {
											dispatch(handleTaggedUsersWindowOpen(true));
											dispatch(setTaggedFileId(file?._id));
										}}
									>
										<ReactIcons.IoPerson
											size={14}
											style={{ color: "white", margin: 0 }}
										/>
									</Box>
								</Slide>
							))}
					</Slider>
				</Grid>
				<Grid item sm={5} md={4}>
					<Box
						sx={{
							height: "100%",
							background: theme.palette.background.paper,
							borderLeft: `1px solid ${theme.palette.grey[300]}`,
						}}
					>
						{/* header */}
						<Box
							sx={{
								...commonStyle,
								justifyContent: "start",
								gap: "0.5rem",
								p: 1.5,
								width: "100%",
								borderBottom: `1px solid ${theme.palette.grey[300]}`,
							}}
						>
							<Box sx={commonStyle}>
								<ProfileAvatar
									profile={data?.user?.avatar}
									userName={data?.user?.userName}
									sx={{ width: 36, height: 36 }}
								/>
							</Box>
							<Box
								sx={{
									...commonStyle,
									alignItems: "start",
									flexDirection: "column",
								}}
							>
								<Typography variant="userName">
									{data?.user?.userName}
								</Typography>
								<Typography variant="caption">{"kozhikode"}</Typography>
							</Box>
						</Box>
						{/* comments */}
						<Box
							className="scrollbar-hide"
							sx={{
								...commonStyle,
								height: {
									sm: "calc(50vh)",
									md: "calc(100vh - 18rem)",
								},
								padding: "0 0.2rem",
								width: "100%",
								overflowY: "scroll",
								justifyContent: "start",
								flexDirection: "column",
								alignItems: "start",
							}}
						>
							{comments?.pages[0]?.data?.length === 0 && (
								<CommonBox
									sx={{
										height: "100%",
										padding: "20vh 0rem",
										width: "100%",
									}}
								>
									<Typography variant="h4">No comments yet.</Typography>
								</CommonBox>
							)}
							<CommentList data={comments} isLoading={isLoading} ref={ref} />
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
						{/* post info */}
						<Box
							sx={{
								...commonStyle,
								width: "100%",
								alignItems: "start",
								flexDirection: "column",
								borderTop: `1px solid ${theme.palette.grey[300]}`,
							}}
						>
							<Box
								sx={{
									...commonStyle,
									justifyContent: "start",
									alignItems: "center",
									width: "100%",
								}}
							>
								<Checkbox
									size="small"
									aria-label="like"
									checked={data?.isLiked}
									onChange={() => handleLiking(data?.isLiked)}
									icon={
										<ReactIcons.AiOutlineHeart
											style={{
												color: `${theme.palette.text.dark}`,
												fontSize: 28,
											}}
										/>
									}
									checkedIcon={
										<ReactIcons.AiFillHeart
											style={{
												color: `${theme.palette.error.main}`,
												fontSize: 28,
											}}
										/>
									}
								/>
								{!data?.isHideLikes && (
									<Typography variant="userName">{data?.likes}</Typography>
								)}
								{!data?.isDisableComment && (
									<>
										<IconButton aria-label="comment">
											<ReactIcons.RiChat3Line
												style={{
													color: `${theme.palette.text.dark}`,
													fontSize: 25,
													transform: "scaleX(-1)",
												}}
											/>
										</IconButton>
										<Typography variant="userName">{data?.comments}</Typography>
									</>
								)}
								<IconButton
									aria-label="share"
									onClick={() => dispatch(handleShareWindowOpen(true))}
								>
									<ReactIcons.LuSend
										style={{
											color: `${theme.palette.text.dark}`,
											fontSize: 24,
											transform: "rotate(20deg)",
										}}
									/>
								</IconButton>
								<Typography variant="userName">4</Typography>
								<Checkbox
									sx={{ ml: "auto" }}
									aria-label="save"
									icon={
										<ReactIcons.RiBookmarkLine
											style={{
												color: `${theme.palette.text.dark}`,
												fontSize: 25,
											}}
										/>
									}
									checkedIcon={
										<ReactIcons.RiBookmarkFill
											style={{
												color: `${theme.palette.text.dark}`,
												fontSize: 25,
											}}
										/>
									}
								/>
							</Box>
							<Box
								sx={{
									...commonStyle,
									alignItems: "start",
									padding: "0.2rem 0.8rem",
									flexDirection: "column",
									width: "100%",
								}}
							>
								<Box sx={{ display: "flex", alignItems: "center" }}>
									<AvatarSet size={18} />
									<Typography variant="body" ml={0.5}>
										Liked by <Typography variant="userName">Hamdan</Typography>{" "}
										and <Typography variant="userName">Others</Typography>
									</Typography>
								</Box>
								{data?.createdAt && (
									<Typography variant="caption">{data?.createdAt}</Typography>
								)}
							</Box>
						</Box>
						<Box
							sx={{
								...commonStyle,
								width: "100%",
								p: "0.4rem",
								flexDirection: "column",
								position: "relative",
							}}
						>
							{commentBody?.replyUserName && (
								<CommonBox
									sx={{
										position: "absolute",
										left: 0,
										bottom: "100%",
										borderBottom: `1px solid ${theme.palette.grey[100]}`,
										p: "0.1rem",
										justifyContent: "space-between",
										mb: 0.5,
										background: theme.palette.background.paper,
										borderTop: `1px solid ${theme.palette.grey[100]}`,
										borderTopRightRadius: commentBody?.replyUserName
											? "17px"
											: 0,
										borderTopLeftRadius: commentBody?.replyUserName
											? "17px"
											: 0,
									}}
								>
									<CommonBox sx={{ width: "auto", pl: "0.5rem" }}>
										<Typography variant="caption">{`Reply to ${commentBody?.replyUserName}`}</Typography>
									</CommonBox>
									<IconButton
										size="small"
										onClick={() => dispatch(clearCommentBody())}
									>
										<ReactIcons.IoClose />
									</IconButton>
								</CommonBox>
							)}
							<InputBox>
								{matchDownMd ? null : (
									<PopOver
										ref={emojPopRef}
										Button={
											<IconButton color="inherit">
												<ReactIcons.LuSmile />
											</IconButton>
										}
									>
										<Picker
											data={emojiData}
											theme="light"
											onEmojiSelect={(e) => setValue((prev) => prev + e.native)}
										/>
									</PopOver>
								)}
								<StyledInputBase
									fullWidth
									value={value}
									onChange={(e) => setValue(e.target.value)}
									type="text"
									placeholder="Add a comment for ..."
									inputProps={{ "aria-label": "text" }}
								/>
								{value && (
									<Typography
										variant="body"
										sx={{
											cursor: "pointer",
											padding: "0 0.3rem",
											fontWeight: 600,
										}}
										onClick={() => handleCreateComment.mutate()}
										color={theme.palette.primary.main}
									>
										{handleCreateComment.isPending ? (
											<DefaultLoader size={20} />
										) : (
											"Post"
										)}
									</Typography>
								)}
							</InputBox>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}

export default PostLarge;
