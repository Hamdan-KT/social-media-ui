import React from "react";
import {
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Skeleton,
} from "@mui/material";

const MessageListSkeleton = ({ count = 10, sx ={} }) => {
	return (
		<List
			dense
			sx={{
				width: "100%",
				maxWidth: "100%",
				gap: "0.5rem",
				padding: "0.5rem",
				...sx
			}}
		>
			{Array.from({ length: count }).map((_, index) => (
				<ListItem
					key={index}
					disablePadding
					sx={{
						display: "flex",
						alignItems: "center",
						padding: "0.5rem 0",
					}}
				>
					<ListItemAvatar>
						<Skeleton variant="circular" width={46} height={46} />
					</ListItemAvatar>
					<ListItemText
						primary={
							<Skeleton
								variant="text"
								width={`${Math.random() * (70 - 50) + 50}%`} // Random width for variety
								height={20}
							/>
						}
						secondary={
							<Skeleton
								variant="text"
								width={`${Math.random() * (90 - 70) + 70}%`} // Random width for variety
								height={16}
							/>
						}
						sx={{ ml: 1 }}
					/>
				</ListItem>
			))}
		</List>
	);
};

export default MessageListSkeleton;
