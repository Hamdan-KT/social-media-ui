import React from 'react';
import Btn from "components/common/Button";
import ProfileAvatar from "components/common/ProfileAvatar";
import {
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router";

function MessageListItem({
	customButton,
	onButtonClick = () => {},
	onClick,
	data = {},
	urlPrefix,
	navigateId,
	primaryText,
	secondaryText,
	actionButton = true,
	customButtonProps,
}) {
	const navigate = useNavigate();

	const ModifiedCustomBtn = React.Children.map(customButton, (child) =>
		React.cloneElement(child, {
			onClick: () => onButtonClick(data),
			...customButtonProps,
		})
	);
	return (
		<ListItem
			secondaryAction={actionButton ? ModifiedCustomBtn : null}
			disablePadding
		>
			<ListItemButton
				onClick={() => {
					typeof onClick === "function" && onClick();
					urlPrefix && navigateId && navigate(`${urlPrefix}/${navigateId}`);
				}}
			>
				<ListItemAvatar>
					<ProfileAvatar
						data={data}
						sx={{
							width: { xs: 43, sm: 46 },
							height: { xs: 43, sm: 46 },
						}}
						containerSx={{ padding: { xs: "2px", sm: "2px" }, mr: 1 }}
					/>
				</ListItemAvatar>
				<ListItemText
					primaryTypographyProps={{
						fontSize: 13,
						noWrap: true,
						fontWeight: "bold",
						mr: 5,
					}}
					secondaryTypographyProps={{
						noWrap: true,
						fontSize: 12,
						mr: {
							xs: 9,
							sm: 6,
						},
					}}
					primary={primaryText}
					secondary={
						secondaryText ??
						"followed by you and 40+ more.. followed by you and 40+ more.."
					}
				/>
			</ListItemButton>
		</ListItem>
	);
}

export default MessageListItem