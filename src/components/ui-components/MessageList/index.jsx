/* eslint-disable react/display-name */
import * as React from "react";
import List from "@mui/material/List";
import { useTheme } from "@mui/material/styles";
import MessageListItem from "./MessageListItem";
import MessageListSkeleton from "./skelton";

const MessageList = React.forwardRef(
	(
		{
			sx = {},
			skeltonSx = {},
			customButton,
			onButtonClick = () => {},
			onClick,
			isLoading = false,
			data = [],
			primaryText,
			secondaryText,
			customButtonProps,
			actionButton = false,
		},
		ref
	) => {
		const theme = useTheme();

		if (!isLoading && data?.length === 0) {
			return null;
		}

		if (isLoading || !data) {
			return <MessageListSkeleton sx={skeltonSx} />;
		}

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
				{data?.map((chat, index) => (
					<MessageListItem
						key={chat?._id ?? index}
						ref={index === data.length - 1 ? ref : undefined}
						data={chat}
						// urlPrefix={"/messages"}
						// navigateId={chat?._id}
						primaryText={
							chat?.isGroupChat ? chat?.groupName : chat?.receiver?.userName
						}
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
);
export default MessageList;
