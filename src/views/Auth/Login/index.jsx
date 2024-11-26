import {
	Box,
	Button,
	Divider,
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	OutlinedInput,
	TextField,
	Typography,
	styled,
	useTheme,
} from "@mui/material";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import PngLogo from "assets/images/logoText.png";
import AppStore from "assets/images/appstore.png";
import PlayStore from "assets/images/playstore.png";
import { useNavigate } from "react-router";
import { RoutePath } from "utils/routes";
import Image from "components/common/Image";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { loginUser } from "src/api/authAPI";
import DefaultLoader from "src/components/common/DefaultLoader";
import ReactIcons from "src/utils/ReactIcons";
import { useDispatch } from "react-redux";
import { saveUser, setToken } from "src/app/slices/userSlice/userSlice";

const CommonBox = styled(Box)(({ theme }) => ({
	width: "100%",
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
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

const StyledTextField = styled(OutlinedInput)(({ theme }) => ({
	".MuiInputBase-root": {
		background: "#F5F7F880",
	},
	"& input::placeholder": {
		fontSize: "0.76rem",
		color: "black",
	},
}));

const initialValues = {
	userName: "",
	password: "",
};

function Login() {
	const theme = useTheme();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [showPassword, setShowPassword] = useState(false);

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: Yup.object({
			userName: Yup.string().required("username is required"),
			password: Yup.string().required("password is required"),
		}),
		onSubmit: (values, actions) => {
			console.log({ values });
			return login.mutate(values);
		},
	});

	const login = useMutation({
		mutationKey: ["login"],
		mutationFn: (userData) => loginUser(userData),
		onSuccess: (data) => {
			console.log({ data });
			const { accessToken, user } = data.data;
			dispatch(saveUser(user));
			dispatch(setToken(accessToken));
			toast.success(data?.message);
			navigate(RoutePath.HOME, { replace: true });
		},
		onError: (error) => {
			console.log({ loginErr: error });
			toast.error(error.message);
		},
	});

	return (
		<CommonBox sx={{ flexDirection: "column", gap: "0.5rem" }}>
			<LoginBox
				sx={{
					width: { xs: "90vw", sm: "50vw", md: "25vw" },
					flexDirection: "column",
					gap: 1,
				}}
			>
				{/* <Image
					src={PngLogo}
					style={{
						display: "block",
						width: "60%",
						objectFit: "cover",
						marginTop: "2rem",
						marginBottom: "2rem",
					}}
				/> */}
				<Typography variant="logo" sx={{ fontSize: "3rem", p: "0.5rem", marginTop: "2rem", marginBottom:"2rem" }}>
					Instogram
				</Typography>
				<form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
					<CommonBox sx={{ flexDirection: "column", gap: 1 }}>
						<FormControl fullWidth variant="outlined">
							<StyledTextField
								size="small"
								type="text"
								name="userName"
								fullWidth
								placeholder="Username"
								value={formik.values.userName}
								onChange={formik.handleChange}
								error={
									formik.touched.userName && Boolean(formik.errors.userName)
								}
							/>
							<FormHelperText
								sx={{ color: "red" }}
								id="outlined-weight-helper-text"
							>
								{formik.touched.userName && formik.errors.userName}
							</FormHelperText>
						</FormControl>

						<FormControl fullWidth variant="outlined">
							<StyledTextField
								size="small"
								name="password"
								fullWidth
								placeholder="Password"
								value={formik.values.password}
								onChange={formik.handleChange}
								error={
									formik.touched.password && Boolean(formik.errors.password)
								}
								type={showPassword ? "text" : "password"}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label={
												showPassword
													? "hide the password"
													: "display the password"
											}
											onClick={() => setShowPassword((prev) => !prev)}
											edge="end"
										>
											{showPassword ? (
												<ReactIcons.MdVisibilityOff />
											) : (
												<ReactIcons.MdVisibility />
											)}
										</IconButton>
									</InputAdornment>
								}
							/>
							<FormHelperText
								sx={{ color: "red" }}
								id="outlined-weight-helper-text"
							>
								{formik.touched.password && formik.errors.password}
							</FormHelperText>
						</FormControl>

						<Button
							type="submit"
							variant="contained"
							sx={{ fontWeight: "bold", borderRadius: 2, mt: 1 }}
							disableElevation
							fullWidth
						>
							{login.isPending ? <DefaultLoader size={23} /> : "Log in"}
						</Button>
					</CommonBox>
				</form>
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
						userSelect: "none",
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
				<Image
					draggable={false}
					src={AppStore}
					style={{ display: "block", width: "50%", objectFit: "cover" }}
				/>
				<Image
					draggable={false}
					src={PlayStore}
					style={{ display: "block", width: "50%", objectFit: "cover" }}
				/>
			</LoginBox>
		</CommonBox>
	);
}

export default Login;
