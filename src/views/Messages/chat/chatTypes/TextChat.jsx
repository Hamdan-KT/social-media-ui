import DragBox from "components/common/DragBox";
import { Box, Typography, styled, useTheme } from "@mui/material";
import React from "react";
import ReactIcons from "utils/ReactIcons";

const ChatText = styled(Box)(({ theme, chat }) => ({
	display: "flex",
	maxWidth: "100%",
	alignItems: "center",
	justifyContent: "center",
	background: chat.incoming
		? theme.palette.grey[500]
		: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(94,4,167,0.6951155462184874) 0%, rgba(241,0,203,1) 100%)",
	padding: "0.5rem 0.8rem",
	borderRadius: chat.incoming ? "20px 20px 20px 0px" : "20px 20px 0px 20px",
}));

function TextChat({ chat }) {
	const theme = useTheme();
	return (
		<DragBox sx={{ maxWidth: "60%" }}>
			<ChatText chat={chat}>
				<Typography variant="body2" sx={{userSelect: "none"}} color={theme.palette.background.paper}>
					{chat.caption}
				</Typography>
			</ChatText>
		</DragBox>
	);
}

export default TextChat;
