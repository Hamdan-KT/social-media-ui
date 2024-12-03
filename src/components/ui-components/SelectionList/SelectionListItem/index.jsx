import React, { forwardRef, useEffect } from "react";
import {
	Checkbox,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	useTheme,
} from "@mui/material";
import ProfileAvatar from "components/common/ProfileAvatar";
import ReactIcons from "utils/ReactIcons";

// eslint-disable-next-line react/display-name
const SelectionListItem = forwardRef(
	(
		{
			onClick = () => {},
			data = {},
			primaryText,
			secondaryText,
			selection,
			setSelection,
			dataTag = "_id",
			index,
			onChange = () => {},
		},
		ref
	) => {
		const theme = useTheme();

		useEffect(() => {
			console.log(selection);
		}, [selection]);

		return (
			<ListItem
				ref={ref}
				secondaryAction={
					<Checkbox
						onChange={() => onChange(data)}
						checked={!!selection[data[dataTag]]}
						icon={
							<ReactIcons.FaRegCircle
								size={23}
								style={{ color: theme.palette.grey[400] }}
							/>
						}
						checkedIcon={<ReactIcons.FaCheckCircle size={23} />}
					/>
				}
				dense
				disableGutters
				disablePadding
			>
				<ListItemButton
					onClick={() => {
						typeof onClick === "function" && onClick(data);
					}}
				>
					<ListItemAvatar>
						<ProfileAvatar
							profile={data?.avatar}
							userName={data?.userName}
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
);

export default SelectionListItem;
