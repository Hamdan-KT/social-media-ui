import { Box, Typography, styled, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import SettingsHeader from "../SettingsHeader";

const CommonBox = styled("div")(({ theme }) => ({
	display: "flex",
	width: "100%",
	alignItems: "center",
	justifyContent: "center",
	gap: "0.5rem",
}));

function BlockedAccounts() {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<>
			<SettingsHeader title="Blocked Accounts" />
			<Box
				sx={{
					p: { sm: "1rem", md: "0 2rem", lg: "0 6rem" },
					mt: { xs: 10, sm: 0 },
				}}
			>
				{!matchDownSm && (
					<Box sx={{ p: "0rem", mt: 2.5 }}>
						<Typography variant="h3">Blocked Accounts</Typography>
					</Box>
				)}
				<CommonBox sx={{ flexDirection: "column", gap: "1rem", mt: 3 }}>
					{/* content */}
				</CommonBox>
			</Box>
		</>
	);
}

export default BlockedAccounts;
