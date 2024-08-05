import { Box } from "@mui/material";
import { motion, useMotionValue } from "framer-motion";
import React, { useEffect } from "react";

const SPRING_OPTIONS = {
	type: "tween",
	// mass: 3,
	// stiffness: 400,
	// damping: 50,
};

function DragBox({ children, sx = {}, direction = "x", onDragEnd = () => {}, disableDrag = false, ...props }) {
	const dragX = useMotionValue(0);

	return (
		<motion.div
			style={{
				display: "flex",
				width: "max-content",
				x: !disableDrag && dragX,
				...sx,
			}}
			drag= {!disableDrag && direction}
			dragConstraints={{
				left: 0,
				right: 0,
			}}
			transition={SPRING_OPTIONS}
			onDragEnd={onDragEnd}
		>
			{children}
		</motion.div>
	);
}

export default DragBox;
