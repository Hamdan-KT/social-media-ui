import {
	Avatar,
	Box,
	Grid,
	IconButton,
	Typography,
	styled,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import Btn from "components/common/Button";
import HighlightSlider from "components/ui-components/Highlight Slider";
import AvatarSet from "components/common/AvatarSet";
import ProfileHeader from "./ProfileHeader";
import { defaultUser } from "../../data";
import { defaultSpacing } from "utils/constants";
import MediaTabs from "./MediaTabs";
import ProfileAvatar from "components/common/ProfileAvatar";
import { RoutePath } from "utils/routes";
import ReactIcons from "utils/ReactIcons";
import { useNavigate } from "react-router";

const StyledBox = styled(Box)(({ theme }) => ({
	width: "100%",
	gap: "1rem",
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-start",
}));

function Profile() {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const navigate = useNavigate();

	return (
		<Grid
			container
			spacing={defaultSpacing}
			sx={{ padding: { xs: 0, md: "0 2rem", lg: "0 6rem" } }}
		>
			{/* profile Info */}
			<Grid item xs={12} md={12} sm={12} lg={12}>
				{/* profile header */}
				<ProfileHeader />
				{/* profile bio */}
				<Grid container sx={{ marginTop: { xs: 4.5, sm: 0 } }}>
					<Grid item xs={4} sm={3} md={4} lg={4}>
						<StyledBox
							sx={{
								justifyContent: "center",
								padding: { xs: "1rem", sm: "3rem 0rem" },
							}}
						>
							<ProfileAvatar
								data={defaultUser}
								sx={{
									width: { xs: 85, sm: 110, md: 154 },
									height: { xs: 85, sm: 110, md: 154 },
									border: "2px solid #ffff",
								}}
							/>
						</StyledBox>
					</Grid>
					{matchDownSm && (
						<Grid item xs={8} sm={9} md={8} lg={8}>
							<StyledBox sx={{ minHeight: "15vh", justifyContent: "center" }}>
								<Box
									display="flex"
									flexDirection="column"
									justifyContent="center"
									alignItems="center"
									gap="0.1rem"
								>
									<Typography variant="h4" fontSize="1.1rem">
										1,123
									</Typography>
									<Typography variant="p" fontSize="0.8rem">
										Posts
									</Typography>
								</Box>
								<Box
									display="flex"
									flexDirection="column"
									justifyContent="center"
									alignItems="center"
									gap="0.1rem"
								>
									<Typography variant="h4" fontSize="1.1rem">
										1.3 M
									</Typography>
									<Typography variant="p" fontSize="0.8rem">
										Followers
									</Typography>
								</Box>
								<Box
									display="flex"
									flexDirection="column"
									justifyContent="center"
									alignItems="center"
									gap="0.1rem"
								>
									<Typography variant="h4" fontSize="1.1rem">
										256
									</Typography>
									<Typography variant="p" fontSize="0.8rem">
										Following
									</Typography>
								</Box>
							</StyledBox>
						</Grid>
					)}
					<Grid item xs={12} sm={8} md={8} lg={8}>
						<StyledBox
							sx={{
								padding: { xs: "0rem 0.5rem", sm: "3rem 0rem" },
								flexDirection: "column",
								gap: { xs: "0.3rem", sm: "1rem" },
							}}
						>
							{!matchDownSm && (
								<>
									<StyledBox sx={{ gap: "0.7rem" }}>
										<Typography variant="userName" sx={{ fontSize: "1rem" }}>
											Jack Sparrow
										</Typography>
										{/* <Btn sx={{ padding: "0.2rem 1rem", fontSize: "0.9rem" }}>
											Follow
										</Btn>
										<Btn
											variant="outlined"
											sx={{ padding: "0.14rem 1.2rem", fontSize: "0.9rem" }}
										>
											Message
										</Btn> */}
										<Btn
											variant="outlined"
											sx={{ padding: "0.2rem 1rem", fontSize: "0.9rem" }}
										>
											Edit Profile
										</Btn>
										<Btn
											variant="outlined"
											sx={{ padding: "0.14rem 1.2rem", fontSize: "0.9rem" }}
										>
											Share Profile
										</Btn>
										<IconButton
											size="small"
											color="inherit"
											onClick={() =>
												navigate(`/${RoutePath.SETTINGS_EDIT_PROFILE}`)
											}
										>
											<ReactIcons.IoIosSettings size={27} />
										</IconButton>
									</StyledBox>
									<StyledBox>
										<Box display="flex" gap="0.5rem">
											<Typography variant="h4">1,123</Typography>
											<Typography variant="p">Posts</Typography>
										</Box>
										<Box display="flex" gap="0.5rem">
											<Typography variant="h4">1.3 M</Typography>
											<Typography variant="p">Followers</Typography>
										</Box>
										<Box display="flex" gap="0.5rem">
											<Typography variant="h4">256</Typography>
											<Typography variant="p">Following</Typography>
										</Box>
									</StyledBox>
								</>
							)}
							<StyledBox>
								<Typography variant="userName" sx={{ fontSize: "0.85rem" }}>
									Jack Sparrow
								</Typography>
							</StyledBox>
							<StyledBox>
								<Typography variant="p" color={theme.palette.grey[500]}>
									Blogger
								</Typography>
							</StyledBox>
							<StyledBox>
								<Typography variant="p">
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Laudantium totam sed praesentium dignissimos sapiente ducimus
									quidem atque?
								</Typography>
							</StyledBox>
							<StyledBox>
								<AvatarSet max={3} size={27} />
								<Typography variant="body">
									Followed By William, Clara and 30 others
								</Typography>
							</StyledBox>
							{matchDownSm && (
								<StyledBox sx={{ padding: "0.5rem 0" }}>
									{/* <Btn
										sx={{
											width: "100%",
										}}
									>
										Follow
									</Btn>
									<Btn
										variant="outlined"
										sx={{
											width: "100%",
										}}
									>
										Message
									</Btn> */}
									<Btn
										variant="outlined"
										sx={{
											width: "100%",
										}}
									>
										Edit Profile
									</Btn>
									<Btn
										variant="outlined"
										sx={{
											width: "100%",
										}}
									>
										Share Profile
									</Btn>
								</StyledBox>
							)}
						</StyledBox>
					</Grid>
				</Grid>
			</Grid>
			{/* story Heighlites */}
			<Grid item xs={12} md={12} sm={12} lg={12}>
				<StyledBox>
					<HighlightSlider />
				</StyledBox>
			</Grid>
			{/* post, tagged, reels */}
			<Grid item xs={12} md={12} sm={12} lg={12}>
				<MediaTabs />
			</Grid>
		</Grid>
	);
}

export default Profile;
