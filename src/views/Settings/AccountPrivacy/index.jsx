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

function AccountPrivacy() {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	return (
		<>
			<SettingsHeader title="Account Privacy" />
			<Box
				sx={{
					p: { sm: "1rem", md: "0 2rem", lg: "0 6rem" },
					mt: { xs: 10, sm: 0 },
				}}
			>
				{!matchDownSm && (
					<Box sx={{ p: "0rem", mt: 2.5 }}>
						<Typography variant="h3">Account Privacy</Typography>
					</Box>
				)}
				<CommonBox sx={{ flexDirection: "column", gap: "1rem", mt: 3 }}>
					<CommonBox
						sx={{
							justifyContent: "space-between",
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
									Privat account
								</Typography>
								<MUISwitch size={35} />
							</CommonBox>
							<Typography variant="caption">
								When your account is public, your profile and posts can be seen
								by anyone, on or off Instogram, even if they don't have an
								Instogram account. When your account is private, only the
								followers you approve can see what you share, including your
								photos or videos on hashtag and location pages, and your
								followers and following lists. Certain info on your profile,
								like your profile picture and username, is visible to everyone
								on and off Instogram.
							</Typography>
						</CommonBox>
					</CommonBox>
				</CommonBox>
			</Box>
		</>
	);
}

export default AccountPrivacy;
