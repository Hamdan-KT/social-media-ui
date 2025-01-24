import React, { useState, useEffect, useRef } from "react";
import { Box, useTheme, Zoom } from "@mui/material";
import "./index.css";

const imagesArr = [
	"https://images.pexels.com/photos/18816017/pexels-photo-18816017/free-photo-of-empty-highway-surrounded-by-trees-during-a-foggy-weather.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	"https://images.pexels.com/photos/18000249/pexels-photo-18000249/free-photo-of-a-photo-of-a-food-stand-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	"https://images.pexels.com/photos/13909946/pexels-photo-13909946.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	"https://images.pexels.com/photos/7873841/pexels-photo-7873841.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	"https://images.pexels.com/photos/18551704/pexels-photo-18551704/free-photo-of-man-and-woman-holding-hands-at-a-sea-beach.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	// "https://images.pexels.com/photos/18721030/pexels-photo-18721030/free-photo-of-church-tower-behind-trees.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	// "https://images.pexels.com/photos/15547144/pexels-photo-15547144/free-photo-of-a-snowy-mountain-with-trees-on-top.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	// "https://images.pexels.com/photos/18796548/pexels-photo-18796548/free-photo-of-way-of-water.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	// "https://images.pexels.com/photos/12389195/pexels-photo-12389195.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	// "https://images.pexels.com/photos/18854123/pexels-photo-18854123/free-photo-of-el-micalet-valencia.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	// "https://images.pexels.com/photos/15114678/pexels-photo-15114678/free-photo-of-photo-of-a-person-running-around-columns.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	// "https://images.pexels.com/photos/6981693/pexels-photo-6981693.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	// "https://images.pexels.com/photos/18693566/pexels-photo-18693566/free-photo-of-a-small-pagoda-on-a-lake-surrounded-by-trees.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	// "https://images.pexels.com/photos/18831203/pexels-photo-18831203/free-photo-of-view-of-mountains-under-a-cloudy-sky.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	// "https://images.pexels.com/photos/12229002/pexels-photo-12229002.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	// "https://images.pexels.com/photos/18091873/pexels-photo-18091873/free-photo-of-a-street-sign-that-says-valla-port.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	// "https://images.pexels.com/photos/18624946/pexels-photo-18624946/free-photo-of-model-posing-in-black-clothes-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	// "https://images.pexels.com/photos/18622543/pexels-photo-18622543/free-photo-of-go-home.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	// "https://images.pexels.com/photos/15030785/pexels-photo-15030785/free-photo-of-a-mountain-with-trees-and-grass-in-the-foreground.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	// "https://images.pexels.com/photos/18642137/pexels-photo-18642137/free-photo-of-train-on-track-near-buildings.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
	// "https://images.pexels.com/photos/18720682/pexels-photo-18720682/free-photo-of-girl-at-rural.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
];

const arrStyle = [
	{
		left: "calc(18%)",
	},
	{
		left: "calc(34%)",
	},
	{
		left: "calc(50%)",
	},
	{
		left: "calc(66%)",
	},
	{
		left: "calc(82%)",
	},
];

function Stories() {
	const [open, setOpen] = useState(true);
	const theme = useTheme();
	const [activeSlide, setActiveSlide] = useState(0);
	const [activeSlideDiamensions, setActiveSlideDiamensions] = useState(0);
	const activeSlideRef = useRef();
	const slideRef = useRef();

	const handleClickNext = () => {
		// let items = slideRef.current.querySelectorAll(".story");
		// slideRef.current.appendChild(items[0]);
		if (activeSlide === imagesArr.length - 1) {
			return;
		}
		setActiveSlide((prev) => prev + 1);
	};

	const handleClickPrev = () => {
		// let items = slideRef.current.querySelectorAll(".story");
		// slideRef.current.prepend(items[items.length - 1]);
		if (activeSlide === 0) {
			return;
		}
		setActiveSlide((prev) => prev - 1);
	};

	const width = Math.round((9 / 16) * 48);

	return (
		<Zoom in={open} timeout={500}>
			<Box className="container">
				<Box
					className="stories-container"
					sx={{ left: `${activeSlide * 50}%` }}
				>
					{imagesArr?.map((image, ind) => (
						<Box
							className={`story ${ind === activeSlide ? "active" : ""}`}
							key={ind}
							// sx={{
							// 	backgroundImage: `url(${image})`,
							// 	// left: activeSlide === ind ? `calc(50%)` : ``,
							// 	// height: ind !== activeSlide ? "calc(95vh / 2)" : "95vh"
							// }}
						>
							<img className="img" src={image} />
						</Box>
					))}
				</Box>
				<div className="btn-container">
					<button onClick={handleClickPrev}>prev</button>
					<button onClick={handleClickNext}>next</button>
				</div>
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
