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
import { userStories } from "../../../data";
import { useRef } from "react";

const StyledPaper = styled(Paper)(({ theme, customization }) => ({
  width: "100%",
  height: "16vh",
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
  height: "100%",
  display: "flex",
  alignItems: "center",
  overflowX: "scroll",
  scrollBehavior: "smooth",
  gap: "1rem",
  [theme.breakpoints.down("sm")]: {
    gap: "0.9rem",
  },
}));

const StoryTag = styled(Box)(({ theme }) => ({
  minWidth: "4rem",
  minHeight: "4rem",
  maxWidth: "4rem",
  maxHeight: "4rem",
  // overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    minWidth: "5rem",
    minHeight: "5rem",
    maxWidth: "5rem",
    maxHeight: "5rem",
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

function StorySlider(props) {
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
        <StyledPaper
          elevation={0}
          customization={customization}
        >
          <StorySliderBox ref={sliderWindow} className="scrollbar-hide">
            {userStories?.map((story, ind) => (
              <Box
                sx={{
                  display: "flex",
                  height: "100%",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  maxWidth: "5rem",
                  minWidth: { xs: "5rem", sm: "4rem" },
                }}
                key={ind}
              >
                <StoryTag key={ind}>
                  <Avatar
                    src={story.profile}
                    sx={{
                      width: { xs: 74, sm: 58 },
                      height: { xs: 74, sm: 58 },
                      border: "2px solid #ffff",
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

export default StorySlider;
