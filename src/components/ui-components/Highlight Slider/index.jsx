import {
  Box,
  styled,
  Paper,
  Grid,
  IconButton,
  useMediaQuery,
  Avatar,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// dummy data
import { userStories } from "src/data";
import { memo, useRef } from "react";
import ReactIcons from "utils/ReactIcons";

const StyledPaper = styled(Paper)(({ theme, customization }) => ({
  width: "100%",
  height: "15vh",
  [theme.breakpoints.down("sm")]: {
    height: "auto",
    marginTop: "-0.5rem",
  },
  display: "flex",
  alignItems: "center",
  background: theme.palette.background.default,
  borderRadius: `${customization?.borderRadius}px`,
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
      borderRadius: `${customization?.borderRadius}px`,
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
      borderRadius: `${customization?.borderRadius}px`,
    },
  },
}));

const StorySliderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100%",
  alignItems: "center",
  overflowX: "scroll",
  scrollBehavior: "smooth",
  gap: "2.5rem",
  [theme.breakpoints.down("sm")]: {
    gap: "0.5rem",
  },
}));

const StoryTag = styled(Box)(({ theme }) => ({
  minWidth: "5rem",
  minHeight: "5rem",
  maxWidth: "5rem",
  maxHeight: "5rem",
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    minWidth: "4rem",
    minHeight: "4rem",
    maxWidth: "4rem",
    maxHeight: "4rem",
  },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "3px",
  borderRadius: "50%",
  background:
    "linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)",
  cursor: "pointer",
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

function HighlightSlider(props) {
  const customization = useSelector((state) => state.customization);
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
				<StyledPaper elevation={0} customization={customization}>
					<StorySliderBox ref={sliderWindow} className="scrollbar-hide">
						<Box
							sx={{
								display: "flex",
								height: "100%",
								flexDirection: "column",
								widht: "100%",
								alignItems: "center",
								textAlign: "center",
								justifyContent: "center",
								maxWidth: { xs: "4.5rem", sm: "5rem" },
								minWidth: { xs: "4.5rem", sm: "5rem" },
							}}
						>
							<StoryTag sx={{ background: theme.palette.background.paper }}>
								<Box
									sx={{
										borderRadius: "50%",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										minWidth: { xs: 64, sm: 80 },
										minHeight: { xs: 64, sm: 80 },
										border: `1.5px solid ${theme.palette.grey[300]}`,
									}}
								>
									<ReactIcons.LuPlus
										size={50}
                    style={{ color: theme.palette.grey[400] }}
									/>
								</Box>
							</StoryTag>
							<Typography
								noWrap
								variant="p"
								sx={{ fontSize: { xs: "11px" }, width: "5rem" }}
							>
								New
							</Typography>
						</Box>
						{userStories?.map((story, ind) => (
							<Box
								sx={{
									display: "flex",
									height: "100%",
									flexDirection: "column",
									widht: "100%",
									alignItems: "center",
									textAlign: "center",
									justifyContent: "center",
									maxWidth: { xs: "4.5rem", sm: "5rem" },
									minWidth: { xs: "4.5rem", sm: "5rem" },
								}}
								key={ind}
							>
								<StoryTag>
									<Avatar
										src={story.profile}
										sx={{
											width: { xs: 59, sm: 75 },
											height: { xs: 59, sm: 75 },
											border: "1.5px solid #ffff",
										}}
									/>
								</StoryTag>
								<Typography
									noWrap
									variant="p"
									sx={{ fontSize: { xs: "11px" }, width: "5rem" }}
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

export default memo(HighlightSlider);
