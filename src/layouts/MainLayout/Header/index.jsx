import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import PngLogo from "assets/images/logoText.png";
import { useNavigate } from "react-router";
import ReactIcons from "utils/ReactIcons";
import Image from "components/common/Image";

const StyledToolBar = styled(Toolbar)(({ theme }) => ({
	display: "flex",
	width: "100%",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "0 1rem",
	backgroundColor: theme.palette.background.default,
	position: "static",
}));

function MobileHeader() {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const navigate = useNavigate();

	return (
		<>
			{matchDownSm && (
				<StyledToolBar>
					<Box
						sx={{
							overflow: "hidden",
							display: "flex",
							width: "40%",
							height: "2.7rem",
							alignItems: "center",
							justifyContent: "start",
						}}
					>
						{/* <Image
							src={PngLogo}
							style={{ widht: "100%", userSelect: "none", display: "block" }}
							alt="not found"
						/> */}
						<Typography variant="logo" sx={{ fontSize: "2.3rem" }}>
							Instogram
						</Typography>
					</Box>
					<Box sx={{ display: "flex" }}>
						<IconButton
							size="large"
							color="inherit"
							onClick={() => navigate("/notifications")}
						>
							<Badge badgeContent={4} color="error">
								<ReactIcons.AiOutlineHeart />
							</Badge>
						</IconButton>
						<IconButton
							size="large"
							color="inherit"
							onClick={() => navigate("/messages")}
						>
							<Badge badgeContent={17} color="error">
								<ReactIcons.RiChat3Line />
							</Badge>
						</IconButton>
					</Box>
				</StyledToolBar>
			)}
		</>
	);
}

export default MobileHeader;
