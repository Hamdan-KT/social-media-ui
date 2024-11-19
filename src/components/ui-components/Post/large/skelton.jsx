import React from "react";
import {
	Box,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Skeleton,
	Typography,
	useTheme,
} from "@mui/material";

const commonStyle = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

function SkeletonPostLarge() {
	const theme = useTheme();

	return (
		<Box
			sx={{
				...commonStyle,
				height: "auto",
				width: { sm: "90vw", md: "77.9vw" },
				overflow: "hidden",
				position: "relative",
				background: theme.palette.common.white,
			}}
		>
			<Grid container sx={{ border: `1px solid ${theme.palette.grey[300]}` }}>
				{/* Media Section */}
				<Grid item sm={7} md={8} sx={{ position: "relative" }}>
					<Skeleton
						variant="rectangular"
						width="100%"
						height="92vh"
						sx={{ borderRadius: "4px" }}
					/>
				</Grid>

				{/* Info Section */}
				<Grid item sm={5} md={4}>
					<Box
						sx={{
							height: "100%",
							background: theme.palette.background.paper,
							borderLeft: `1px solid ${theme.palette.grey[300]}`,
						}}
					>
						{/* Header */}
						<Box
							sx={{
								...commonStyle,
								justifyContent: "start",
								gap: "0.5rem",
								p: 1.5,
								width: "100%",
								borderBottom: `1px solid ${theme.palette.grey[300]}`,
							}}
						>
							<Skeleton variant="circular" width={36} height={36} />
							<Box
								sx={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}
							>
								<Skeleton variant="text" width="100px" height={18} />
								<Skeleton variant="text" width="60px" height={14} />
							</Box>
						</Box>

						{/* Comments Section */}
						<Box
							className="scrollbar-hide"
							sx={{
								...commonStyle,
								height: { sm: "calc(50vh)", md: "calc(100vh - 18rem)" },
								padding: "0 0.2rem",
								width: "100%",
								overflowY: "scroll",
								flexDirection: "column",
								alignItems: "start",
								justifyContent: "start",
							}}
						>
							<List
								sx={{
									width: "100%",
									// ...sx,
								}}
							>
								{Array.from({ length: 10 }).map((_, index) => (
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
						</Box>

						{/* Post Info Section */}
						<Box
							sx={{
								...commonStyle,
								flexDirection: "column",
								borderTop: `1px solid ${theme.palette.grey[300]}`,
							}}
						>
							<Box
								sx={{
									...commonStyle,
									justifyContent: "start",
									gap: "1rem",
									width: "100%",
									padding: "0.5rem",
								}}
							>
								<Skeleton variant="rectangular" width={28} height={28} />
								<Skeleton variant="text" width="50px" height={20} />
								<Skeleton variant="rectangular" width={28} height={28} />
								<Skeleton variant="text" width="50px" height={20} />
								<Skeleton variant="rectangular" width={28} height={28} />
							</Box>
							<Box
								sx={{
									width: "100%",
									display: "flex",
									flexDirection: "column",
									padding: "0.8rem",
								}}
							>
								<Skeleton variant="text" width="90%" height={16} />
								<Skeleton variant="text" width="70%" height={14} />
							</Box>
						</Box>

						{/* Input Section */}
						<Box
							sx={{
								...commonStyle,
								flexDirection: "column",
								width: "100%",
								p: "0.5rem",
							}}
						>
							<Skeleton
								variant="rectangular"
								width="100%"
								height={40}
								sx={{ borderRadius: "20px" }}
							/>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}

export default SkeletonPostLarge;
