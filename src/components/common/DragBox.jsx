import { Box } from "@mui/material";
import { motion, useMotionValue } from "framer-motion";
import React, { useState } from "react";

const SPRING_OPTIONS = {
	type: "tween",
};

function DragBox({
	children,
	sx = {},
	direction = "x",
	onDragEnd = () => {},
	disableDrag = false,
	dragLockDir = "",
	requiredDelta = 200,
	dragConstraints = {},
	...props
}) {
	const dragValue = useMotionValue(0);
	const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });

	const handleDragStart = (event, info) => {
		setStartPoint({ x: info.point.x, y: info.point.y });
	};

	const handleDragEnd = (event, info) => {
		const delta =
			direction === "x"
				? info.point.x - startPoint.x
				: info.point.y - startPoint.y;
		if (Math.abs(delta) >= requiredDelta) {
			if (dragLockDir === "right" && delta > 0) return;
			if (dragLockDir === "left" && delta < 0) return;
			if (dragLockDir === "top" && delta > 0) return;
			if (dragLockDir === "bottom" && delta < 0) return;
			onDragEnd(event, info);
		}
	};

	return (
		<motion.div
			style={{
				position:"relative",
				display: "flex",
				width: "max-content",
				x: !disableDrag && direction === "x" ? dragValue : 0,
				y: !disableDrag && direction === "y" ? dragValue : 0,
				...sx,
			}}
			drag={!disableDrag && direction}
			dragConstraints={{
				left: direction === "x" ? 0 : undefined,
				right: direction === "x" ? 0 : undefined,
				top: direction === "y" ? 0 : undefined,
				bottom: direction === "y" ? 0 : undefined,
				...dragConstraints,
			}}
			transition={SPRING_OPTIONS}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			{...props}
		>
			{children}
		</motion.div>
	);
}

export default DragBox;
