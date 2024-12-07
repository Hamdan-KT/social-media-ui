import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { IconButton, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import { useSelector } from "react-redux";

const StyledToolBar = styled(Toolbar)(({ theme }) => ({
	display: "flex",
	width: "100%",
	alignItems: "center",
	justifyContent: "space-between",
	backgroundColor: theme.palette.background.default,
	padding: "0rem",
	position: "absolute",
	[theme.breakpoints.down("md")]: {
		position: "fixed",
		padding: "0rem 0.5rem",
		width: `calc(100% - ${theme.spacing(10)})`,
		marginLeft: `calc(${theme.spacing(10)} + 1px)`,
	},
	[theme.breakpoints.down("sm")]: {
		position: "fixed",
		padding: "0rem 0.5rem",
		width: `100%`,
		marginLeft: 0,
	},
	top: 0,
	left: 0,
	zIndex: 7,
}));

function MessageHeader() {
  const theme = useTheme();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.user)

  return (
    <StyledToolBar disableGutters>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton size="large" color="inherit" onClick={() => navigate(-1)}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography variant="h4">{user?.userName}</Typography>
      </Box>
      <IconButton
        size="large"
        color="inherit"
        onClick={() => console.log("more buttom clicked")}
      >
        <DriveFileRenameOutlineOutlinedIcon />
      </IconButton>
    </StyledToolBar>
  );
}

export default MessageHeader;
