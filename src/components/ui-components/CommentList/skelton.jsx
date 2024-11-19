import React from "react";
import {
	Box,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Skeleton,
} from "@mui/material";

const CommentListSkeleton = ({ count = 10, sx = {} }) => {
	return (
		<List
			sx={{
				width: "100%",
				...sx,
			}}
		>
			{Array.from({ length: count }).map((_, index) => (
				<ListItem
					key={index}
					alignItems="flex-start"
					sx={{ padding: "0.9rem 0.5rem" }}
				>
					<ListItemAvatar>
						<Skeleton variant="circular" width={40} height={40} />
					</ListItemAvatar>
					<ListItemText
						primary={
							<Skeleton
								variant="text"
								width={`${Math.random() * (70 - 50) + 50}%`} // Random width for variety
							/>
						}
						secondary={
							<>
								<Skeleton
									variant="text"
									width={`${Math.random() * (90 - 70) + 70}%`} // Random width for variety
								/>
								<Skeleton
									variant="text"
									width={`${Math.random() * (50 - 30) + 30}%`} // Random width for variety
								/>
							</>
						}
					/>
				</ListItem>
			))}
		</List>
	);
};

export default CommentListSkeleton;
