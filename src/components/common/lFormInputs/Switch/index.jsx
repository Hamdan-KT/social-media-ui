import { Switch, styled } from "@mui/material";
import React from "react";

const IOSSwitch = styled(({ size, ...props }) => (
	<Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme, size = 28 }) => {
	// Use size to scale all dimensions
	const trackHeight = size * 0.8;
	const trackWidth = size * 1.35;
	const thumbSize = size * 0.6;
	const translateX = size * 0.55;

	return {
		width: trackWidth,
		height: trackHeight,
		padding: 0,
		"& .MuiSwitch-switchBase": {
			padding: 0,
			margin: size * 0.1,
			transitionDuration: "300ms",
			"&.Mui-checked": {
				transform: `translateX(${translateX}px)`,
				color: "#fff",
				"& + .MuiSwitch-track": {
					backgroundColor:
						theme.palette.mode === "dark"
							? "#2ECA45"
							: theme.palette.primary.main,
					opacity: 1,
					border: 0,
				},
				"&.Mui-disabled + .MuiSwitch-track": {
					opacity: 0.5,
				},
			},
			"&.Mui-focusVisible .MuiSwitch-thumb": {
				color: "#33cf4d",
				border: `${size * 0.3}px solid #fff`,
			},
			"&.Mui-disabled .MuiSwitch-thumb": {
				color:
					theme.palette.mode === "light"
						? theme.palette.grey[100]
						: theme.palette.grey[600],
			},
			"&.Mui-disabled + .MuiSwitch-track": {
				opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
			},
		},
		"& .MuiSwitch-thumb": {
			boxSizing: "border-box",
			width: thumbSize,
			height: thumbSize,
		},
		"& .MuiSwitch-track": {
			borderRadius: trackHeight / 2,
			backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
			opacity: 1,
			transition: theme.transitions.create(["background-color"], {
				duration: 500,
			}),
		},
	};
});

function MUISwitch({ size, ...props }) {
	// Do not pass size prop directly to the Switch component from MUI to avoid conflicts
	return <IOSSwitch size={size} {...props} />;
}

export default MUISwitch;
