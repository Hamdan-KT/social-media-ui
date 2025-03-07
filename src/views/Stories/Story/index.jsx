import { useMediaQuery } from "@mui/material";
import { IconButton, styled } from "@mui/material";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import "swiper/css/virtual";
// import required modules
import { EffectCube, Pagination, Virtual } from "swiper/modules";
import { Box, useTheme, Zoom } from "@mui/material";
import StoryLG from "./StoryLg";
import StorySM from "./StorySm";
import { useParams } from "react-router";

const CommonBox = styled("div")(({ theme }) => ({
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "auto",
}));

function Story({ stories = [] }) {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const [activeSlide, setActiveSlide] = useState(null);
	const slidesRef = useRef([]);
	const swiperRef = useRef(null);
	const { uId } = useParams();

	// find user story based on uId from stories
	useLayoutEffect(() => {
		const userStoryIndex = stories?.findIndex((item) => item?._id === uId);
		if (!matchDownSm) {
			setActiveSlide(userStoryIndex);
		} else {
			if (swiperRef.current) {
				swiperRef.current?.slideTo(userStoryIndex, 0, false);
			}
		}
	}, [uId]);

	const handleNext = () => {
		setActiveSlide((prev) => Math.min(stories.length - 1, prev + 1));
	};
	const handlePrev = () => {
		setActiveSlide((prev) => Math.max(0, prev - 1));
	};

	useLayoutEffect(() => {
		if (!matchDownSm) {
			const slides = slidesRef.current;
			if (!slides.length) return;
			const activeSlideWidth = 95 * (9 / 16);
			const updateSlides = () => {
				slides.forEach((slide, index) => {
					if (!slide) return;
					let offset = index - activeSlide;
					let translateX = `calc(${offset * activeSlideWidth}vh - 50%)`;
					slide.style.height = index === activeSlide ? `95vh` : `48vh`;
					slide.style.transform = `translateX(${translateX})`;
				});
			};
			updateSlides();
		}
	}, [activeSlide, matchDownSm]);

	return (
		<>
			{!matchDownSm ? (
				<>
					{stories
						?.slice(Math.max(0, activeSlide - 2), activeSlide + 3)
						.map((story, index) => {
							const actualIndex = Math.max(0, activeSlide - 2) + index;
							return (
								<StoryLG
									key={actualIndex}
									story={story}
									ref={(el) => (slidesRef.current[actualIndex] = el)}
									isActive={actualIndex === activeSlide}
									handleNext={handleNext}
									handlePrev={handlePrev}
									activeSlide={activeSlide}
									onClick={() => setActiveSlide(actualIndex)}
									isStart={activeSlide === 0}
									isEnd={activeSlide === stories?.length - 1}
								/>
							);
						})}
				</>
			) : (
				<Swiper
					effect={"cube"}
					grabCursor={true}
					modules={[EffectCube, Virtual]}
					cubeEffect={{
						shadow: true,
						slideShadows: true,
						shadowOffset: 20,
						shadowScale: 0.94,
					}}
					onSwiper={(swiper) => (swiperRef.current = swiper)}
					virtual
				>
					{stories?.map((story, index) => (
						<SwiperSlide
							key={index}
							virtualIndex={index}
							style={{
								background: theme.palette.common.black,
								height: "100vh",
								width: "100%",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							{({ isActive }) => (
								<StorySM
									story={story}
									containerSx={{
										display: "flex",
										width: "100%",
										height: "100vh",
										transition: "0.3s ease-in-out",
										borderRadius: "10px",
									}}
									isActive={isActive}
									handleNext={handleNext}
									handlePrev={handlePrev}
								/>
							)}
						</SwiperSlide>
					))}
				</Swiper>
			)}
		</>
	);
}

export default Story;
