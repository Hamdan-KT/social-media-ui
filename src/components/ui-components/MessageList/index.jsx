/* eslint-disable react/display-name */
import * as React from "react";
import List from "@mui/material/List";
import { useTheme } from "@mui/material/styles";
import MessageListItem from "./MessageListItem";

function MessageList({
	customButton,
	sx = {},
	onButtonClick = () => {},
	onClick,
	data = [],
	customButtonProps,
	actionButton = false,
}) {
	const theme = useTheme();

	React.useEffect(() => {
		console.log("re-rendering... list")
	}, []);

	return (
		<List
			dense
			sx={{
				width: "100%",
				maxWidth: 360,
				bgcolor: theme.palette.background.default,
				gap: "0.5rem",
				...sx,
			}}
		>
			{data?.map((msgUser, index) => (
				<MessageListItem
					data={msgUser}
					urlPrefix={"/messages"}
					navigateId={msgUser?.id}
					primaryText={msgUser?.name}
					// secondaryText={secondaryText}
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

export default React.memo(MessageList);
