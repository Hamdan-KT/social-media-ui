import ReactIcons from "src/utils/ReactIcons";
import { RoutePath } from "src/utils/routes";
import {
	Avatar,
	IconButton,
	styled,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

const CommonBox = styled("div")(({ theme }) => ({
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "auto",
}));

const defaultStyle = (theme) => ({
	color: theme.palette.background.paper,
	cursor: "pointer",
	fontSize: "2rem",
});

function StoryHeader({
	story = [],
	activeItem = {},
	isPlaying = true,
	isMuted = false,
	isVideo = false,
	togglePlayPause = () => {},
	toggleMute = () => {},
}) {
	const theme = useTheme();
	const navigate = useNavigate();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<CommonBox
			sx={{
				flexDirection: "column",
				width: "100%",
				position: "absolute",
				top: 0,
				left: 0,
				zIndex: 5,
			}}
		>
			{/* story count and duration bars */}
			<CommonBox
				sx={{ width: "100%", gap: "4px", padding: "0 0.5rem", mt: "0.5rem" }}
			>
				{story?.items?.map((str, index) => (
					<CommonBox
						key={index}
						sx={{
							width: "100%",
							height: "2px",
							borderRadius: "50px",
							position: "relative",
							backgroundColor: "#a8b1bb99",
						}}
					>
						<CommonBox
							sx={{
								width:
									index < activeItem?.index
										? "100%"
										: index === activeItem?.index
										? "100%"
										: "0%",
								height: "2px",
								position: "absolute",
								left: 0,
								top: 0,
								borderRadius: "50px",
								backgroundColor: theme.palette.background.paper,
							}}
						></CommonBox>
					</CommonBox>
				))}
			</CommonBox>
			{/* profile details */}
			<CommonBox sx={{ justifyContent: "space-between", width: "100%" }}>
				<CommonBox sx={{ flexDirection: "column" }}>
					<CommonBox sx={{ gap: "0.5rem", padding: "0.5rem" }}>
						<Avatar sx={{ width: 33, height: 33 }} src={story?.avatar} />
						<Typography
							variant="userName"
							sx={{ color: theme.palette.background.paper }}
						>
							{story?.userName}
							<Typography
								variant="greyTags"
								sx={{
									color: theme.palette.grey[300],
									fontSize: "0.8rem",
									fontWeight: "medium",
									ml: 1,
								}}
							>
								2d
							</Typography>
						</Typography>
					</CommonBox>
				</CommonBox>
				<CommonBox sx={{ gap: "1rem", mr: "0.5rem" }}>
					{isVideo && (
						<>
							{isPlaying ? (
								<ReactIcons.FaPause
									style={{ ...defaultStyle(theme), fontSize: "1.5rem" }}
									onClick={togglePlayPause}
								/>
							) : (
								<ReactIcons.FaPlay
									style={{ ...defaultStyle(theme), fontSize: "1.2rem" }}
									onClick={togglePlayPause}
								/>
							)}
							{isMuted ? (
								<ReactIcons.ImVolumeMute
									style={{ ...defaultStyle(theme), fontSize: "1.3rem" }}
									onClick={toggleMute}
								/>
							) : (
								<ReactIcons.ImVolumeMute2
									style={{ ...defaultStyle(theme), fontSize: "1.3rem" }}
									onClick={toggleMute}
								/>
							)}
						</>
					)}
					<ReactIcons.MdMoreHoriz
						style={{ ...defaultStyle(theme), fontSize: "1.5rem" }}
					/>
					{matchDownSm && (
						<ReactIcons.IoClose
							style={defaultStyle(theme)}
							onClick={() => navigate(RoutePath.HOME)}
						/>
					)}
				</CommonBox>
			</CommonBox>
		</CommonBox>
	);
}

export default StoryHeader;
