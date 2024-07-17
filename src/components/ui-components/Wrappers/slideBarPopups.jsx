/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  styled,
  useMediaQuery,
  Slide,
  useTheme,
  Paper,
} from "@mui/material";
import { useEffect, useRef } from "react";
import { drawerWidth } from "utils/constants";
import { useDispatch, useSelector } from "react-redux";

const StyledPaper = styled(Paper)(({ theme, customization }) => ({
  width: "100%",
  height: "99vh",
  maxHeight: "99vh",
  display: "flex",
  alignItems: "flex-start",
  padding: "1.3rem 0.5rem",
  justifyContent: "flex-start",
  borderTopRightRadius: "20px",
  borderBottomRightRadius: "20px",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: drawerWidth + 5,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  maxHeight: "100vh",
  width: "27vw",
  zIndex: 10,
  [theme.breakpoints.down("lg")]: {
    width: "30vw",
    left: `calc(${theme.spacing(10)} + 5px)`,
  },
  [theme.breakpoints.down("md")]: {
    width: "50vw",
    left: `calc(${theme.spacing(10)} + 5px)`,
  },
}));

const BaseBox = styled(Box)(({ theme, customization }) => ({
  width: "100%",
  height: "100%",
  maxHeight: "100%",
  overflowY: "scroll",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
}));

function SlideBarPopups({ children, open = false }) {
  const theme = useTheme();
  const containerRef = useRef();
  const dispatch = useDispatch();
  const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
		<Slide
			ref={containerRef}
			direction="right"
			timeout={300}
			in={open}
			mountOnEnter
			unmountOnExit
		>
			<StyledBox>
				<StyledPaper elevation={10}>
					<BaseBox className="scrollbar-hide">{children}</BaseBox>
				</StyledPaper>
			</StyledBox>
		</Slide>
	);
}

export default SlideBarPopups;
