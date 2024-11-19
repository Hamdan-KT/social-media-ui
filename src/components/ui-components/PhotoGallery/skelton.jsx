import React from "react";
import { Box, Grid, Skeleton, styled } from "@mui/material";

const StyledGallerySkeleton = styled(Box)(({ theme }) => ({
	display: "grid",
	gridTemplateColumns: "1fr 1fr 1fr",
	gap: "0.1rem",
	width: "100%",
	height: "100%",
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: theme.palette.background.default,
	padding: "0",
	[theme.breakpoints.down("sm")]: {
		gap: 0,
	},
}));

const MediaSkeleton = styled(Box)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	position: "relative",
	width: "100%",
	overflow: "hidden",
	height: "40vh",
	[theme.breakpoints.down("lg")]: {
		height: "15rem",
	},
	[theme.breakpoints.down("md")]: {
		height: "13rem",
	},
	[theme.breakpoints.down("sm")]: {
		height: "8rem",
	},
	cursor: "pointer",
	border: `1px solid ${theme.palette.grey[200]}`,
}));

const PhotoGallerySkeleton = ({ count = 9 }) => {
	return (
		<Grid container>
			<Grid item xs={12} md={12} sm={12} lg={12}>
				<StyledGallerySkeleton>
					{Array.from({ length: count }).map((_, index) => (
						<MediaSkeleton key={index}>
							<Skeleton
								variant="rectangular"
								width="100%"
								height="100%"
								animation="wave"
							/>
						</MediaSkeleton>
					))}
				</StyledGallerySkeleton>
			</Grid>
		</Grid>
	);
};

export default PhotoGallerySkeleton;
