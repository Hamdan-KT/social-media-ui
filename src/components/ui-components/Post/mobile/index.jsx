/* eslint-disable react/display-name */
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { Box, Checkbox, Divider, useMediaQuery } from "@mui/material";
import verifiedBadge from "assets/images/verifiedBadge.png";
import ImgWrapper from "components/common/ImgWrapper";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Slide from "components/common/Carousel/Slide";
import Slider from "components/common/Carousel/Carousel";
import ReactIcons from "utils/ReactIcons";
import Comments from "components/ui-components/Popups/Comments";
import { useLocation, useNavigate } from "react-router";
import { RoutePath } from "utils/routes";
import ProfileAvatar from "components/common/ProfileAvatar";
import { handleShareWindowOpen } from "app/slices/shareSlice/shareSlice";
import AvatarSet from "components/common/AvatarSet";
import Image from "components/common/Image";
import Video from "components/common/Video";
import { handleCommentWindowOpen } from "app/slices/commentSlice/commentSlice";
import { setCommentData } from "src/app/slices/commentSlice/commentSlice";
import { likePost, savePost, unlikePost, unsavePost } from "src/api/postAPI";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { FaHeart } from "react-icons/fa6";
import LikeSvg from "src/components/common/LikeSvg";
import PostMobileSkeleton from "./skelton";
import {
	handleTaggedUsersWindowOpen,
	setTaggedFileId,
} from "src/app/slices/postSlice/postSlice";
import PostOptionsWindow from "components/ui-components/Popups/PostOptions";

// caption style
const captionStyle = {
	webkitLineClamp: "2",
	webkitBoxOrient: "vertical",
	overflow: "hidden",
	display: "-webkit-box",
};

