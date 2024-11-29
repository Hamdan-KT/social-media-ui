import { Box, styled, useMediaQuery, useTheme } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "components/common/SearchInput";
import ScrollBox from "components/ui-components/Wrappers/ScrollBox";
import UserList from "components/ui-components/UserList";
import { Users } from "src/data";
import Video from "components/common/Video";
import Image from "components/common/Image";
import { useInView } from "react-intersection-observer";
import { getUsers } from "src/api/userAPI";
import { useInfiniteQuery } from "@tanstack/react-query";
import DefaultLoader from "src/components/common/DefaultLoader";
import { setTags } from "src/app/slices/postSlice/postSlice";

const StyledContainer = styled(Box)(({ theme }) => ({
	display: "flex",
	width: "22vw",
	height: "25vh",
	alignItems: "start",
	justifyContent: "start",
	padding: "0.5em",
	backgroundColor: theme.palette.background.default,
	position: "absolute",
	zIndex: 5,
	borderRadius: "10px",
	overflowY: "scroll",
	flexDirection: "column",
}));

function TagView({ media }) {
	const theme = useTheme();
	const dispatch = useDispatch();
	const postStates = useSelector((state) => state.post);
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const [value, setValue] = useState();
	const [tagPosition, setTagPosition] = useState();
	const [tagsArr, setTagsArr] = useState([]);
	const [openTagSearch, setOpenTagSearch] = useState(false);
	const containerRef = useRef(null);
	const searchContainerRef = useRef(null);
	const { ref, inView } = useInView();

	// Capture click position
	const handleImageClick = (e) => {
		setOpenTagSearch(true);
		const containerRect = containerRef.current?.getBoundingClientRect();
		const searchContainerRect =
			searchContainerRef.current?.getBoundingClientRect();
		const x = e.clientX - containerRect.left;
		const y = e.clientY - containerRect.top;
		const newX =
			x + searchContainerRect.width > containerRect.width
				? containerRect.width - searchContainerRect.width
				: x; // Adjust width overflow
		const newY =
			y + searchContainerRect.height > containerRect.height
				? containerRect.height - searchContainerRect.height
				: y; // Adjust height overflow

		console.log({ x: newX, y: newY });
		setTagPosition({ x: newX, y: newY });
	};

	// Handle tag selection
	const handleTagSelection = (data) => {
		console.log({ tagData: data });
		let updatedArr = [
			...tagsArr,
			{ ...tagPosition, name: data?.name, user: data?._id },
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
				tags: updatedArr?.map((tag) => ({
					x: tag?.x,
					y: tag?.y,
					user: tag?.user,
				})),
			})
		);
		setOpenTagSearch(false);
		setTagPosition(null);
	};

	// Close search container on click outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				searchContainerRef.current &&
				!searchContainerRef.current.contains(event.target) &&
				!containerRef.current.contains(event.target)
			) {
				setOpenTagSearch(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [searchContainerRef, containerRef]);

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
		<Box
			sx={{
				display: "flex",
				width: "auto",
				alignItems: "center",
				justifyContent: "center",
				height: "100%",
				position: "relative",
			}}
			ref={containerRef}
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
							}%) saturate(${media?.customFilters?.Saturation ?? 100}%)`,
					}}
				/>
			)}
			{media?.type === "video" && (
				<Video
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
							}%) saturate(${media?.customFilters?.Saturation ?? 100}%)`,
					}}
				/>
			)}
			{openTagSearch && (
				<StyledContainer
					ref={searchContainerRef}
					sx={{ left: tagPosition?.x, top: tagPosition?.y }}
					className="scrollbar-hide"
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
				</StyledContainer>
			)}
		</Box>
	);
}

export default TagView;
