import React from "react";
import { Box, styled, Avatar, Badge, useTheme } from "@mui/material";
import ReactIcons from "utils/ReactIcons";

const StoryTag = styled(Box)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: "2.4px",
	[theme.breakpoints.down("sm")]: {
		padding: "3px",
	},
	borderRadius: "50%",
	background:
		"linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)",
	cursor: "pointer",
}));

const StyledPlusIcon = styled(Box)(({ theme }) => ({
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "auto",
	borderRadius: "50%",
	background: theme.palette.background.paper,
}));

function ProfileAvatar({
	data,
	storyView = true,
	badge = false,
	sx = {},
	containerSx = {},
	badgeProps = {},
	onClick = () => {},
}) {
	const theme = useTheme();

	return (
		<>
			{storyView ? (
				<StoryTag sx={containerSx}>
					{badge ? (
						<Badge
							overlap="circular"
							anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
							badgeContent={
								<StyledPlusIcon>
									<ReactIcons.IoIosAddCircle
										size={25}
										style={{ color: theme.palette.primary.main }}
									/>
								</StyledPlusIcon>
							}
							{...badgeProps}
						>
							<Avatar
								src={data?.profile}
								alt={data?.name}
								sx={{
									width: { xs: 74, sm: 59 },
									height: { xs: 74, sm: 59 },
									border: "1.5px solid #ffff",
									...sx,
								}}
								onClick={onClick}
							/>
						</Badge>
					) : (
						<Avatar
							src={data.profile}
							sx={{
								width: { xs: 74, sm: 59 },
								height: { xs: 74, sm: 59 },
								border: "1.5px solid #ffff",
								...sx,
							}}
						/>
					)}
				</StoryTag>
			) : (
				<>
					{badge ? (
						<Badge
							overlap="circular"
							anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
							badgeContent={
								<StyledPlusIcon>
									<ReactIcons.IoIosAddCircle
										size={25}
										style={{ color: theme.palette.primary.main }}
									/>
								</StyledPlusIcon>
							}
							{...badgeProps}
						>
							<Avatar
								src={data?.profile}
								alt={data?.name}
								sx={{
									width: { xs: 74, sm: 59 },
									height: { xs: 74, sm: 59 },
									border: "1.5px solid #ffff",
									...sx,
								}}
								onClick={onClick}
							/>
						</Badge>
					) : (
						<Avatar
							src={data.profile}
							sx={{
								width: { xs: 74, sm: 59 },
								height: { xs: 74, sm: 59 },
								border: "1.5px solid #ffff",
								...sx,
							}}
							onClick={onClick}
						/>
					)}
				</>
			)}
		</>
	);
}

export default ProfileAvatar;
