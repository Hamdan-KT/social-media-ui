import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import {
	Checkbox,
	IconButton,
	styled,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import Video from "src/components/common/Video";
import ReactIcons from "src/utils/ReactIcons";
import ProfileAvatar from "src/components/common/ProfileAvatar";
import { defaultUser } from "src/data";
import FollowBtn from "src/components/common/FollowBtn";

const videos = [
	"https://res.cloudinary.com/instogram-media/video/upload/v1742455981/AdobeStock_548263057_Video_HD_Preview_qxdags.mp4",
	"https://res.cloudinary.com/instogram-media/video/upload/v1741199496/AdobeStock_1307647179_Video_HD_Preview_idieyj.mp4",
	"https://res.cloudinary.com/instogram-media/video/upload/v1741199496/AdobeStock_681706561_Video_HD_Preview_myswl0.mp4",
	"https://res.cloudinary.com/instogram-media/video/upload/v1741199496/AdobeStock_683939000_Video_HD_Preview_qxwrhw.mp4",
	"https://res.cloudinary.com/instogram-media/video/upload/v1741199495/AdobeStock_620561477_Video_HD_Preview_q517ql.mp4",
	"https://res.cloudinary.com/instogram-media/video/upload/v1741199495/AdobeStock_833500833_Video_HD_Preview_ie50ki.mp4",
	"https://res.cloudinary.com/instogram-media/video/upload/v1741199496/AdobeStock_1307647179_Video_HD_Preview_idieyj.mp4",
	"https://res.cloudinary.com/instogram-media/video/upload/v1741199496/AdobeStock_681706561_Video_HD_Preview_myswl0.mp4",
	"https://res.cloudinary.com/instogram-media/video/upload/v1741199496/AdobeStock_683939000_Video_HD_Preview_qxwrhw.mp4",
	"https://res.cloudinary.com/instogram-media/video/upload/v1741199495/AdobeStock_620561477_Video_HD_Preview_q517ql.mp4",
	"https://res.cloudinary.com/instogram-media/video/upload/v1741199495/AdobeStock_833500833_Video_HD_Preview_ie50ki.mp4",
];

const CommonBox = styled("div")(({ theme }) => ({
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "auto",
}));

const DRAG_BUFFER = 30;

const Reels = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const containerRef = useRef(null);
	const theme = useTheme();
	const dragY = useMotionValue(0);
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

	const onDragEnd = () => {
		const y = dragY.get();
		console.log({ y });
		console.log("y <= -DRAG_BUFFER", y <= -DRAG_BUFFER);
		console.log("y >= DRAG_BUFFER", y >= DRAG_BUFFER);
		if (y <= -DRAG_BUFFER && currentIndex < videos.length - 1) {
			setCurrentIndex((pv) => pv + 1);
		} else if (y >= DRAG_BUFFER && currentIndex > 0) {
			setCurrentIndex((pv) => pv - 1);
		}
	};

	// Handle scroll to change videos
	useEffect(() => {
		const handleWheel = (event) => {
			console.log(event);
			console.log(event.deltaY);
			// if (event.deltaY > 0) {
			// 	setCurrentIndex((prev) => Math.min(prev + 1, videos.length - 1));
			// } else {
			// 	setCurrentIndex((prev) => Math.max(prev - 1, 0));
			// }
		};

		const container = containerRef.current;
		if (container) container.addEventListener("wheel", handleWheel);

		return () => {
			if (container) container.removeEventListener("wheel", handleWheel);
		};
	}, []);

	return (
		<CommonBox
			ref={containerRef}
			sx={{
				width: "100%",
				maxHeight: { xs: "92vh", sm: "96vh" },
				overflow: "hidden",
				position: "relative",
				gap: "0.7rem",
				flexDirection: "column",
				justifyContent: "start",
			}}
		>
			<motion.div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "start",
					position: "relative",
					y: dragY,
					width: "100%",
					height: "auto",
					flexDirection: "column",
				}}
				drag="y"
				animate={{ translateY: `-${currentIndex * (matchDownSm ? 92 : 96)}vh` }}
				transition={{
					y: { type: "spring", stiffness: 300, damping: 30 },
				}}
				onDragEnd={onDragEnd}
				dragConstraints={{ top: 0, bottom: 0 }}
			>
				{videos.map((video, index) => (
					<CommonBox
						key={index}
						sx={{
							width: { xs: "100%", sm: "auto" },
							height: { xs: "92vh", sm: "96vh" },
							aspectRatio: "9/16",
							borderRadius: "8px",
							position: "relative",
						}}
					>
						<CommonBox
							sx={{
								width: "auto",
								height: "100%",
								padding: { xs: "0", sm: "0.8rem" },
							}}
						>
							<Video
								src={video}
								controls={false}
								autoPlay={true}
								loop={true}
								playsInline
								// onLoadedMetadata={handleMetadataLoad}
								draggable={false}
								style={{
									width: "auto",
									height: "100%",
									objectFit: "cover",
									display: "flex",
									boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
									borderRadius: "8px",
									userSelect: "none",
								}}
							/>
						</CommonBox>
						<CommonBox
							sx={{
								gap: "0.5rem",
								position: "absolute",
								left: { xs: "15px", sm: "30px" },
								bottom: { xs: "15px", sm: "30px" },
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
													? `${theme.palette.background.paper}`
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
				))}
			</motion.div>
		</CommonBox>
	);
};

export default Reels;
