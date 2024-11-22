import {
	Box,
	Typography,
	styled,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React from "react";
import SettingsHeader from "../SettingsHeader";
import ProfileSavedPosts from "src/views/Profile/SavedPosts";

const CommonBox = styled("div")(({ theme }) => ({
	display: "flex",
	width: "100%",
	alignItems: "center",
	justifyContent: "center",
	gap: "0.5rem",
}));

function SavedPosts() {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<>
			<SettingsHeader title="Saved Posts" />
			<Box
				sx={{
					p: { sm: "0.5rem", md: "0 2rem", lg: "0 1rem" },
					mt: { xs: 10, sm: 0 },
				}}
			>
				{!matchDownSm && (
					<Box sx={{ p: "0rem", mt: 2.5 }}>
						<Typography variant="h3">Saved Posts</Typography>
					</Box>
				)}
				<CommonBox sx={{ flexDirection: "column", background: "red", gap: "1rem", mt: 3 }}>
					{/* content */}
					<ProfileSavedPosts />
				</CommonBox>
			</Box>
		</>
	);
}

export default SavedPosts;
