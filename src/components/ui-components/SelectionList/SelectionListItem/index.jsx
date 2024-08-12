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

function SelectionListItem({
	onClick,
	data = {},
	primaryText,
	secondaryText,
}) {

	return (
		<ListItem
			// secondaryAction={

			// }
			disablePadding
		>
			<ListItemButton
				onClick={() => {
					typeof onClick === "function" && onClick();
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
					}}
					secondaryTypographyProps={{
						noWrap: true,
						fontSize: 12,
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

export default SelectionListItem;
