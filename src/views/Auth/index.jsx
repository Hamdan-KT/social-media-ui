import {
	Box,
	TextField,
	Typography,
	styled,
	useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Mobiles from "assets/images/mobiles.png";
import { AnimatePresence, motion } from "framer-motion";
import ScreenChat from "assets/images/screenChat.png";
import ScreenEdit from "assets/images/screenEdit.png";
import ScreenHome from "assets/images/screenHome.png";
import ScreenProfile from "assets/images/screenProfile.png";
import { Outlet, useNavigate } from "react-router";
import Image from "components/common/Image";

const CommonBox = styled(Box)(({ theme }) => ({
	width: "100%",
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const MainBox = styled(Box)(({ theme }) => ({
	width: "max-content",
	height: "75vh",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	position: "relative",
	gap: "1.5rem",
}));

const ImageSection = styled(Box)(({ theme }) => ({
	width: "auto",
	height: "100%",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	position: "relative",
	background: theme.palette.background.paper,
	[theme.breakpoints.down("md")]: {
		display: "none",
	},
}));

const LoginBox = styled(Box)(({ theme }) => ({
	height: "100%",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	position: "relative",
	background: theme.palette.background.paper,
	border: `1.3px solid ${theme.palette.grey[300]}`,
	padding: "1rem 2.5rem",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
	".MuiInputBase-root": {
		background: "#F5F7F880",
	},
	"& input::placeholder": {
		fontSize: "0.76rem",
		color: "black",
	},
}));

const imgs = [ScreenHome, ScreenProfile, ScreenChat, ScreenEdit];

function AuthLayout() {
	const theme = useTheme();
	const [currentImgIndex, setCurrentImgIndex] = useState(0);
	const navigate = useNavigate();

	// handling auto changing image
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImgIndex((prevIndex) => (prevIndex + 1) % imgs.length);
		}, 3000);

		// clean up function
		return () => {
			clearInterval(interval);
		};
	}, [imgs]);

	return (
		<CommonBox
			sx={{
				height: "100vh",
				justifyContent: "start",
				gap: "3rem",
				padding: 5,
				flexDirection: "column",
			}}
		>
			<MainBox sx={{ mt: 1 }}>
				<ImageSection sx={{ position: "relative" }}>
					<Image
						draggable={false}
						src={Mobiles}
						style={{ display: "block", height: "100%", objectFit: "cover" }}
					/>
					<AnimatePresence>
						<motion.img
							draggable={false}
							key={currentImgIndex}
							src={imgs[currentImgIndex]}
							style={{
								display: "block",
								position: "absolute",
								height: "87%",
								objectFit: "cover",
								right: "6.5%",
								top: "8.5%",
							}}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 1 }}
						/>
					</AnimatePresence>
				</ImageSection>
				<Outlet />
			</MainBox>
			<CommonBox sx={{ flexDirection: "column", gap: "1rem" }}>
				<CommonBox sx={{ gap: "1.5rem", flexWrap: "wrap" }}>
					<Typography variant="greyTags">About</Typography>
					<Typography variant="greyTags">Blog</Typography>
					<Typography variant="greyTags">Help</Typography>
					<Typography variant="greyTags">API</Typography>
					<Typography variant="greyTags">Privacy</Typography>
					<Typography variant="greyTags">Terms</Typography>
					<Typography variant="greyTags">Contact Us</Typography>
				</CommonBox>
				<Typography variant="greyTags">
					© 2024 Instogram All rights reserved
				</Typography>
			</CommonBox>
		</CommonBox>
	);
}

export default AuthLayout;
