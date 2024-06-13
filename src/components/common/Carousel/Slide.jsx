import React from "react";
import { motion } from "framer-motion";

const SPRING_OPTIONS = {
	type: "spring",
	mass: 3,
	stiffness: 400,
	damping: 50,
};

function Slide({ children, sx = {} }) {
	return (
		<motion.div
			style={{
				// flex: "none",
				display: "flex",
				// padding: "0.5rem",
				gap: "0.5rem",
				minWidth: "100%",
				maxWidth: "100%",
				alignItems: "center",
				// justifyContent: "center",
				height: "max-content",
				// maxHeight: "100%"
				...sx,
			}}
			transition={SPRING_OPTIONS}
		>
			{children}
		</motion.div>
	);
}

export default Slide;
