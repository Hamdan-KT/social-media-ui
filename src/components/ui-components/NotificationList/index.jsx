/* eslint-disable react/display-name */
import * as React from "react";
import List from "@mui/material/List";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import NotiListItem from "./NotiListItem";

function NotificationList({
	customButton,
	sx = {},
	onButtonClick = () => {},
	onClick,
	data = [],
	customButtonProps,
	actionButton = true,
}) {
	const theme = useTheme();
	const navigate = useNavigate();
	return (
		<List
			dense
			sx={{
				width: "100%",
				maxWidth: 400,
				bgcolor: theme.palette.background.default,
				gap: "0.5rem",
				...sx,
			}}
		>
			{data?.map((noti, index) => (
				<NotiListItem
					data={noti}
					type={noti?.type}
					primaryText={noti?.name}
					secondaryText={noti?.message}
					customButtonProps={customButtonProps}
					actionButton={actionButton}
					onClick={onClick}
					onButtonClick={onButtonClick}
					customButton={customButton}
				/>
			))}
		</List>
	);
}

export default NotificationList;
