import {
	Checkbox,
	IconButton,
	styled,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React, { useRef } from "react";
import ReelVideo from "../ReelVideo";
import ProfileAvatar from "src/components/common/ProfileAvatar";
import { defaultUser } from "src/data";
import FollowBtn from "src/components/common/FollowBtn";
import ReactIcons from "src/utils/ReactIcons";

const CommonBox = styled("div")(({ theme }) => ({
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "auto",
}));

function ReelSlide({ reel = "" }) {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<CommonBox
			sx={{
				width: { xs: "100%", sm: "auto" },
				maxWidth: { xs: "100%", sm: "100%" },
				minHeight: { xs: "92vh", sm: "96vh" },
				height: { xs: "92vh", sm: "96vh" },
				borderRadius: "8px",
				position: "relative",
			}}
		>
			<ReelVideo src={reel} />
			<CommonBox
				sx={{
					gap: "0.5rem",
					position: "absolute",
					left: { xs: "15px", sm: "15px" },
					bottom: { xs: "15px", sm: "15px" },
				}}
			>
				<ProfileAvatar
					profile={defaultUser?.profile}
					userName={defaultUser?.name}
					sx={{ width: 33, height: 33 }}
					containerSx={{ padding: { xs: "2px" } }}
				/>
				<Typography
					variant="userName"
					sx={{ color: theme.palette.background.paper }}
				>
					{"jack sparrow"}
				</Typography>
				&#183;
				<FollowBtn
					// isFollowing={data?.data?.isFollowing}
					// followingStatus={data?.data?.followingStatus}
					// isPublic={data?.data?.isPublic}
					// userID={data?.data?._id}
					sx={{
						padding: { xs: "0rem 0.5rem", sm: "0.1rem 1rem" },
						fontSize: { xs: "0.85rem", sm: "0.9rem" },
					}}
				/>
			</CommonBox>
			<CommonBox
				sx={{
					flexDirection: "column",
					gap: "0.5rem",
					height: "100%",
					justifyContent: "flex-end",
					position: { xs: "absolute", sm: "relative" },
					right: "5px",
					bottom: "30px",
				}}
			>
				<CommonBox sx={{ flexDirection: "column" }}>
					<Checkbox
						size="small"
						aria-label="like"
						icon={
							<ReactIcons.AiOutlineHeart
								style={{
									color: matchDownSm
										? `${theme.palette.background.paper}`
										: `${theme.palette.text.dark}`,
									fontSize: 28,
								}}
							/>
						}
						checkedIcon={
							<ReactIcons.AiFillHeart
								style={{
									color: matchDownSm
										? `${theme.palette.error.main}`
										: `${theme.palette.error.main}`,
									fontSize: 28,
								}}
							/>
						}
					/>
					<Typography
						variant="userName"
						sx={{
							color: matchDownSm
								? `${theme.palette.background.paper}`
								: `${theme.palette.text.dark}`,
						}}
					>
						{"18.1k"}
					</Typography>
				</CommonBox>
				<CommonBox sx={{ flexDirection: "column" }}>
					<IconButton aria-label="comment">
						<ReactIcons.RiChat3Line
							style={{
								color: matchDownSm
									? `${theme.palette.background.paper}`
									: `${theme.palette.text.dark}`,
								fontSize: 25,
								transform: "scaleX(-1)",
							}}
						/>
					</IconButton>
					<Typography
						variant="userName"
						sx={{
							color: matchDownSm
								? `${theme.palette.background.paper}`
								: `${theme.palette.text.dark}`,
						}}
					>
						{1286}
					</Typography>
				</CommonBox>
				<CommonBox sx={{ flexDirection: "column" }}>
					<IconButton aria-label="share">
						<ReactIcons.LuSend
							style={{
								color: matchDownSm
									? `${theme.palette.background.paper}`
									: `${theme.palette.text.dark}`,
								fontSize: 24,
								transform: "rotate(20deg)",
							}}
						/>
					</IconButton>
					<Typography
						variant="userName"
						sx={{
							color: matchDownSm
								? `${theme.palette.background.paper}`
								: `${theme.palette.text.dark}`,
						}}
					>
						104
					</Typography>
				</CommonBox>
				<CommonBox>
					<Checkbox
						sx={{ ml: "auto" }}
						aria-label="save"
						icon={
							<ReactIcons.RiBookmarkLine
								style={{
									color: matchDownSm
										? `${theme.palette.background.paper}`
										: `${theme.palette.text.dark}`,
									fontSize: 25,
								}}
							/>
						}
						checkedIcon={
							<ReactIcons.RiBookmarkFill
								style={{
									color: matchDownSm
										? `${theme.palette.background.paper}`
										: `${theme.palette.text.dark}`,
									fontSize: 25,
								}}
							/>
						}
					/>
				</CommonBox>
				<CommonBox>
					<IconButton aria-label="share">
						<ReactIcons.MdMoreHoriz
							style={{
								color: matchDownSm
									? `${theme.palette.background.paper}`
									: `${theme.palette.text.dark}`,
								fontSize: 24,
							}}
						/>
					</IconButton>
				</CommonBox>
			</CommonBox>
		</CommonBox>
	);
}

export default ReelSlide;
