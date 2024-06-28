import React from "react";
import { notifications } from "src/data";
import { Box } from "@mui/material";
import NotificationList from "components/ui-components/NotificationList";
import NotificationHeader from "./NotificationHeader";

function Notifications() {
  return (
		<Box sx={{display: "flex", width: "100%", alignItems: "center", justifyContent: "center"}}>
			<NotificationHeader />
			<NotificationList
				sx={{ maxWidth: "100%", marginTop: { xs: "3rem", sm: 0 } }}
				data={notifications}
				actionButton
				secondaryText="message"
			/>
		</Box>
	);
}

export default Notifications;
