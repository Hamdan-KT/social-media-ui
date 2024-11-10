import { RoutePath } from "utils/routes";
import {
	Box,
	Grid,
	Typography,
	styled,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

// user post
import { userPosts } from "src/data";
import ReactIcons from "utils/ReactIcons";
import Image from "components/common/Image";
import React, { forwardRef } from "react";

const StyledGallery = styled(Box)(({ theme }) => ({
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

const MediaDiv = styled(Box)(({ theme }) => ({
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
	"&:hover .HoverDiv": {
		display: "flex",
	},
	cursor: "pointer",
	border: `1px solid ${theme.palette.grey[200]}`,
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
	top: 9,
	right: 9,
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

const PhotoGallery = forwardRef(function PhotoGallery({ sx, data = [] }, ref) {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const location = useLocation();

	return (
		<Grid container>
			<Grid item xs={12} md={12} sm={12} lg={12}>
				<StyledGallery sx={sx}>
					{data?.pages?.map((page, pageIndex, pageArr) => (
						<React.Fragment key={pageIndex}>
							{page?.data?.map((post, postIndex, postArr) => (
								<Link
									key={post._id}
									to={`/${RoutePath.POST}/${post._id}`}
									state={{ previousLocation: !matchDownSm ? location : null }}
									ref={
										pageIndex === pageArr.length - 1 &&
										postIndex === postArr.length - 1
											? ref
											: undefined
									}
								>
									<MediaDiv>
										{post?.files[0]?.fileType === "image" ? (
											<Image
												src={post.files[0]?.fileUrl}
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
												src={post?.files[0]?.fileUrl}
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
													<ReactIcons.AiFillHeart
														size={22}
														style={{ color: theme.palette.background.paper }}
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
													<ReactIcons.RiChat1Fill
														size={22}
														style={{ color: theme.palette.background.paper }}
													/>
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
										{post?.files?.length > 1 ? (
											<StyledMediaTag>
												<ReactIcons.FaImages
													size={22}
													style={{
														color: theme.palette.background.paper,
													}}
												/>
											</StyledMediaTag>
										) : post?.files[0]?.fileType === "video" ? (
											<StyledMediaTag>
												<ReactIcons.BiSolidMoviePlay
													size={22}
													style={{
														color: theme.palette.background.paper,
													}}
												/>
											</StyledMediaTag>
										) : null}
									</MediaDiv>
								</Link>
							))}
						</React.Fragment>
					))}
				</StyledGallery>
			</Grid>
		</Grid>
	);
});

export default PhotoGallery;