const PostMobile = React.forwardRef(({ data, divider = false }, ref) => {
	const [showExpand, setShowExpand] = useState(false);
	const [expanded, setExpanded] = useState(false);
	const captionRef = useRef(null);
	const theme = useTheme();
	const location = useLocation();
	const navigate = useNavigate();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const dispatch = useDispatch();
	const [likes, setLikes] = useState([]);
	const [openOptions, setOpenOptions] = useState(false);

	// check expand option of caption
	useEffect(() => {
		if (captionRef.current) {
			setShowExpand(
				captionRef.current.scrollHeight !== captionRef.current.clientHeight
			);
		}
	}, []);

	// handling expand
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

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

	const handleSavePost = useMutation({
		mutationKey: ["save-post"],
		mutationFn: (values) => savePost(data?._id),
		onSuccess: (data) => {
			data.isSaved = true;
		},
		onError: (error) => {
			data.isSaved = false;
		},
	});

	const handleUnSavePost = useMutation({
		mutationKey: ["unsave-post"],
		mutationFn: (values) => unsavePost(data?._id),
		onSuccess: (data) => {
			data.isSaved = false;
		},
		onError: (error) => {
			data.isSaved = true;
		},
	});

	const handleSaving = (saved = false) => {
		if (saved) {
			data.isSaved = false;
			handleUnSavePost.mutate();
		} else {
			data.isSaved = true;
			handleSavePost.mutate();
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

	if (!data) {
		return <PostMobileSkeleton />;
	}

	return (
		<Card
			sx={{
				maxWidth: 470,
				width: "100%",
			}}
			elevation={0}
			ref={ref}
		>
			<CardHeader
				sx={{
					p: 1,
					".MuiCardHeader-title": { fontSize: "13px", fontWeight: "bold" },
					".MuiCardHeader-subheader": {
						fontSize: "11px",
					},
				}}
				avatar={
					<ProfileAvatar
						profile={data?.user?.avatar}
						userName={data?.user?.userName}
						sx={{ width: 36, height: 36 }}
						containerSx={{ padding: { xs: "2px" } }}
					/>
				}
				action={
					<IconButton
						aria-label="settings"
						onClick={() => setOpenOptions(true)}
					>
						<ReactIcons.MdMoreHoriz
							style={{ color: `${theme.palette.text.dark}` }}
						/>
					</IconButton>
				}
				title={
					<Box
						sx={{
							display: "flex",
							width: "100%",
							alignItems: "start",
							justifyContent: "start",
						}}
					>
						<Box
							sx={{
								width: "max-content",
								display: "flex",
								gap: "4px",
								alignItems: "center",
								justifyContent: "center",
								cursor: "pointer",
							}}
							onClick={() =>
								navigate(`/${RoutePath.PROFILE}/${data?.user?._id}`)
							}
						>
							<Typography variant="body">{data?.user?.userName}</Typography>
							<ImgWrapper sx={{ width: "0.8rem", height: "0.8rem" }}>
								<Image
									src={verifiedBadge}
									style={{
										display: "block",
										width: "100%",
										objectFit: "cover",
									}}
								/>
							</ImgWrapper>
							{data?.createdAt && !matchDownSm && (
								<>
									&#183;
									<Typography
										variant="p"
										sx={{
											color: theme.palette.grey[500],
											fontSize: "0.8rem",
											fontWeight: "normal",
										}}
									>
										{data?.createdAt}
									</Typography>
								</>
							)}
						</Box>
					</Box>
				}
				subheader={data?.location ? data?.location : "kozhikode"}
			/>
			{/* images sections */}
			<CardMedia
				sx={{ padding: 0, position: "relative" }}
				alt="Not Found"
				onDoubleClick={handleLike}
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
						exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.5 } }}
						transition={{ duration: 1.5 }}
					>
						<LikeSvg />
					</motion.div>
				))}
				<Slider controllButtons={false} sx={{ position: "relative" }}>
					{Array.isArray(data?.files) &&
						data?.files?.map((file, ind) => (
							<Slide key={ind} sx={{ position: "relative" }}>
								{file?.fileType === "image" && (
									<Image
										style={{
											display: "block",
											objectFit: "cover",
											width: "100%",
										}}
										alt="Not found!"
										key={file._id}
										src={file?.fileUrl}
										loading="lazy"
										draggable={false}
									/>
								)}
								{file?.fileType === "video" && (
									<Video
										controls
										loop
										key={file._id}
										src={file?.fileUrl}
										alt="Not Found!"
										style={{
											display: "block",
											objectFit: "cover",
											width: "100%",
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
			</CardMedia>
			{/* card actions */}
			<CardActions disableSpacing sx={{ p: 0 }}>
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
				{!data?.isHideLikes && data?.likes ? (
					<Typography variant="userName">{data?.likes}</Typography>
				) : null}
				{!data?.isDisableComment && (
					<>
						<IconButton
							aria-label="comment"
							onClick={
								matchDownSm
									? () => {
											dispatch(setCommentData(data._id));
											dispatch(handleCommentWindowOpen(true));
									  }
									: () =>
											navigate(`/${RoutePath.POST}/${data._id}`, {
												state: { previousLocation: location },
											})
							}
						>
							<ReactIcons.RiChat3Line
								style={{
									color: `${theme.palette.text.dark}`,
									fontSize: 25,
									transform: "scaleX(-1)",
								}}
							/>
						</IconButton>
						{data?.comments ? (
							<Typography variant="userName">{data?.comments}</Typography>
						) : null}
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
					checked={data?.isSaved}
					onChange={() => handleSaving(data?.isSaved)}
					icon={
						<ReactIcons.RiBookmarkLine
							style={{ color: `${theme.palette.text.dark}`, fontSize: 25 }}
						/>
					}
					checkedIcon={
						<ReactIcons.RiBookmarkFill
							style={{ color: `${theme.palette.text.dark}`, fontSize: 25 }}
						/>
					}
				/>
			</CardActions>
			{/* card content */}
			<CardContent
				sx={{
					p: "0rem 0.5rem",
					color: theme.palette.text.dark,
				}}
			>
				{/* like by */}
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<AvatarSet size={18} />
					<Typography variant="body" ml={0.5}>
						Liked by <Typography variant="userName">Hamdan</Typography> and{" "}
						<Typography variant="userName">Others</Typography>
					</Typography>
				</Box>
				<Box mt={0.4}>
					<p
						style={
							expanded
								? { fontSize: "0.80rem" }
								: { ...captionStyle, fontSize: "0.80rem" }
						}
						ref={captionRef}
					>
						<span
							style={{
								marginRight: "3px",
								fontWeight: 700,
								fontSize: "0.75rem",
							}}
						>
							{data?.user?.userName}
						</span>
						{data?.caption}
					</p>
				</Box>
				{showExpand &&
					(!expanded ? (
						<Typography
							variant="greyTags"
							sx={{ cursor: "pointer" }}
							onClick={handleExpandClick}
						>
							more
						</Typography>
					) : null)}
				<Box mt={0.2}>
					{/* view comment tag */}
					<Typography
						variant="greyTags"
						sx={{ cursor: "pointer" }}
						onClick={
							matchDownSm
								? () => {
										dispatch(setCommentData(data._id));
										dispatch(handleCommentWindowOpen(true));
								  }
								: () =>
										navigate(`/${RoutePath.POST}/${data._id}`, {
											state: { previousLocation: location },
										})
						}
					>
						View all {data?.comments ? data?.comments : null} comments
					</Typography>
				</Box>
				{matchDownSm && (
					<Box mt={0.2}>
						{data?.createdAt && (
							<Typography
								variant="p"
								sx={{
									color: theme.palette.grey[500],
									fontSize: "0.7rem",
									fontWeight: "normal",
								}}
							>
								{data?.createdAt}
							</Typography>
						)}
					</Box>
				)}
			</CardContent>
			{/* if divider is true */}
			{divider && !matchDownSm && <Divider sx={{ mt: 0.5 }} />}
			<PostOptionsWindow
				open={openOptions}
				onClose={() => setOpenOptions(false)}
				pId={data?._id}
				isHideLikes={data?.isHideLikes}
				isDisableComment={data?.isDisableComment}
				postUser={data?.user?._id}
			/>
		</Card>
	);
});

export default PostMobile;
