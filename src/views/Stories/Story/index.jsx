import { useMediaQuery } from "@mui/material";
import { IconButton, styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
// import required modules
import { EffectCube, Pagination } from "swiper/modules";
import { Box, useTheme, Zoom } from "@mui/material";
import StoryLG from "./StoryLg";
import StorySM from "./StorySm";

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
	const [activeSlide, setActiveSlide] = useState(2);
	const slidesRef = useRef([]);
	// const [stories, setStories] = useState(generateStories() ?? []);

	const handleNext = () => {
		setActiveSlide((prev) => Math.min(stories.length - 1, prev + 1));
	};
	const handlePrev = () => {
		setActiveSlide((prev) => Math.max(0, prev - 1));
	};

	useEffect(() => {
		if(!matchDownSm){
			const slides = slidesRef.current;
			if (!slides.length) return;

			const activeSlideWidth = 95 * (9 / 16);

			const updateSlides = () => {
				slides.forEach((slide, index) => {
					let offset = index - activeSlide;
					let translateX = `calc(${offset * activeSlideWidth}vh - 50%)`;
					let opacity = Math.abs(offset) > 2 ? 0 : 1;
					slide.style.height = index === activeSlide ? `95vh` : `48vh`;
					slide.style.transform = `translateX(${translateX})`;
					slide.style.opacity = opacity;
				});
			};

			updateSlides();
		}
	}, [activeSlide, matchDownSm]);

	return (
		<>
			{!matchDownSm ? (
				<>
					{stories?.map((story, index) => (
						<StoryLG
							key={index}
							story={story}
							ref={(el) => (slidesRef.current[index] = el)}
							isActive={index === activeSlide}
							handleNext={handleNext}
							handlePrev={handlePrev}
							onClick={() => setActiveSlide(index)}
							activeSlide={activeSlide}
							isStart={activeSlide === 0}
							isEnd={activeSlide === stories?.length - 1}
						/>
					))}
				</>
			) : (
				<Swiper effect={"cube"} grabCursor={true} modules={[EffectCube]}>
					{stories?.map((story, index) => (
						<SwiperSlide
							key={index}
							style={{
								background: theme.palette.common.black,
								height: "100vh",
								width: "100%",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<StorySM
								story={story}
								containerSx={{
									display: "flex",
									width: "100%",
									height: "97vh",
									transition: "0.3s ease-in-out",
									borderRadius: "10px",
								}}
								// ref={(el) => (slidesRef.current[index] = el)}
								isActive={true}
								// handleNext={handleNext}
								// handlePrev={handlePrev}
								// onClick={() => setActiveSlide(index)}
								// activeSlide={activeSlide}
								// isStart={activeSlide === 0}
								// isEnd={activeSlide === stories?.length - 1}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			)}
		</>
	);
}

export default Story;
