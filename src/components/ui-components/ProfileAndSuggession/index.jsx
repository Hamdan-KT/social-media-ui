/* eslint-disable no-constant-condition */
import { Paper, styled, Grid, Box, Avatar, Typography } from "@mui/material";
import { defaultSpacing } from "utils/constants";
import { useSelector } from "react-redux";

// test import
import Btn from "components/common/Button";
import UserList from "../UserList";
import { Users } from "src/data";
import { defaultUser } from "../../../data";
import { useNavigate } from "react-router";
import { RoutePath } from "utils/routes";

const StyledProfile = styled(Paper)(({ theme, customization }) => ({
	width: "100%",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	background: theme.palette.background.default,
	minHeight: "10vh",
	padding: "0.8rem",
	borderRadius: `${customization?.borderRadius}px`,
}));

const StyledPaper = styled(Paper)(({ theme, customization }) => ({
	width: "100%",
	display: "flex",
	padding: "1rem 0.5rem",
	background: theme.palette.background.default,
	height: "80vh",
	borderRadius: `${customization?.borderRadius}px`,
	position: "relative",
	"&::before": {
		content: `""`,
		position: "absolute",
		display: "flex",
		width: "100%",
		background: `linear-gradient(to top, rgba(255,0,0,0), ${theme.palette.background.paperLight}, ${theme.palette.background.default})`,
		padding: "1rem",
		top: 2,
		left: 0,
		zIndex: 7,
		borderRadius: `${customization?.borderRadius}px`,
	},
	"&::after": {
		content: `""`,
		position: "absolute",
		display: "flex",
		width: "100%",
		background: `linear-gradient(to bottom, rgba(255,0,0,0), ${theme.palette.background.paperLight}, ${theme.palette.background.default})`,
		padding: "1rem",
		bottom: 2,
		left: 0,
		borderRadius: `${customization?.borderRadius}px`,
	},
}));

const StyledGid = styled(Grid)({
	position: "sticky",
	top: 0,
	right: 0,
});

const ProfileBox = styled(Box)(({ theme }) => ({
	width: "100%",
	height: "100%",
	gap: "0.5rem",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	flexWrap: "wrap",
	background: theme.palette.background.default,
}));

function Suggessions() {
	const customization = useSelector((state) => state.customization);
	const navigate = useNavigate();

	return (
		<StyledGid container spacing={defaultSpacing}>
			<Grid item md={12} lg={12}>
				<StyledProfile
					elevation={2}
					customization={customization}
					onClick={() => navigate(RoutePath.PROFILE)}
				>
					<ProfileBox>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								gap: "0.8rem",
							}}
						>
							<Avatar
								src={defaultUser.profile}
								aria-label="profile-picture"
								sx={{ width: 60, height: 60 }}
							/>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
								}}
							>
								<Typography variant="userName">{defaultUser.userId}</Typography>
								<Typography variant="caption">{defaultUser.name}</Typography>
							</Box>
						</Box>
						<Btn>Switch</Btn>
					</ProfileBox>
				</StyledProfile>
			</Grid>
			<Grid item md={12} lg={12}>
				<Typography mb={1} ml={1}>
					Suggested For You
				</Typography>
				<StyledPaper elevation={2} customization={customization}>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							height: "100%",
							alignItems: "flex-start",
							overflowY: "scroll",
							scrollBehavior: "smooth",
						}}
						className="scrollbar-toggle-visible"
					>
						<UserList
							data={Users}
							buttonState="following"
							actionButton={true}
						/>
					</Box>
				</StyledPaper>
			</Grid>
		</StyledGid>
	);
}

export default Suggessions;
