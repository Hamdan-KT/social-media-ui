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
import PngLogo from "assets/images/logoText.png";
import AppStore from "assets/images/appstore.png";
import PlayStore from "assets/images/playstore.png";
import { useNavigate } from "react-router";
import { RoutePath } from "utils/routes";

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

function Login() {
	const theme = useTheme();
	const navigate = useNavigate();

	return (
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
				<StyledTextField
					size="small"
					type="text"
					fullWidth
					placeholder="Username"
				/>
				<StyledTextField
					size="small"
					type="password"
					fullWidth
					placeholder="Password"
				/>
				<Button
					variant="contained"
					sx={{ fontWeight: "bold", borderRadius: 2, mt: 1 }}
					disableElevation
					fullWidth
					onClick={() => navigate(`${RoutePath.HOME}`)}
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
					sx={{
						fontSize: "0.8rem",
						color: theme.palette.primary.main,
                        cursor: "pointer",
                        userSelect: "none"
					}}
					onClick={() => navigate(`/${RoutePath.AUTH}/${RoutePath.REGISTER}`)}
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
	);
}

export default Login;
