import MUISwitch from "components/common/formInputs/Switch";
import {
	Box,
	Typography,
	styled,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React from "react";
import SettingsHeader from "../SettingsHeader";

const CommonBox = styled("div")(({ theme }) => ({
	display: "flex",
	width: "100%",
	alignItems: "center",
	justifyContent: "center",
	gap: "0.5rem",
}));

function LikeAndShareCountSettings() {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<>
			<SettingsHeader title="Like and share counts" />
			<Box
				sx={{
					p: { sm: "1rem", md: "0 2rem", lg: "0 6rem" },
					mt: { xs: 10, sm: 0 },
				}}
			>
				{!matchDownSm && (
					<Box sx={{ p: "0rem", mt: 2.5 }}>
						<Typography variant="h3">Like and share counts</Typography>
					</Box>
				)}
				<CommonBox sx={{ flexDirection: "column", gap: "1rem", mt: 3 }}>
					<CommonBox
						sx={{
							border: `1px solid ${theme.palette.grey[300]}`,
							p: "1rem",
							borderRadius: 5,
						}}
					>
						<CommonBox sx={{ width: "100%", flexDirection: "column" }}>
							<CommonBox
								sx={{
									justifyContent: "space-between",
								}}
							>
								<Typography
									variant="body"
									sx={{ fontSize: "0.90rem", fontWeight: "medium" }}
								>
									Hide like & share counts
								</Typography>
								<MUISwitch />
							</CommonBox>
							<Typography variant="caption">
								On Instogram, the number of likes on posts and reels from other
								accounts will be hidden. You can hide the number of likes on
								your own posts and reels by going to Advanced settings before
								sharing.
							</Typography>
						</CommonBox>
					</CommonBox>
				</CommonBox>
			</Box>
		</>
	);
}

export default LikeAndShareCountSettings;
