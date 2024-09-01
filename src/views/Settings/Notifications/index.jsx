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

const NotificationOption = ({ title, subtitle, options }) => {
	const theme = useTheme();
	return (
		<CommonBox
			sx={{
				border: `1px solid ${theme.palette.grey[300]}`,
				p: "1rem",
				borderRadius: 5,
			}}
		>
			<CommonBox
				sx={{ width: "100%", flexDirection: "column", alignItems: "start" }}
			>
				<Typography variant="h4">{title}</Typography>
				<RadioGroup
					aria-labelledby={`${title.replace(/\s+/g, "-").toLowerCase()}-select`}
					defaultValue={options[0].value}
				>
					{options.map((option) => (
						<FormControlLabel
							key={option.value}
							value={option.value}
							control={<Radio color="default" />}
							label={option.label}
						/>
					))}
				</RadioGroup>
				{subtitle && <Typography variant="caption">{subtitle}</Typography>}
			</CommonBox>
		</CommonBox>
	);
};

function NotificationSettings() {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<>
			<SettingsHeader title="Notifications" />
			<Box
				sx={{ p: { sm: "1rem", md: "0 2rem", lg: "0 6rem" }, mt: { xs: 10, sm: 0 } }}
			>
				{!matchDownSm && (
					<Box sx={{ p: "0rem", mt: 2.5 }}>
						<Typography variant="h3">Notifications</Typography>
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
					<CommonBox sx={{ flexDirection: "column", alignItems: "start" }}>
						<Typography variant="h4">Push Notification</Typography>
						<CommonBox sx={{ justifyContent: "space-between" }}>
							<Typography>Pause all</Typography>
							<MUISwitch />
						</CommonBox>
					</CommonBox>
					<NotificationOption
						title="Likes"
						subtitle="johnappleseed liked your photo."
						options={[
							{ value: "From everyone", label: "From everyone" },
							{
								value: "From profiles I follow",
								label: "From profiles I follow",
							},
							{ value: "Off", label: "Off" },
						]}
					/>
					<NotificationOption
						title="Likes and comments on photos of you"
						subtitle="johnappleseed commented on a post you're tagged in."
						options={[
							{ value: "From everyone", label: "From everyone" },
							{
								value: "From profiles I follow",
								label: "From profiles I follow",
							},
							{ value: "Off", label: "Off" },
						]}
					/>
					<NotificationOption
						title="Comments"
						subtitle="johnappleseed commented: Nice shot!"
						options={[
							{ value: "From everyone", label: "From everyone" },
							{
								value: "From profiles I follow",
								label: "From profiles I follow",
							},
							{ value: "Off", label: "Off" },
						]}
					/>
					<NotificationOption
						title="Comment likes"
						subtitle="johnappleseed liked your comment: Nice shot!"
						options={[
							{ value: "On", label: "On" },
							{ value: "Off", label: "Off" },
						]}
					/>
					<NotificationOption
						title="Mention requests"
						subtitle="johnappleseed requested to be mentioned in your story."
						options={[
							{ value: "From everyone", label: "From everyone" },
							{
								value: "From profiles I follow",
								label: "From profiles I follow",
							},
							{ value: "Off", label: "Off" },
						]}
					/>
					<NotificationOption
						title="New Followers"
						subtitle="John Appleseed (johnappleseed) started following you."
						options={[
							{ value: "On", label: "On" },
							{ value: "Off", label: "Off" },
						]}
					/>
					<NotificationOption
						title="Accepted follow requests"
						subtitle="John Appleseed (johnappleseed) accepted your follow request."
						options={[
							{ value: "On", label: "On" },
							{ value: "Off", label: "Off" },
						]}
					/>
				</CommonBox>
			</Box>
		</>
	);
}

export default NotificationSettings;
