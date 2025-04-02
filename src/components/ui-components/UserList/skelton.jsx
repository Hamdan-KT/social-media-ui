import React from "react";
import {
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Skeleton,
} from "@mui/material";
import { FaLess } from "react-icons/fa6";

const UserListSkeleton = ({ count = 10, sx = {}, actionButton = false }) => {
	return (
		<List
			dense
			sx={{
				width: "100%",
				maxWidth: "100%",
				gap: "0.5rem",
				...sx,
			}}
		>
			{Array.from({ length: count }).map((_, index) => (
				<ListItem
					key={index}
					disablePadding
					sx={{
						display: "flex",
						alignItems: "center",
						padding: "0.5rem 0.5rem",
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
					{actionButton && (
						<Skeleton
							variant="rectangular"
							width={70}
							height={27}
							sx={{ borderRadius: 2 }}
						/>
					)}
				</ListItem>
			))}
		</List>
	);
};

export default UserListSkeleton;
