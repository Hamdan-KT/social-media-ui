import {
	Box,
	Button,
	Divider,
	TextField,
	Typography,
	styled,
	useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Mobiles from "assets/images/mobiles.png";
import PngLogo from "assets/images/logoText.png";
import AppStore from "assets/images/appstore.png";
import PlayStore from "assets/images/playstore.png";
import { AnimatePresence, motion } from "framer-motion";
import ScreenChat from "assets/images/screenChat.png";
import ScreenEdit from "assets/images/screenEdit.png";
import ScreenHome from "assets/images/screenHome.png";
import ScreenProfile from "assets/images/screenProfile.png";

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

function Login() {
	const theme = useTheme();
	const [currentImgIndex, setCurrentImgIndex] = useState(0);

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
					<img
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
				<CommonBox sx={{ flexDirection: "column", gap: "0.5rem" }}>
					<LoginBox
						sx={{
							width: { xs: "90vw", sm: "50vw", md: "25vw" },
							flexDirection: "column",
							gap: 1,
						}}
					>
						<img
							src={PngLogo}
							style={{
								display: "block",
								width: "60%",
								objectFit: "cover",
								marginTop: "2rem",
								marginBottom: "2rem",
							}}
						/>
						<StyledTextField size="small" fullWidth placeholder="Username" />
						<StyledTextField size="small" fullWidth placeholder="Password" />
						<Button
							variant="contained"
							sx={{ fontWeight: "bold", borderRadius: 2, mt: 1 }}
							disableElevation
							fullWidth
						>
							Log in
						</Button>
						<Divider sx={{ background: "red" }} />
						<Typography component="a" variant="caption">
							Forgot Password ?
						</Typography>
					</LoginBox>
					<LoginBox
						sx={{
							width: { xs: "90vw", sm: "50vw", md: "25vw" },
							fontWeight: "medium",
							fontSize: "0.85rem",
						}}
					>
						Don't have an account?{" "}
						<Typography
							ml={1}
							variant="userName"
							sx={{ fontSize: "0.8rem", color: theme.palette.primary.main }}
						>
							Sign Up
						</Typography>
					</LoginBox>
					<Typography variant="subtitle1">Get the app.</Typography>
					<LoginBox
						sx={{
							width: { xs: "90vw", sm: "50vw", md: "25vw" },
							border: "none",
							gap: "0.5rem",
							padding: "0 2.5rem",
						}}
					>
						<img
							draggable={false}
							src={AppStore}
							style={{ display: "block", width: "50%", objectFit: "cover" }}
						/>
						<img
							draggable={false}
							src={PlayStore}
							style={{ display: "block", width: "50%", objectFit: "cover" }}
						/>
					</LoginBox>
				</CommonBox>
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

export default Login;
