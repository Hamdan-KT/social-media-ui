import React from "react";
import {
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Skeleton,
} from "@mui/material";

const UserListSkeleton = ({ count = 10 }) => {
	return (
		<List
			dense
			sx={{
				width: "100%",
				maxWidth: 360,
				gap: "0.5rem",
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
					<Skeleton
						variant="rectangular"
						width={70}
						height={27}
						sx={{ borderRadius: 2 }}
					/>
				</ListItem>
			))}
		</List>
	);
};

export default UserListSkeleton;
