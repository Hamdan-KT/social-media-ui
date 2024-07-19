import {
	Box,
	Grid,
	Typography,
	styled,
	useMediaQuery,
	useTheme,
} from "@mui/material";

// user post
import { generateExplorePosts } from "src/data";
import MobileSearchBar from "components/ui-components/MobileSearchBar/MobileSearchBar";
import ReactIcons from "utils/ReactIcons";
import { RoutePath } from "utils/routes";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const StyledGallery = styled(Box)(({ theme }) => ({
	display: "grid",
	gridTemplateColumns: "1fr 1fr 1fr",
	gap: "0.2rem",
	width: "100%",
	height: "100%",
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: theme.palette.background.default,
	padding: "0 6rem",
	[theme.breakpoints.down("lg")]: {
		padding: "0 2rem",
	},
	[theme.breakpoints.down("md")]: {
		padding: "0",
	},
	[theme.breakpoints.down("sm")]: {
		padding: "0",
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

function Explore() {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const location = useLocation();

	return (
		<Grid container>
			{matchDownSm && (
				<Grid item xs={12} md={12} sm={12} lg={12}>
					<MobileSearchBar />
				</Grid>
			)}
			<Grid item xs={12} md={12} sm={12} lg={12}>
				<StyledGallery>
					{generateExplorePosts()?.map((post, index) => (
						<Link
							to={`/${RoutePath.POST}/${post.id}`}
							state={{ previousLocation: !matchDownSm ? location : null }}
						>
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
									/>
								)}
								{!matchDownSm && (
									<HoverDiv className="HoverDiv">
										<Box sx={defaultStyle}>
											<ReactIcons.RiHeart3Fill
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
								{post?.media?.length > 1 ? (
									<StyledMediaTag>
										<ReactIcons.FaImages
											size={22}
											style={{
												color: theme.palette.background.paper,
											}}
										/>
									</StyledMediaTag>
								) : post?.media[0]?.type === "video" ? (
									<StyledMediaTag>
										<ReactIcons.BiSolidMoviePlay
											size={22}
											sx={{
												color: theme.palette.background.paper,
											}}
										/>
									</StyledMediaTag>
								) : null}
							</MediaDiv>
						</Link>
					))}
				</StyledGallery>
			</Grid>
		</Grid>
	);
}

export default Explore;
