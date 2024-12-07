import React from "react";
import "./index.css"; // Add the above CSS here
import { Box, useTheme } from "@mui/material";

const TypingIndicator = ({ isVisible }) => {
    const theme = useTheme()
	if (!isVisible) return null;

	return (
		<Box
			sx={{
                mt: 1,
				width: "max-content",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "0.5rem 0.7rem",
				background: theme.palette.grey[200],
                borderRadius: "20px"
			}}
		>
			<div className="typing-indicator">
				<span></span>
				<span></span>
				<span></span>
			</div>
		</Box>
	);
};

export default TypingIndicator;
