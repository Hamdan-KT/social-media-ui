import MUISwitch from "components/common/FormInputs/Switch";
import {
	Box,
	FormControlLabel,
	Radio,
	RadioGroup,
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

function MessageAndReplySettings() {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<>
			<SettingsHeader title="Messages and story replies" />
			<Box
				sx={{
					p: { sm: "1rem", md: "0 2rem", lg: "0 6rem" },
					mt: { xs: 10, sm: 0 },
				}}
			>
				{!matchDownSm && (
					<Box sx={{ p: "0rem", mt: 2.5 }}>
						<Typography variant="h3">Messages and story replies</Typography>
					</Box>
				)}
				<CommonBox
					sx={{
						flexDirection: "column",
						alignItems: "start",
						gap: "1rem",
						mt: 4,
					}}
				>
					<Typography variant="h4">Who can see you're online</Typography>
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
									Show activity status
								</Typography>
								<MUISwitch size={35} />
							</CommonBox>
							<Typography variant="caption">
								Allow accounts you follow and anyone you message to see when you
								were last active or are currently active on Instogram. When this
								is turned off, you won't be able to see the activity status of
								other accounts.
							</Typography>
						</CommonBox>
					</CommonBox>
					<Typography variant="h4">Who can reply to your stories</Typography>
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
									Story replies
								</Typography>
							</CommonBox>
							<CommonBox sx={{ justifyContent: "start" }}>
								<RadioGroup
									aria-labelledby="story-reply-select"
									defaultValue="Everyone"
								>
									<FormControlLabel
										value="Everyone"
										control={<Radio color="default" />}
										label="Everyone"
									/>
									<FormControlLabel
										value="People You Follow"
										control={<Radio color="default" />}
										label="People You Follow"
									/>
									<FormControlLabel
										value="Off"
										control={<Radio color="default" />}
										label="Off"
									/>
								</RadioGroup>
							</CommonBox>
						</CommonBox>
					</CommonBox>
				</CommonBox>
			</Box>
		</>
	);
}

export default MessageAndReplySettings;
