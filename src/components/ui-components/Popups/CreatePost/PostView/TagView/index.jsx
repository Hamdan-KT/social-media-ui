import MobileSearchBar from "components/ui-components/MobileSearchBar/MobileSearchBar";
import {
	Box,
	Typography,
	styled,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
}));

function TagView({ media }) {
	const theme = useTheme();
	const dispatch = useDispatch();
	const postStates = useSelector((state) => state.post);
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const [tagPosition, setTagPosition] = useState(null);
	const [tags, setTags] = useState([]);
	const [openTagSearch, setOpenTagSearch] = useState(false);
	const containerRef = useRef(null);
	const searchContainerRef = useRef(null);

	// Capture click position
	const handleImageClick = (e) => {
		setOpenTagSearch(true);
		const containerRect = containerRef.current.getBoundingClientRect();
		const searchContainerRect =
			searchContainerRef.current.getBoundingClientRect();
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

		setTagPosition({ x: newX, y: newY });
	};

	// Handle tag selection
	const handleTagSelection = (name) => {
		setTags([...tags, { ...tagPosition, name }]);
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
				<img
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
						scale: `${media.flip?.x} ${media.flip?.y}`,
						filter:
							media.filterClassName === "" &&
							`brightness(${media.customFilters?.Brightness}%) saturate(${media.customFilters?.Saturation}%)`,
					}}
				/>
			)}
			{media?.type === "video" && (
				<video
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
						scale: `${media.flip?.x} ${media.flip?.y}`,
						filter:
							media.filterClassName === "" &&
							`brightness(${media.customFilters?.Brightness}%) saturate(${media.customFilters?.Saturation}%)`,
					}}
				/>
			)}
			{openTagSearch && (
				<StyledContainer
					ref={searchContainerRef}
					sx={{ left: tagPosition?.x, top: tagPosition?.y }}
					className="scrollbar-hide"
				>
					<MobileSearchBar
						inputProps={{ placeholder: "Search People to Tag..." }}
						listWrapperStyle={{height: "19vh"}}
					/>
				</StyledContainer>
			)}
		</Box>
	);
}

export default TagView;
