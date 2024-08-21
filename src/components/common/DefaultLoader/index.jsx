import React from "react";
import "./index.css";
import { Box } from "@mui/material";

function DefaultLoader({ sx = {}, barCount = 12, size = 30 }) {
	const loaderStyle = {
		color: "currentColor",
		display: "inline-block",
		position: "relative",
		width: `${size}px`,
		height: `${size}px`,
	};

	const divChildStyle = {
		transformOrigin: `${size / 2}px ${size / 2}px`,
		animation: "lds-spinner 1.2s linear infinite",
	};

	const divAfterStyle = {
		content: " ",
		display: "block",
		position: "absolute",
		top: `${size * 0.04}px`,
		left: `${size * 0.46}px`,
		width: `${size * 0.08}px`,
		height: `${size * 0.22}px`,
		borderRadius: "20%",
		backgroundColor: "currentColor",
	};

	return (
		<Box style={{ ...loaderStyle, ...sx }}>
			{[...Array(barCount)].map((_, i) => (
				<Box
					key={i}
					style={{
						...divChildStyle,
						transform: `rotate(${i * 30}deg)`,
						animationDelay: `${-1.1 + i * 0.1}s`,
					}}
				>
					<Box style={divAfterStyle}></Box>
				</Box>
			))}
		</Box>
	);
}

export default DefaultLoader;
