import { Box, styled } from "@mui/material";
import React from "react";

const StyledScrollBox = styled(Box)(({ theme }) => ({
	display: "flex",
	width: "100%",
	justifyContent: "start",
	height: "calc(100vh - 6.6rem)",
	alignItems: "flex-start",
	overflowY: "scroll",
	scrollBehavior: "smooth",
}));

function ScrollBox({ children, sx = {} }) {
	return (
		<StyledScrollBox sx={sx} className="scrollbar-hide">
			{children}
		</StyledScrollBox>
	);
}

export default ScrollBox;
