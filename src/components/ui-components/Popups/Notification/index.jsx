import React from "react";
import NotificationList from "../../NotificationList";
import { generateNotifications } from "src/data";
import { Box, Typography } from "@mui/material";

function NotificationPopUp() {
	return (
		<Box sx={{ display: "flex", width: "100%", flexDirection: "column" }}>
			<Typography variant="h2" p="0.5rem">
				Notifications
			</Typography>
			<NotificationList
				data={[...generateNotifications()]}
				actionButton
				secondaryText="message"
			/>
		</Box>
	);
}

export default NotificationPopUp;
