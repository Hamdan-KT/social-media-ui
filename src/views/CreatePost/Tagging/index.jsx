/* eslint-disable react-hooks/exhaustive-deps */
import Slider from "components/common/Carousel/Carousel";
import Slide from "components/common/Carousel/Slide";
import {
	Box,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	Toolbar,
	Typography,
	styled,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ReactIcons from "utils/ReactIcons";
import { useDispatch, useSelector } from "react-redux";
import { setActivePost } from "app/slices/postSlice/postSlice";
import { useNavigate } from "react-router";
import { RoutePath } from "utils/routes";
import Image from "components/common/Image";
import Video from "components/common/Video";
import BottomSheet from "src/components/common/BottomSheet";
import SearchInput from "src/components/common/SearchInput";
import ScrollBox from "src/components/ui-components/Wrappers/ScrollBox";
import UserList from "src/components/ui-components/UserList";
import { getUsers } from "src/api/userAPI";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { setTags } from "src/app/slices/postSlice/postSlice";
import DefaultLoader from "src/components/common/DefaultLoader";
import ProfileAvatar from "src/components/common/ProfileAvatar";

const MainBox = styled(Box)(({ theme }) => ({
	width: "100%",
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	position: "relative",
	flexDirection: "column",
	background: theme.palette.background.paper,
}));

const StyledToolBar = styled(Toolbar)(({ theme }) => ({
	display: "flex",
	width: "100%",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "0.2em",
	backgroundColor: theme.palette.background.default,
	position: "fixed",
	zIndex: 7,
	top: 0,
	left: 0,
	borderBottom: `1px solid ${theme.palette.grey[400]}`,
}));

function PostTaggingMobile() {
	const theme = useTheme();
	const dispatch = useDispatch();
	const postStates = useSelector((state) => state.post);
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const [tagSearchOpen, setTagSearchOpen] = useState(null);
	const [tagPosition, setTagPosition] = useState(null);
	const [tagsArr, setTagsArr] = useState([]);
	const [value, setValue] = useState("");
	const { ref, inView } = useInView();

	const navigate = useNavigate();
	// test useEffect
	useEffect(() => {
		console.log(postStates.activePost?.crop);
		console.log(postStates.activePost);
	}, [postStates.activePost?.flip, postStates.activePost]);

	// handle post slide view change to get current item to manage values for each one
	const onSlideChange = (activeIndex) => {
		setTagsArr([]);
		dispatch(setActivePost(postStates.postMedias[activeIndex]));
	};

	// Capture click position
	const handleImageClick = (e) => {
		setTagSearchOpen(true);
		const rect = e.target.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		console.log({ x, y });
		setTagPosition({ x, y });
	};

	// Handle tag selection
	const handleTagSelection = (data) => {
		console.log({ tagData: data });
		let updatedArr = [
			...tagsArr,
			{
				...tagPosition,
				userName: data?.userName,
				avatar: data?.avatar,
				user: data?._id,
			},
		].filter(
			(
				(seen) => (item) =>
					!seen.has(item.user) && seen.add(item.user)
			)(new Set())
		);
		console.log({ updatedArr });
		setTagsArr(updatedArr);
		dispatch(
			setTags({
				tags: updatedArr,
			})
		);
		setTagSearchOpen(false);
		setTagPosition(null);
	};

	//handle remove tag selection
	const handleRemoveTaggedUser = (userId) => {
		console.log({ userId });
		let updatedArr = postStates.activePost?.tags?.filter(
			(item) => item?.user !== userId
		);
		console.log({ updatedArr });
		setTagsArr(updatedArr);
		dispatch(
			setTags({
				tags: updatedArr,
			})
		);
	};

	const {
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isSuccess,
		isFetching,
		data,
	} = useInfiniteQuery({
		queryKey: ["get-tagging-users"],
		queryFn: ({ pageParam = 1 }) => getUsers({}, pageParam, 10),
		initialPageParam: 1,
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

	useEffect(() => {
		console.log({ users: data });
	}, [data]);

	return (
		<>
			<MainBox>
				{matchDownSm && (
					<StyledToolBar>
						<Typography variant="h4" ml="39%">
							Tag People
						</Typography>
						<Typography
							variant="body"
							sx={{
								cursor: "pointer",
								padding: "0 0.3rem",
								fontWeight: 600,
								"&:hover": { color: theme.palette.text.primary },
							}}
							color={theme.palette.primary.main}
							onClick={() => navigate(-1)}
						>
							Done
						</Typography>
					</StyledToolBar>
				)}
				<Slider
					sx={{
						width: "100%",
						height: "auto",
						marginTop: 6,
					}}
					onSlideChange={onSlideChange}
				>
					{Array.isArray(postStates.postMedias) &&
						postStates.postMedias?.map((media, ind) => (
							<Slide
								key={media.uID}
								sx={{
									width: "100%",
									height: "100%",
									display: "flex",
									gap: "0.5rem",
									alignItems: "center",
									justifyContent: "center",
									position: "relative",
									overflow: "hidden",
								}}
							>
								{media?.type === "image" && (
									<Image
										onClick={handleImageClick}
										loading="lazy"
										draggable={false}
										src={media?.croppedUrl}
										className={media.filterClassName}
										style={{
											display: "block",
											height: "100%",
											width: "100%",
											objectFit: "contain",
											filter:
												media.filterClassName === "" &&
												`brightness(${
													media?.customFilters?.Brightness ?? 100
												}%) contrast(${
													media?.customFilters?.Contrast ?? 100
												}%) saturate(${
													media?.customFilters?.Saturation ?? 100
												}%)`,
										}}
									/>
								)}
								{media?.type === "video" && (
									<Video
										onClick={() => handleImageClick}
										loading="lazy"
										draggable={false}
										src={media?.croppedUrl}
										className={media.filterClassName}
										style={{
											display: "block",
											height: "100%",
											width: "100%",
											objectFit: "contain",
											filter:
												media.filterClassName === "" &&
												`brightness(${
													media?.customFilters?.Brightness ?? 100
												}%) contrast(${
													media?.customFilters?.Contrast ?? 100
												}%) saturate(${
													media?.customFilters?.Saturation ?? 100
												}%)`,
										}}
									/>
								)}
							</Slide>
						))}
				</Slider>
				<MainBox>
					<List
						dense
						sx={{
							width: "100%",
							maxWidth: "100%",
							bgcolor: theme.palette.background.default,
							gap: "0.5rem",
						}}
					>
						{postStates.activePost?.tags?.map((taggedUser, index) => (
							<ListItem
								key={index}
								secondaryAction={
									<IconButton
										size="large"
										sx={{ padding: 0 }}
										color="inherit"
										onClick={() => handleRemoveTaggedUser(taggedUser?.user)}
									>
										<ReactIcons.IoClose
											style={{ fontSize: "1.2rem", cursor: "pointer" }}
										/>
									</IconButton>
								}
								disablePadding
							>
								<ListItemButton>
									<ListItemAvatar>
										<ProfileAvatar
											profile={taggedUser?.avatar}
											userName={taggedUser?.userName}
											sx={{
												width: { xs: 43, sm: 46 },
												height: { xs: 43, sm: 46 },
											}}
											containerSx={{ padding: { xs: "2px", sm: "2px" }, mr: 1 }}
										/>
									</ListItemAvatar>
									<ListItemText
										primaryTypographyProps={{
											fontSize: 13,
											noWrap: true,
											fontWeight: "bold",
											mr: 5,
										}}
										secondaryTypographyProps={{
											noWrap: true,
											fontSize: 12,
											mr: {
												xs: 9,
												sm: 6,
											},
										}}
										primary={taggedUser?.userName}
									/>
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</MainBox>
			</MainBox>
			{/* tage search */}
			<BottomSheet
				title="Search Peoples"
				open={tagSearchOpen}
				onClose={() => setTagSearchOpen(false)}
				sheetBodyStyles={{ position: "relative" }}
			>
				<Box
					sx={{
						width: "100%",
						position: "sticky",
						left: 0,
						top: 0,
						p: 0.5,
						zIndex: 7,
						background: theme.palette.background.paper,
					}}
				>
					<SearchInput value={value} setValue={setValue} />
				</Box>
				<Grid container>
					<Box
						sx={{
							display: "flex",
							padding: "0.3rem",
							width: "100%",
							height: "auto",
						}}
					>
						{matchDownSm && (
							<Grid item xs={12} position="relative">
								<ScrollBox
									sx={{
										mt: 0,
										height: "max-content",
										justifyContent: "start",
										flexDirection: "column",
									}}
								>
									<UserList
										sx={{ maxWidth: "100%" }}
										data={data}
										ref={ref}
										profileNavigation={false}
										onClick={handleTagSelection}
									/>
									{isFetchingNextPage && (
										<Box
											sx={{
												width: "100%",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
											}}
										>
											<DefaultLoader />
										</Box>
									)}
								</ScrollBox>
							</Grid>
						)}
					</Box>
				</Grid>
			</BottomSheet>
		</>
	);
}

export default PostTaggingMobile;
