import {
	Box,
	styled,
	Paper,
	Grid,
	IconButton,
	useMediaQuery,
	Typography
} from "@mui/material";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// dummy data
import { userStories } from "src/data";
import { useRef, memo } from "react";
import ProfileAvatar from "components/common/ProfileAvatar";

const StyledPaper = styled(Paper)(({ theme }) => ({
	width: "100%",
	height: "16vh",
	[theme.breakpoints.down("sm")]: {
		height: "auto",
		marginTop: "-0.5rem",
	},
	display: "flex",
	alignItems: "center",
	background: theme.palette.background.default,
	borderRadius: `${theme?.customization?.borderRadius}px`,
	position: "relative",
	[theme.breakpoints.not("xs")]: {
		padding: "0rem 1rem",
		"&::before": {
			content: `""`,
			position: "absolute",
			display: "flex",
			width: "20px",
			height: "100%",
			background: `linear-gradient(to left, rgba(255,0,0,0), ${theme.palette.background.paperLight}, ${theme.palette.background.default})`,
			top: 0,
			left: 3,
			zIndex: 5,
			borderRadius: `${theme?.customization?.borderRadius}px`,
		},
		"&::after": {
			content: `""`,
			position: "absolute",
			display: "flex",
			width: "20px",
			height: "100%",
			background: `linear-gradient(to right, rgba(255,0,0,0), ${theme.palette.background.paperLight}, ${theme.palette.background.default})`,
			top: 0,
			right: 3,
			zIndex: 5,
			borderRadius: `${theme?.customization?.borderRadius}px`,
		},
	},
}));

const StorySliderBox = styled(Box)(({ theme }) => ({
	height: "100%",
	display: "flex",
	alignItems: "center",
	overflowX: "scroll",
	scrollBehavior: "smooth",
	gap: "1rem",
	[theme.breakpoints.down("sm")]: {
		gap: "0.5rem",
	},
}));

const SlideButton = styled(IconButton)(({ direction }) => ({
	display: "flex",
	padding: "0.1rem",
	borderRadius: "50%",
	backgroundColor: "rgba(202, 202, 202, 0.61)",
	position: "absolute",
	left: direction === "left" && 0,
	right: direction === "right" && 0,
	marginLeft: direction === "left" && "0.5rem",
	marginRight: direction === "right" && "0.5rem",
	"&:hover": {
		backgroundColor: "rgba(202, 202, 202, 0.719)",
	},
	zIndex: 7,
}));

function StorySlider(props) {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const sliderWindow = useRef();

	const handleStorySlide = (e, direction) => {
		if (direction === "right") {
			sliderWindow.current.scrollLeft += sliderWindow.current.clientWidth / 2;
		} else {
			sliderWindow.current.scrollLeft -= sliderWindow.current.clientWidth / 2;
		}
	};

	return (
		<Grid container>
			<Grid item xs={12} md={12} sm={12} lg={12}>
				<StyledPaper elevation={0}>
					<StorySliderBox ref={sliderWindow} className="scrollbar-hide">
						<Box
							sx={{
								display: "flex",
								height: "100%",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								textAlign: "center",
								maxWidth: "5.5rem",
								minWidth: { xs: "5.5rem", sm: "4rem" },
							}}
						>
							<ProfileAvatar data={userStories[9]} badge={true} />
							<Typography
								noWrap
								variant="p"
								sx={{
									fontSize: { xs: "11px" },
									userSelect: "none",
									width: "5.5rem",
								}}
							>
								{userStories[9].name}
							</Typography>
						</Box>
						{userStories?.map((story, ind) => (
							<Box
								sx={{
									display: "flex",
									height: "100%",
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "center",
									textAlign: "center",
									maxWidth: "5.5rem",
									minWidth: { xs: "5.5rem", sm: "4rem" },
								}}
								key={ind}
							>
								<ProfileAvatar data={story} />
								<Typography
									noWrap
									variant="p"
									sx={{
										fontSize: { xs: "11px" },
										userSelect: "none",
										width: "5.5rem",
									}}
								>
									{story.name}
								</Typography>
							</Box>
						))}
					</StorySliderBox>
					{!matchDownSm && (
						<>
							<SlideButton
								direction="left"
								onClick={(e) => handleStorySlide(e, "left")}
							>
								<ChevronLeftIcon />
							</SlideButton>
							<SlideButton
								direction="right"
								onClick={(e) => handleStorySlide(e, "right")}
							>
								<ChevronRightIcon />
							</SlideButton>
						</>
					)}
				</StyledPaper>
			</Grid>
		</Grid>
	);
}

export default memo(StorySlider);
