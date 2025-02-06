import ReplyInput from "src/components/common/ReplyInput";
import { styled, useTheme } from "@mui/material";
import React from "react";

const CommonBox = styled("div")(({ theme }) => ({
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "auto",
}));

function StoryBottomBar({ story, sx }) {
	const theme = useTheme();
	return (
		<CommonBox
			sx={{
				flexDirection: "column",
				width: "100%",
				position: "absolute",
				bottom: 0,
				left: 0,
				right: 0,
				padding: "0.7rem",
				...sx
			}}
		>
			<ReplyInput placeholder={`Reply to ${story?.name} ...`} />
		</CommonBox>
	);
}

export default StoryBottomBar;
