import React, { useState, useEffect, useRef } from "react";
import { Box, IconButton, styled, useTheme, Zoom } from "@mui/material";
import "./index.css";
import Image from "src/components/common/Image";
import Story from "./Story";
import { generateStories } from "./dummy";

const CommonBox = styled("div")(({ theme }) => ({
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "auto",
}));

function Stories() {
	const [open, setOpen] = useState(true);
	const [activeSlide, setActiveSlide] = useState(2);
	const slidesRef = useRef([]);
	const [stories, setStories] = useState(generateStories() ?? []);

	const handleNext = () => {
		setActiveSlide((prev) => Math.min(stories.length - 1, prev + 1));
	};
	const handlePrev = () => {
		setActiveSlide((prev) => Math.max(0, prev - 1));
	};

	useEffect(() => {
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
				// slide.style.aspectRatio = "9/16";
				// slide.style.maxHeight = "95vh";
			});
		};

		updateSlides();
	}, [activeSlide]);

	return (
		<Zoom in={open} timeout={500}>
			<Box className="container">
				{stories?.map((story, index) => (
					<Story
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
			</Box>
		</Zoom>
	);
}

export default Stories;

// function Stories() {
// 	const [open, setOpen] = useState(true);
// 	const [activeFace, setActiveFace] = useState(0);

// 	const handleNext = () =>
// 		setActiveFace((prev) => (prev + 1) % imagesArr.length);
// 	const handlePrev = () =>
// 		setActiveFace((prev) => (prev - 1 + imagesArr.length) % imagesArr.length);

// 	// Inline styles for perspective and cube
// 	const perspectiveStyle = {
// 		perspective: "1000px",
// 		width: "auto",
// 		height: "auto",
// 	};

// 	const cubeStyle = {
// 		width: "300px", // Maintain 9:16 aspect ratio
// 		height: "600px",
// 		aspectRatio: "9/16",
// 		position: "relative",
// 		transformStyle: "preserve-3d",
// 		transition: "transform 0.5s ease-in-out",
// 		transform: `rotateY(${activeFace * -90}deg)`,
// 	};

// 	const faceStyle = {
// 		position: "absolute",
// 		width: "100%",
// 		height: "100%",
// 		backfaceVisibility: "hidden",
// 		display: "flex",
// 		alignItems: "center",
// 		justifyContent: "center",
// 		fontSize: "24px",
// 		fontWeight: "bold",
// 		color: "#fff",
// 		backgroundSize: "cover",
// 		backgroundPosition: "center",
// 		border: "1px solid white",
// 	};

// 	const faceTransforms = [
// 		{
// 			transform: "translateZ(150px)",
// 			//  backgroundColor: "red"
// 		}, // Front
// 		{
// 			transform: "rotateY(-270deg) translateX(150px)",
// 			transformOrigin: "100% 0",
// 			// backgroundColor: "green",
// 		}, // Right
// 		{
// 			transform: "translateZ(-150px) rotateY(180deg)",
// 			// backgroundColor: "blue",
// 		}, // Back
// 		{
// 			transform: "rotateY(270deg) translateX(-150px)",
// 			transformOrigin: "0 50%",
// 			// backgroundColor: "yellow",
// 		}, // Left
// 	];

// 	return (
// 		<Zoom in={open} timeout={500}>
// 			<Box
// 				sx={{
// 					backgroundColor: "#2b2424",
// 					width: "100%",
// 					height: "100vh",
// 					display: "flex",
// 					alignItems: "center",
// 					justifyContent: "center",
// 				}}
// 			>
// 				{/* Cube Section */}
// 				<div style={perspectiveStyle}>
// 					<div style={{ ...cubeStyle }}>
// 						{/* Faces */}
// 						{faceTransforms.map((transform, index) => (
// 							<div
// 								key={index}
// 								style={{
// 									...faceStyle,
// 									...transform,
// 									// backgroundImage: `url(${
// 									// 	imagesArr[(activeFace + index) % imagesArr.length]
// 									// })`,
// 								}}
// 							/>
// 						))}
// 					</div>
// 				</div>

// 				{/* Controls */}
// 				<div
// 					style={{ marginTop: "20px", position: "absolute", bottom: "50px" }}
// 				>
// 					<button
// 						onClick={handlePrev}
// 						style={{
// 							padding: "10px 20px",
// 							margin: "0 10px",
// 							backgroundColor: "#555",
// 							color: "#fff",
// 							border: "none",
// 							borderRadius: "5px",
// 							cursor: "pointer",
// 						}}
// 					>
// 						Previous
// 					</button>
// 					<button
// 						onClick={handleNext}
// 						style={{
// 							padding: "10px 20px",
// 							margin: "0 10px",
// 							backgroundColor: "#555",
// 							color: "#fff",
// 							border: "none",
// 							borderRadius: "5px",
// 							cursor: "pointer",
// 						}}
// 					>
// 						Next
// 					</button>
// 				</div>
// 			</Box>
// 		</Zoom>
// 	);
// }

// export default Stories;
