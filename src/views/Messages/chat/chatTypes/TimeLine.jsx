import { Box, Divider, Typography } from "@mui/material";
import React from "react";

function TimeLine({ chat }) {
	return (
		<Box
			sx={{
				width: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				gap: "0.5rem",
			}}
		>
			<Divider sx={{ width: "calc(100% / 2.2)" }} />
			<Typography variant="caption">{chat.time}</Typography>
			<Divider sx={{ width: "calc(100% / 2.5)" }} />
		</Box>
	);
}

export default TimeLine;
