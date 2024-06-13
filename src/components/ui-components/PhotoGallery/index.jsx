import * as React from "react";
import {
  Box,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MovieIcon from "@mui/icons-material/Movie";
import BurstModeIcon from "@mui/icons-material/BurstMode";

// user post
import { explorePosts } from "../../../data";

const StyledGallery = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "0.2rem",
  width: "100%",
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.background.default,
  padding: "0",
}));

const MediaDiv = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  width: "100%",
  overflow: "hidden",
  maxHeight: "40vh",
  [theme.breakpoints.down("lg")]: {
	height: "15rem",
  },
  [theme.breakpoints.down("md")]: {
    height: "13rem",
  },
  [theme.breakpoints.down("sm")]: {
    height: "8rem",
  },
  "&:hover .HoverDiv": {
    display: "flex",
  },
  cursor: "pointer",
}));

const HoverDiv = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  position: "absolute",
  gap: "2rem",
  top: 0,
  left: 0,
  userSelect: "none",
  zIndex: 5,
}));

const StyledMediaTag = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "auto",
  height: "auto",
  position: "absolute",
  top: 8,
  right: 8,
  userSelect: "none",
  zIndex: 4,
}));

const defaultStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  gap: "0.4rem",
  userSelect: "none",
};

function PhotoGallery() {
  const theme = useTheme();
  const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
		<Grid container>
			<Grid item xs={12} md={12} sm={12} lg={12}>
				<StyledGallery>
						{explorePosts.map((post, index) => (
							<MediaDiv key={index}>
								{post.media[0]?.type === "image" ? (
									<img
										src={post.media[0]?.src}
										alt="Not Found!"
										style={{
											display: "block",
											height: "100%",
											objectPosition: "center",
											objectFit: "cover",
											width: "100%",
											userSelect: "none",
										}}
										loading="lazy"
									/>
								) : (
									<video
										src={post.media[0]?.src}
										alt="Not Found!"
										style={{
											display: "block",
											height: "100%",
											objectPosition: "center",
											objectFit: "cover",
											width: "100%",
											userSelect: "none",
										}}
										loading="lazy"
									/>
								)}
								{!matchDownSm && (
									<HoverDiv className="HoverDiv">
										<Box sx={defaultStyle}>
											<FavoriteIcon
												sx={{ color: theme.palette.background.paper }}
											/>
											<Typography
												variant="h4"
												sx={{ fontWeight: "bold" }}
												color={theme.palette.background.paper}
											>
												{post?.likes}
											</Typography>
										</Box>
										<Box sx={defaultStyle}>
											<ChatIcon sx={{ color: theme.palette.background.paper }} />
											<Typography
												variant="h4"
												sx={{ fontWeight: "bold" }}
												color={theme.palette.background.paper}
											>
												{post?.comments}
											</Typography>
										</Box>
									</HoverDiv>
								)}
								{post?.media?.length > 1 ? (
									<StyledMediaTag>
										<BurstModeIcon
											sx={{
												color: theme.palette.background.paper,
											}}
										/>
									</StyledMediaTag>
								) : post?.media[0]?.type === "video" ? (
									<StyledMediaTag>
										<MovieIcon
											sx={{
												color: theme.palette.background.paper,
											}}
										/>
									</StyledMediaTag>
								) : null}
							</MediaDiv>
						))}
				</StyledGallery>
			</Grid>
		</Grid>
	);
}

export default PhotoGallery;
