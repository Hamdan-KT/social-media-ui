import React from "react";
import {
	Box,
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	CardActions,
	Skeleton,
} from "@mui/material";

const PostMobileSkeleton = () => {
	return (
		<Card
			sx={{
				maxWidth: 470,
				width: "100%",
				boxShadow: "none",
				border: "1px solid #e0e0e0",
				borderRadius: "8px",
			}}
		>
			{/* Card Header Skeleton */}
			<CardHeader
				sx={{
					p: 1,
					".MuiCardHeader-avatar": { marginRight: 1 },
				}}
				avatar={<Skeleton variant="circular" width={36} height={36} />}
				title={
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<Skeleton variant="text" width="80px" height={16} />
						<Skeleton
							variant="circular"
							width={12}
							height={12}
							sx={{ ml: 0.5 }}
						/>
					</Box>
				}
				subheader={<Skeleton variant="text" width="50px" height={14} />}
			/>

			{/* Media Section Skeleton */}
			<CardMedia>
				<Skeleton
					variant="rectangular"
					sx={{ aspectRatio: 4 / 5, width: "100%", height: "auto" }}
					width="100%"
				/>
			</CardMedia>

			{/* Card Actions Skeleton */}
			<CardActions
				disableSpacing
				sx={{ p: 1, display: "flex", alignItems: "center" }}
			>
				<Skeleton variant="circular" width={28} height={28} />
				<Skeleton variant="text" width={30} height={16} sx={{ ml: 1 }} />
				<Skeleton variant="circular" width={28} height={28} sx={{ ml: 2 }} />
				<Skeleton variant="text" width={30} height={16} sx={{ ml: 1 }} />
				<Skeleton variant="circular" width={28} height={28} sx={{ ml: 2 }} />
				<Box sx={{ ml: "auto" }}>
					<Skeleton variant="circular" width={28} height={28} />
				</Box>
			</CardActions>

			{/* Card Content Skeleton */}
			<CardContent
				sx={{
					p: 1,
					"&:last-child": { pb: 1 },
				}}
			>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<Skeleton variant="circular" width={18} height={18} />
					<Skeleton variant="text" width={120} height={14} sx={{ ml: 1 }} />
				</Box>
				<Box sx={{ mt: 0.5 }}>
					<Skeleton variant="text" width="100%" height={14} />
					<Skeleton variant="text" width="80%" height={14} />
				</Box>
				<Box sx={{ mt: 0.5 }}>
					<Skeleton variant="text" width="50%" height={14} />
				</Box>
				<Box sx={{ mt: 0.5 }}>
					<Skeleton variant="text" width="30%" height={14} />
				</Box>
			</CardContent>
		</Card>
	);
};

export default PostMobileSkeleton;
