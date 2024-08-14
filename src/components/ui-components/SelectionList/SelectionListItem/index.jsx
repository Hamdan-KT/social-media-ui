import React, { useEffect } from "react";
import {
	Checkbox,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
} from "@mui/material";
import ProfileAvatar from "components/common/ProfileAvatar";
import ReactIcons from "utils/ReactIcons";

function SelectionListItem({
	onClick = () => {},
	data = {},
	primaryText,
	secondaryText,
	selection,
	setSelection,
	dataTag = "id",
	index,
}) {
	// handling selection
	const handleSelection = (checked = false) => {
		if (checked) {
			setSelection({
				...selection,
				[data[dataTag]]: checked,
			});
		} else {
			const updatedSelection = { ...selection };
			delete updatedSelection[data[dataTag]];
			setSelection(updatedSelection);
		}
	};

	useEffect(() => {
		console.log(selection);
	}, [selection]);

	return (
		<ListItem
			secondaryAction={
				<Checkbox
					onChange={(e) => handleSelection(e.target.checked)}
					checked={!!selection[data[dataTag]]}
					icon={<ReactIcons.FaRegCircle />}
					checkedIcon={<ReactIcons.FaCheckCircle />}
				/>
			}
			disablePadding
		>
			<ListItemButton
				onClick={() => {
					typeof onClick === "function" && onClick(data);
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
