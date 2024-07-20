import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import SideBar from "layouts/MainLayout/SideBar";
import { useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { handleSideBarOpen } from "app/slices/customizationSlice/customization";
import { Outlet, useLocation } from "react-router";
import { styled, useTheme } from "@mui/material/styles";
import BottomBar from "./BottomBar";
import { AnimatePresence } from "framer-motion";
import { RoutePath } from "src/utils/routes";
import { useEffect } from "react";

export default function MainLayout() {
	const { pathname } = useLocation();

	const MainSection = styled("main")(({ theme }) => ({
		display: "flex",
		padding: "1rem",
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: `calc(100% - (${theme.spacing(31)} + 2px))`,
		},
		[theme.breakpoints.down("lg")]: {
			width: `calc(100% - (${theme.spacing(10)} + 1px))`,
		},
		[theme.breakpoints.down("md")]: {
			width: `calc(100% - (${theme.spacing(10)} + 1px))`,
		},
		[theme.breakpoints.down("sm")]: {
			width: "100%",
			padding: "0.5rem",
			marginBottom: "3.5rem",
		},
	}));

	useEffect(() => {
		console.log("layout re-rendering...");
	}, []);

	return (
		<Box sx={{ display: "flex", position: "relative" }}>
			<CssBaseline />
			{/* side bar for sm -> lg windows */}
      <SideBar />
      {/* main section */}
			<MainSection>
				<AnimatePresence>
					<Box
						style={{ display: "flex", width: "100%" }}
						// initial={{ opacity: 0 }}
						// animate={{ opacity: 1 }}
						// exit={{ opacity: 0 }}
						// initial={{ scale: 0 }}
						// animate={{ scale: 1 }}
					>
						<Outlet />
					</Box>
				</AnimatePresence>
			</MainSection>
			{/* bottom bar only for mobile window */}
			{!pathname.split("/").includes(RoutePath.MESSAGES) && <BottomBar />}
		</Box>
	);
}
