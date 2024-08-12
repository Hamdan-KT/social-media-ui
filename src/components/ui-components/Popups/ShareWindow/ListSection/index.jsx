import ReactIcons from "utils/ReactIcons";
import {
	Box,
	Grid,
	Typography,
	styled,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React from "react";
import MobileSearchBar from "components/ui-components/MobileSearchBar/MobileSearchBar";
import ShareBottomBar from "../bottomBar";
import UserList from "components/ui-components/UserList";
import { Users, userStories } from "src/data";
import ShareHeader from "../header";
import ProfileAvatar from "components/common/ProfileAvatar";

const CommonBox = styled("div")(({ theme }) => ({
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
}));

const StyledTickIcon = styled(Box)(({ theme }) => ({
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "auto",
	borderRadius: "50%",
	background: theme.palette.background.paper,
}));

function ListSection() {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	return (
		<>
			<ShareHeader />
			<CommonBox sx={{ p: 1.5, pb: 0 }}>
				<MobileSearchBar
					inputProps={{ placeholder: "Search" }}
					listWrapperStyle={{
						height: { xs: "73.4vh", sm: "calc(100vh - 27rem)"},
						background: "red",
					}}
				/>
			</CommonBox>
			<CommonBox
				className="scrollbar-hide"
				sx={{
					height: matchDownSm ? "calc(100% - 10.6rem)" : "calc(100% - 13.2rem)",
					overflowY: "scroll",
					alignItems: "start",
					justifyContent: "start",
					p: 0.5,
				}}
			>
				{/* <UserList data={[...Users, ...Users]} sx={{ maxWidth: "100%" }} /> */}
				<Grid container>
					{[...userStories, ...userStories]?.map((story, ind) => (
						<Grid item xs={4} sm={3} key={ind}>
							<CommonBox
								sx={{
									p: 0.5,
									display: "flex",
									height: "max-content",
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "center",
									textAlign: "center",
									width: "100%",
								}}
							>
								<ProfileAvatar
									data={story}
									storyView={false}
									sx={{
										width: { xs: 73, sm: 75 },
										height: { xs: 73, sm: 75 },
										border: "none",
										cursor: "pointer",
									}}
									badge={true}
									badgeProps={{
										badgeContent: (
											<StyledTickIcon>
												<ReactIcons.IoIosCheckmarkCircle
													size={18}
													style={{ color: theme.palette.primary.main }}
												/>
											</StyledTickIcon>
										),
									}}
								/>
								<Typography
									noWrap
									variant="p"
									sx={{
										fontSize: { xs: "11px" },
										userSelect: "none",
										width: "5rem",
									}}
								>
									{story.name}
								</Typography>
							</CommonBox>
						</Grid>
					))}
				</Grid>
			</CommonBox>
			<ShareBottomBar />
		</>
	);
}

export default ListSection;
