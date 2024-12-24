import { Box, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import NewMessageHeader from "./NewMessageHeader";
import NewMessageListSection from "src/components/ui-components/Popups/NewMessage/ListSection";
import { useNavigate } from "react-router";
import { RoutePath } from "src/utils/routes";

function NewMessage() {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const navigate = useNavigate();

	useEffect(() => {
		return () => {
			if (!matchDownSm) {
				navigate(`${RoutePath.HOME}`);
			}
		};
	}, [matchDownSm]);

	return (
		<Box
			sx={{
				width: !matchDownSm ? 390 : "100%",
				height: "100%",
				overflowY: "scroll",
				borderRight: {
					xs: "none",
					sm: `1px solid ${theme.palette.grey[300]}`,
				},
				position: "relative",
			}}
			className="scrollbar-hide"
		>
			<NewMessageHeader title="New Message" />
			<NewMessageListSection />
		</Box>
	);
}

export default NewMessage;
