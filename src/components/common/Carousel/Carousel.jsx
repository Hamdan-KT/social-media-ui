/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import Pagination from "./Pagination";
import { Children } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, IconButton, styled } from "@mui/material";

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 3;
const DRAG_BUFFER = 30;

const SPRING_OPTIONS = {
	type: "tween",
	mass: 10,
	stiffness: 400,
	damping: 50,
};

// Slider Button
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
	top: "50%",
	transform: "translateY(-50%)",
	"&:hover": {
		backgroundColor: "rgba(202, 202, 202, 0.719)",
	},
}));

const Slider = ({
	children = [],
	auto = false,
	sx = {},
	pagination = true,
	controllButtons = true,
	currentIndex = 0,
	disableDrag = false,
	onSlideChange = () => {},
	...rest
}) => {
	const [activeIndex, setActiveIndex] = useState(currentIndex);
	const childrenArray = Children.toArray(children);
	const dragX = useMotionValue(0);

	// handle slide change function
	useEffect(() => {
		onSlideChange(activeIndex);
	}, [activeIndex]);

	// handling auto slide function
	useEffect(() => {
		const intervalRef = setInterval(() => {
			const x = dragX.get();
			if (auto) {
				if (x === 0) {
					setActiveIndex((pv) => {
						if (pv === childrenArray.length - 1) {
							return 0;
						}
						return pv + 1;
					});
				}
			}
		}, AUTO_DELAY);

		return () => clearInterval(intervalRef);
	}, [auto]);

	// handling drag
	const onDragEnd = () => {
		const x = dragX.get();
		if (x <= -DRAG_BUFFER && activeIndex < childrenArray.length - 1) {
			setActiveIndex((pv) => pv + 1);
		} else if (x >= DRAG_BUFFER && activeIndex > 0) {
			setActiveIndex((pv) => pv - 1);
		}
	};

	return (
		<Box
			sx={{
				position: "relative",
				overflow: "hidden",
				minHeight: "20vh",
				maxHeight: "100%",
				width: "100%",
				display: "flex",
				...sx,
			}}
			{...rest}
		>
			<motion.div
				style={{
					display: "flex",
					alignItems: "center",
					x: dragX,
					width: "100%",
					height: "auto",
				}}
				drag={disableDrag ? "" : "x"}
				dragConstraints={disableDrag ? {} : { left: 0, right: 0 }}
				animate={{
					translateX: `-${activeIndex * 100}%`,
				}}
				transition={SPRING_OPTIONS}
				onDragEnd={!disableDrag && onDragEnd}
			>
				{childrenArray}
			</motion.div>

			{/* slider buttons */}
			{Array.isArray(childrenArray) && controllButtons && (
				<>
					{activeIndex > 0 && (
						<SlideButton
							direction="left"
							onClick={() => {
								setActiveIndex((pv) => pv - 1);
							}}
						>
							<ChevronLeftIcon />
						</SlideButton>
					)}
					{activeIndex < childrenArray?.length - 1 && (
						<SlideButton
							direction="right"
							onClick={() => {
								setActiveIndex((pv) => pv + 1);
							}}
						>
							<ChevronRightIcon />
						</SlideButton>
					)}
				</>
			)}

			{/* ...... pagination ...... */}
			{pagination && (
				<Pagination
					activeIndex={activeIndex}
					setActiveIndex={setActiveIndex}
					slideLength={Number(childrenArray.length)}
				/>
			)}
		</Box>
	);
};

export default Slider;
