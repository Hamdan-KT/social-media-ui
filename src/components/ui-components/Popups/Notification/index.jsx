import React from 'react'
import NotificationList from '../../NotificationList'
import { notifications } from "src/data";
import { Box, Typography } from '@mui/material';
import CommentList from '../../CommentList';

function NotificationPopUp() {
  return (
		<Box sx={{display: "flex", width: "100%", flexDirection: "column"}}>
			<Typography variant="h4">Notifications</Typography>
			<NotificationList
				data={notifications}
				actionButton
				secondaryText="message"
			/>
		</Box>
	);
}

export default NotificationPopUp