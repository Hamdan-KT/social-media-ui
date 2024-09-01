import { useTheme } from "@emotion/react";
import {
	Box,
	FormControlLabel,
	Radio,
	RadioGroup,
	Typography,
	styled,
	useMediaQuery,
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

function CommentSettings() {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<>
			<SettingsHeader title="Comments" />
			<Box
				sx={{
					p: { sm: "1rem", md: "0 2rem", lg: "0 6rem" },
					mt: { xs: 10, sm: 0 },
				}}
			>
				{!matchDownSm && (
					<Box sx={{ p: "0rem", mt: 2.5 }}>
						<Typography variant="h3">Comments</Typography>
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
					<Typography variant="h4">Allow comments from</Typography>
					<CommonBox
						sx={{
							border: `1px solid ${theme.palette.grey[300]}`,
							p: "1rem",
							borderRadius: 5,
						}}
					>
						<CommonBox sx={{ width: "100%", flexDirection: "column" }}>
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
										value="Your Followers"
										control={<Radio color="default" />}
										label="Your Followers"
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

export default CommentSettings;
