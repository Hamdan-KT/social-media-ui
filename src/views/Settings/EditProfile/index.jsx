import React, { useState } from "react";
import {
	Avatar,
	Box,
	TextField,
	Typography,
	styled,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { defaultUser } from "src/data";
import Btn from "components/common/Button";
import SettingsHeader from "../SettingsHeader";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { updateUserAvatar } from "src/api/userAPI";
import ChangeAvatar from "src/components/ui-components/Popups/ChangeAvatar";
import { createURLfromImage } from "src/utils/common";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const CommonBox = styled("div")(({ theme }) => ({
	display: "flex",
	width: "100%",
	alignItems: "center",
	justifyContent: "center",
	gap: "0.5rem",
}));

function EditProfile() {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const [popupOpen, setPopupOpen] = useState(false);
	const [imgUrl, setImgUrl] = useState("");
	const user = useSelector((state) => state.user?.user);

	const onfileChange = (e) => {
		const fileUrl = createURLfromImage(e.target.files[0]);
		setImgUrl(fileUrl);
		setPopupOpen(true);
	};

	return (
		<>
			<SettingsHeader title="Edit Profile" />
			<Box
				sx={{
					p: { sm: "1rem", md: "0 2rem", lg: "0 6rem" },
					mt: { xs: 10, sm: 0 },
				}}
			>
				{!matchDownSm && (
					<Box sx={{ p: "0rem", mt: 2.5 }}>
						<Typography variant="h3">Edit Profile</Typography>
					</Box>
				)}
				<CommonBox sx={{ flexDirection: "column", gap: "1rem", mt: 3 }}>
					<CommonBox
						sx={{
							justifyContent: "space-between",
							background: theme.palette.grey[200],
							p: "1rem",
							borderRadius: 5,
						}}
					>
						<CommonBox sx={{ width: "auto" }}>
							<Avatar src={user?.avatar} sx={{ width: 55, height: 55 }} />
							<CommonBox
								sx={{
									width: "auto",
									flexDirection: "column",
									gap: 0,
									alignItems: "start",
								}}
							>
								<Typography variant="userName">{user?.userName}</Typography>
								<Typography variant="greyTagsXs">{user?.name}</Typography>
							</CommonBox>
						</CommonBox>
						<CommonBox sx={{ width: "auto" }}>
							<Btn
								component="label"
								for="avatar-file"
								variant="contained"
								sx={{ padding: "0.2rem 1rem" }}
							>
								Change Photo
							</Btn>
							<TextField
								sx={{ display: "none" }}
								type="file"
								id="avatar-file"
								onChange={onfileChange}
							/>
						</CommonBox>
					</CommonBox>
					<CommonBox
						sx={{
							alignItems: "start",
							flexDirection: "column",
						}}
					>
						<Typography variant="h4">Name</Typography>
						<TextField
							type="text"
							InputProps={{ sx: { borderRadius: 3 } }}
							fullWidth
							size="small"
							placeholder="Name"
						/>
					</CommonBox>
					<CommonBox
						sx={{
							alignItems: "start",
							flexDirection: "column",
						}}
					>
						<Typography variant="h4">Email</Typography>
						<TextField
							type="email"
							InputProps={{ sx: { borderRadius: 3 } }}
							fullWidth
							size="small"
							placeholder="Email"
						/>
					</CommonBox>
					<CommonBox
						sx={{
							alignItems: "start",
							flexDirection: "column",
						}}
					>
						<Typography variant="h4">Bio</Typography>
						<TextField
							type="text"
							InputProps={{ sx: { borderRadius: 4 } }}
							multiline
							rows={4}
							fullWidth
							size="small"
							placeholder="Bio"
						/>
					</CommonBox>
					<CommonBox
						sx={{
							justifyContent: "end",
						}}
					>
						<Btn variant="contained" sx={{ padding: "0.5rem 3rem" }}>
							Submit
						</Btn>
					</CommonBox>
				</CommonBox>
			</Box>
			<ChangeAvatar
				open={popupOpen}
				onClose={() => setPopupOpen(false)}
				imgUrl={imgUrl}
			/>
		</>
	);
}

export default EditProfile;
