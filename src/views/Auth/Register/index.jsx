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
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "src/api/authAPI";
import { useFormik } from "formik";
import DefaultLoader from "src/components/common/DefaultLoader";
import toast from "react-hot-toast";
import ReactIcons from "src/utils/ReactIcons";

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
	name: "",
	email: "",
	password: "",
};

function Register() {
	const theme = useTheme();
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: Yup.object({
			userName: Yup.string().required("username is required"),
			name: Yup.string().required("name is required"),
			email: Yup.string().email("invalid email").required("email is required"),
			password: Yup.string().required("password is required"),
		}),
		onSubmit: (values, actions) => {
			console.log({ values });
			return register.mutate(values);
		},
	});

	const register = useMutation({
		mutationKey: ["register"],
		mutationFn: (userData) => registerUser(userData),
		onSuccess: (data) => {
			toast.success(data?.message);
			navigate(`/${RoutePath.AUTH}/${RoutePath.REGISTER}`);
		},
		onError: (error) => {
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
				<Typography
					variant="logo"
					sx={{
						fontSize: "3rem",
						p: "0.5rem",
						marginTop: "2rem",
						marginBottom: "2rem",
					}}
				>
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
								name="name"
								type="text"
								fullWidth
								placeholder="Full name"
								value={formik.values.name}
								onChange={formik.handleChange}
								error={formik.touched.name && Boolean(formik.errors.name)}
								helperText={formik.touched.name && formik.errors.name}
							/>
							<FormHelperText
								sx={{ color: "red" }}
								id="outlined-weight-helper-text"
							>
								{formik.touched.name && formik.errors.name}
							</FormHelperText>
						</FormControl>
						<FormControl fullWidth variant="outlined">
							<StyledTextField
								size="small"
								type="text"
								name="email"
								fullWidth
								placeholder="Email"
								value={formik.values.email}
								onChange={formik.handleChange}
								error={formik.touched.email && Boolean(formik.errors.email)}
								helperText={formik.touched.email && formik.errors.email}
							/>
							<FormHelperText
								sx={{ color: "red" }}
								id="outlined-weight-helper-text"
							>
								{formik.touched.email && formik.errors.email}
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
								helperText={formik.touched.password && formik.errors.password}
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
							{register.isPending ? <DefaultLoader size={23} /> : "Sign up"}
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
				Have an account?{" "}
				<Typography
					ml={1}
					variant="userName"
					sx={{
						fontSize: "0.8rem",
						color: theme.palette.primary.main,
						cursor: "pointer",
						userSelect: "none",
					}}
					onClick={() => navigate(`/${RoutePath.AUTH}/${RoutePath.LOGIN}`)}
				>
					Log in
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

export default Register;
