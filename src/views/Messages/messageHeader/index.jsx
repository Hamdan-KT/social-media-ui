import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { IconButton, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";

const StyledToolBar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0.5rem 0",
  backgroundColor: theme.palette.background.default,
  position: "absolute",
  [theme.breakpoints.down("md")]: {
    position: "fixed",
    padding: "0.5rem",
    width: `calc(100% - ${theme.spacing(14)})`,
    marginLeft: `calc(${theme.spacing(12)} + 1px)`,
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

  return (
    <StyledToolBar disableGutters>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton size="large" color="inherit" onClick={() => navigate(-1)}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography variant="h4">Jack Sparrow</Typography>
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
