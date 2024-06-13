import { Box } from "@mui/material";
import { Outlet } from "react-router";

function MinimalLayout() {
  return (
    <Box sx={{ width: "100%" }}>
      <Outlet />
    </Box>
  );
}

export default MinimalLayout;
