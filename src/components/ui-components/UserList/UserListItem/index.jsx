import React from "react";
import Btn from "components/common/Button";
import ProfileAvatar from "components/common/ProfileAvatar";
import {
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router";

function UserListItem({
	customButton,
	onButtonClick = () => {},
	onClick,
	data = {},
	urlPrefix,
	navigateId,
	primaryText,
	secondaryText,
	customButtonProps,
	actionButton = true,
	buttonState,
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
			secondaryAction={
				customButton ? (
					ModifiedCustomBtn
				) : actionButton ? (
					data[buttonState] ? (
						<Btn variant="outlined" onClick={() => onButtonClick(data)}>
							Following
						</Btn>
					) : (
						<Btn onClick={() => onButtonClick(data)}>Follow</Btn>
					)
				) : null
			}
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
						mr: actionButton || customButton ? 5 : 0,
					}}
					secondaryTypographyProps={{
						noWrap: true,
						fontSize: 12,
						mr: {
							xs: actionButton || customButton ? 9 : 0,
							sm: actionButton || customButton ? 6 : 0,
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

export default UserListItem;
