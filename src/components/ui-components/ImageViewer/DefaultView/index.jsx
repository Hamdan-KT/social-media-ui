import {
	Box,
	IconButton,
	styled,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Image from "components/common/Image";
import Video from "components/common/Video";

// Slide main Component
const Slider = styled(Box)({
	position: "relative",
	display: "flex",
	width: "100%",
	alignItems: "center",
	maxHeight: "100%",
	maxWidth: "100%",
	overflow: "hidden",
	padding: "0.5rem",
});

const MainBox = styled(Box)(({ theme }) => ({
	width: "100%",
	height: "100%",
	display: "flex",
	gap: "0.5rem",
	alignItems: "center",
	justifyContent: "center",
	flexDirection: "column",
}));

const SlideButton = styled(IconButton)(({ direction }) => ({
	display: "flex",
	padding: "0.1rem",
	borderRadius: "50%",
	backgroundColor: "rgba(202, 202, 202, 0.61)",
	position: "absolute",
	left: direction === "left" && 0,
	right: direction === "right" && 0,
	marginLeft: direction === "left" && "0.5rem",
	marginRight: direction === "right" && "0.5rem",
	"&:hover": {
		backgroundColor: "rgba(202, 202, 202, 0.719)",
	},
}));

// View Box
const ViewBox = styled(Box)({
	display: "flex",
	minWidth: "100%",
	height: "100%",
	maxHeight: "100%",
	alignItems: "center",
	justifyContent: "center",
});

// Image Selector
const ImageSelector = styled(Box)({
	display: "flex",
	width: "80%",
	height: "4rem",
	flexDirection: "row",
	overflow: "scroll",
	alignItems: "center",
	justifyContent: "center",
	gap: "0.3rem",
});

function DefaultImageView({ medias = [] }) {
	const [activeIndex, setActiveIndex] = useState(0);
	const theme = useTheme();
	const viewBoxRef = useRef();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	// function to handle Slide
	function handleSlideBtnClick(newIndex) {
		if (newIndex < 0) {
			newIndex = 0;
		} else if (newIndex >= medias?.length) {
			newIndex = medias?.length - 1;
		}
		setActiveIndex(newIndex);
	}
	return (
		<>
			{!matchDownSm && (
				<MainBox>
					<Slider>
						{Array.isArray(medias) &&
							medias?.map((media, ind) => (
								<ViewBox
									ref={viewBoxRef}
									key={ind}
									sx={{
										// transition: "0.5s ease",
										transform: `translate(-${activeIndex * 100}%)`,
									}}
								>
									{media?.type === "image" && (
										<Image
											src={media?.src}
											alt="Not Found"
											style={{
												display: "block",
												height: "100%",
												userSelect: "none",
												objectFit: "contain",
												borderRadius: "15px",
											}}
											loading="lazy"
											draggable={false}
										/>
									)}
									{media?.type === "video" && (
										<Video
											controls
											src={media?.src}
											alt="Not Found"
											style={{
												display: "block",
												height: "100%",
												userSelect: "none",
												objectFit: "contain",
												borderRadius: "15px",
											}}
											loading="lazy"
											draggable={false}
										/>
									)}
								</ViewBox>
							))}

						{/* slider buttons */}
						{Array.isArray(medias) && (
							<>
								{activeIndex > 0 && (
									<SlideButton
										direction="left"
										onClick={() => handleSlideBtnClick(activeIndex - 1)}
									>
										<ChevronLeftIcon />
									</SlideButton>
								)}
								{activeIndex < medias?.length - 1 && (
									<SlideButton
										direction="right"
										onClick={() => handleSlideBtnClick(activeIndex + 1)}
									>
										<ChevronRightIcon />
									</SlideButton>
								)}
							</>
						)}
					</Slider>

					{/* image selector */}
					{medias?.length > 1 && (
						<ImageSelector className="scrollbar-hide">
							{medias.map((media, ind) => (
								<Box
									key={ind}
									sx={{
										cursor: "pointer",
										width: activeIndex === ind ? "3rem" : "2.3rem",
										height: activeIndex === ind ? "3rem" : "2.3rem",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										maxWidth: activeIndex === ind ? "3rem" : "2.3rem",
										minWidth: activeIndex === ind ? "3rem" : "2.3rem",
										maxHeight: activeIndex === ind ? "3rem" : "2.3rem",
										overflow: "hidden",
										border:
											activeIndex === ind
												? `2px solid ${theme.palette.background.paper}`
												: "",
									}}
									onClick={() => {
										viewBoxRef.current.style.transition = "none";
										handleSlideBtnClick(ind);
									}}
								>
									<Image
										style={{
											display: "block",
											width: "100%",
											objectFit: "contain",
										}}
										src={media?.src}
									/>
								</Box>
							))}
						</ImageSelector>
					)}
				</MainBox>
			)}
		</>
	);
}

export default DefaultImageView;
