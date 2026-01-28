import { styled, useMediaQuery, useTheme } from "@mui/material";
import ReelSlide from "./ReelSlide";

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

const Reels = () => {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<CommonBox
			sx={{
				width: "100%",
				maxHeight: { xs: "92vh", sm: "96vh" },
				position: "relative",
				gap: "0.7rem",
				flexDirection: "column",
				justifyContent: "start",
				overflowY: "scroll",
				overflowX: "hidden",
				scrollSnapType: "y mandatory",
			}}
			className="scrollbar-hide"
		>
			{reels.map((reel, index) => (
				<ReelSlide reel={reel} key={index} />
			))}
		</CommonBox>
	);
};

export default Reels;
