import { Box } from "@mui/material";
import React from "react";

function ImgWrapper({ children, sx = {} }) {
	return (
		<Box
			sx={{
				width: "2.4rem",
				height: "2.4rem",
				overflow: "hidden",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				...sx,
			}}
		>
			{children}
		</Box>
	);
}

export default ImgWrapper;
