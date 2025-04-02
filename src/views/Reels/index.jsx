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
import ReelSlide from "./ReelSlide";
import ReelVideo from "./ReelVideo";
import ProfileAvatar from "src/components/common/ProfileAvatar";
import { defaultUser } from "src/data";
import FollowBtn from "src/components/common/FollowBtn";
import ReactIcons from "src/utils/ReactIcons";

const reels = [
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
		if (y <= -DRAG_BUFFER && currentIndex < reels.length - 1) {
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
				{reels.map((reel, index) => (
					<ReelSlide
						reel={reel}
						key={index}
						isActive={currentIndex === index}
					/>
				))}
			</motion.div>
		</CommonBox>
	);
};

export default Reels;
