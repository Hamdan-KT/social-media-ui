import React from "react";
import { Grid, Box, Skeleton, useMediaQuery, useTheme } from "@mui/material";
import { styled } from "@mui/system";

const StyledBox = styled(Box)(({ theme }) => ({
	display: "flex",
	width: "100%",
	height: "auto",
	alignItems: "center",
	justifyContent: "start",
	gap: "0.5rem",
}));

const ProfileSkeleton = () => {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<Grid item xs={12}>
			<Grid container spacing={2}>
				<Grid item xs={4} sm={3} md={4}>
					<StyledBox
						sx={{
							padding: { xs: "1rem", sm: "3rem 0" },
							mt: { xs: 5, sm: 0 },
							alignContent: "center",
							justifyContent: "center",
							width: "100%",
						}}
					>
						<Skeleton
							variant="circular"
							sx={{
								width: { xs: 85, sm: 110, md: 154 },
								height: { xs: 85, sm: 110, md: 154 },
							}}
						/>
					</StyledBox>
				</Grid>

				{/* Stats Section */}
				{matchDownSm && (
					<Grid item xs={8} sm={9} md={8} mt={8}>
						<StyledBox sx={{ flexDirection: "row", gap: "1.5rem" }}>
							{["Posts", "Followers", "Following"].map((text, index) => (
								<Box
									key={index}
									display="flex"
									flexDirection="column"
									alignItems="center"
									gap="0.3rem"
								>
									<Skeleton variant="text" width={50} height={30} />
									<Skeleton variant="text" width={40} height={20} />
								</Box>
							))}
						</StyledBox>
					</Grid>
				)}

				{/* Bio and Actions */}
				<Grid item xs={12} sm={8} md={8}>
					<StyledBox
						sx={{
							flexDirection: "column",
							padding: { xs: "0rem 0.5rem", sm: "3rem 0" },
							gap: "1rem",
						}}
					>
						<StyledBox gap="0.7rem">
							<Skeleton variant="text" width="20%" height={30} />
							<Skeleton variant="circular" width={20} height={20} />
							<Skeleton variant="rectangular" width={100} height={30} />
							<Skeleton variant="rectangular" width={100} height={30} />
							<Skeleton variant="circular" width={30} height={30} />
						</StyledBox>

						<StyledBox sx={{ flexDirection: "column", alignItems: "start" }}>
							<Skeleton variant="text" width="40%" height={25} />
							<Skeleton variant="text" width="30%" height={20} />
							<Skeleton variant="text" width="100%" height={20} />
							<Skeleton variant="text" width="100%" height={20} />
						</StyledBox>

						{matchDownSm && (
							<StyledBox sx={{ flexDirection: "row", gap: "1rem" }}>
								<Skeleton variant="rounded" width="50%" height={27} />
								<Skeleton variant="rounded" width="50%" height={27} />
							</StyledBox>
						)}
					</StyledBox>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default ProfileSkeleton;
