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
import { RoutePath } from "src/utils/routes";
import ReactIcons from "src/utils/ReactIcons";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "src/api/userAPI";
import FollowBtn from "src/components/common/FollowBtn";
import ImgWrapper from "src/components/common/ImgWrapper";
import Image from "src/components/common/Image";
import verifiedBadge from "assets/images/verifiedBadge.png";

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
	const user = useSelector((state) => state.user?.user);
	const { uid } = useParams();

	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ["get-user-profile", uid],
		queryFn: () => getUser(uid),
	});

	useEffect(() => {
		if (isSuccess) {
			console.log({ profile: data });
		}
	}, [isSuccess]);

	return (
		<Grid
			container
			spacing={defaultSpacing}
			sx={{ padding: { xs: 0, md: "0 2rem", lg: "0 6rem" } }}
		>
			{/* profile Info */}
			<Grid item xs={12} md={12} sm={12} lg={12}>
				{/* profile header */}
				<ProfileHeader data={data?.data} />
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
								profile={data?.data?.avatar}
								userName={data?.data?.userName}
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
										{data?.data?.postsCount}
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
										{data?.data?.followersCount}
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
										{data?.data?.followingCount}
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
											{data?.data?.userName}
										</Typography>
										<ImgWrapper sx={{ width: "1rem", height: "1rem" }}>
											<Image
												src={verifiedBadge}
												style={{
													display: "block",
													width: "100%",
													objectFit: "cover",
												}}
											/>
										</ImgWrapper>
										{data?.data?._id && data?.data?._id !== user?._id && (
											<>
												<FollowBtn
													isFollowing={data?.data?.isFollowing}
													followingStatus={data?.data?.followingStatus}
													isPublic={data?.data?.isPublic}
													userID={data?.data?._id}
													sx={{ padding: "0.1rem 1rem", fontSize: "0.9rem" }}
												/>
												{data?.data?.isPublic && (
													<Btn
														variant="outlined"
														sx={{
															padding: "0.14rem 1.2rem",
															fontSize: "0.9rem",
														}}
														onClick={() =>
															navigate(
																`/${RoutePath.MESSAGES}/${data?.data?._id}`
															)
														}
													>
														Message
													</Btn>
												)}
											</>
										)}
										{data?.data?._id && data?.data?._id === user?._id && (
											<>
												<Btn
													variant="outlined"
													sx={{ padding: "0.2rem 1rem", fontSize: "0.9rem" }}
													onClick={() =>
														navigate(`/${RoutePath.SETTINGS_EDIT_PROFILE}`)
													}
												>
													Edit Profile
												</Btn>
												<Btn
													variant="outlined"
													sx={{ padding: "0.14rem 1.2rem", fontSize: "0.9rem" }}
												>
													Share Profile
												</Btn>
											</>
										)}
										{data?.data?._id && data?.data?._id === user?._id && (
											<IconButton
												size="small"
												color="inherit"
												onClick={() =>
													navigate(`/${RoutePath.SETTINGS_EDIT_PROFILE}`)
												}
											>
												<ReactIcons.IoIosSettings size={27} />
											</IconButton>
										)}
									</StyledBox>
									<StyledBox>
										<Box display="flex" gap="0.5rem">
											<Typography variant="h4">
												{data?.data?.postsCount}
											</Typography>
											<Typography variant="p">Posts</Typography>
										</Box>
										<Box display="flex" gap="0.5rem">
											<Typography variant="h4">
												{data?.data?.followersCount}
											</Typography>
											<Typography variant="p">Followers</Typography>
										</Box>
										<Box display="flex" gap="0.5rem">
											<Typography variant="h4">
												{data?.data?.followingCount}
											</Typography>
											<Typography variant="p">Following</Typography>
										</Box>
									</StyledBox>
								</>
							)}
							<StyledBox>
								<Typography variant="userName" sx={{ fontSize: "0.85rem" }}>
									{data?.data?.name}
								</Typography>
							</StyledBox>
							<StyledBox>
								<Typography variant="p" color={theme.palette.grey[500]}>
									{data?.data?.role}
								</Typography>
							</StyledBox>
							<StyledBox>
								<Typography variant="p">
									{/* {data?.data?.bio} */}
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Laudantium totam sed praesentium dignissimos sapiente ducimus
									quidem atque?
								</Typography>
							</StyledBox>
							{data?.data?._id && data?.data?._id !== user?._id && (
								<StyledBox>
									<AvatarSet max={3} size={27} />
									<Typography variant="body">
										Followed By William, Clara and 30 others
									</Typography>
								</StyledBox>
							)}
							{matchDownSm && (
								<StyledBox sx={{ padding: "0.5rem 0" }}>
									{data?.data?._id && data?.data?._id !== user?._id && (
										<>
											<FollowBtn
												sx={{
													width: "100%",
												}}
												isFollowing={data?.data?.isFollowing}
												followingStatus={data?.data?.followingStatus}
												isPublic={data?.data?.isPublic}
												userID={data?.data?._id}
											/>
											{data?.data?.isPublic && (
												<Btn
													variant="outlined"
													sx={{
														width: "100%",
													}}
													onClick={() =>
														navigate(`/${RoutePath.MESSAGES}/${user?._id}`)
													}
												>
													Message
												</Btn>
											)}
										</>
									)}
									{data?.data?._id && data?.data?._id === user?._id && (
										<>
											<Btn
												variant="outlined"
												sx={{
													width: "100%",
												}}
												onClick={() =>
													navigate(`/${RoutePath.SETTINGS_EDIT_PROFILE}`)
												}
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
										</>
									)}
								</StyledBox>
							)}
						</StyledBox>
					</Grid>
				</Grid>
			</Grid>

			{data?.data?._id &&
			data?.data?._id !== user?._id &&
			!data?.data?.isPublic &&
			!data?.data?.isFollowing ? (
				<Grid
					item
					xs={12}
					md={12}
					sm={12}
					lg={12}
					sx={{ borderTop: `1px solid ${theme.palette.grey[300]}` }}
				>
					<StyledBox sx={{ justifyContent: "center" }}>
						<StyledBox
							sx={{
								width: "auto",
								borderRadius: "50%",
								border: `1.5px solid ${theme.palette.grey[500]}`,
								justifyContent: "center",
								padding: 2,
							}}
						>
							<ReactIcons.MdLock size={30} />
						</StyledBox>
						<StyledBox
							sx={{
								alignItems: "start",
								flexDirection: "column",
								gap: "0.2rem",
								width: "auto",
							}}
						>
							<Typography variant="h4" fontSize="1.1rem">
								This account is private
							</Typography>
							<Typography variant="greyTags" fontSize="0.8rem">
								Follow to see their photos and videos.
							</Typography>
						</StyledBox>
					</StyledBox>
					{/* {!matchDownSm && (
						<StyledBox sx={{ justifyContent: "center" }}>
							<FollowBtn
								isFollowing={data?.data?.isFollowing}
								followingStatus={data?.data?.followingStatus}
								isPublic={data?.data?.isPublic}
								userID={data?.data?._id}
								sx={{ padding: "0.1rem 1rem", fontSize: "0.9rem" }}
							/>
						</StyledBox>
					)} */}
				</Grid>
			) : (
				<>
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
				</>
			)}
		</Grid>
	);
}

export default Profile;
