import {
	Box,
	Button,
	DialogContent,
	styled,
	TextField,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import CustomModal from "components/common/Modal";
import { useDispatch, useSelector } from "react-redux";
import StoryView from "./StoryView";
import ReactIcons from "src/utils/ReactIcons";
import { createURLfromImage } from "src/utils/common";
import { v4 as uuidv4 } from "uuid";
import {
	clearStories,
	loadStories,
} from "src/app/slices/storySlice/storySlice";
import StoryHeader from "./Header";

const MainBox = styled(Box)(({ theme }) => ({
	width: "max-content",
	height: "max-content",
	display: "flex",
	padding: "0.2rem",
	background: theme.palette.background.paper,
	alignItems: "center",
	justifyContent: "center",
	flexDirection: "column",
	borderRadius: "20px",
}));

const ContentBox = styled(Box)(({ theme }) => ({
	width: "max-content",
	height: "80vh",
	aspectRatio: "9/16",
	display: "flex",
	background: theme.palette.background.paper,
	overflow: "hidden",
	borderRadius: "20px",
}));

function CreateStory({ open = false, onClose = () => {} }) {
	const theme = useTheme();
	const dispatch = useDispatch();
	const storyMedias = useSelector((state) => state.story.storyMedias);
	const aspectRatio = useSelector((state) => state.story.aspectRatio);
	const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));

	// handle selection of post images
	const handleSelectStoryFile = (e) => {
		const files = e.target.files;
		const selectedStories = Object.keys(files).map((key) => {
			const file = files[key];
			let fileType = "";

			if (file.type.startsWith("image/")) {
				fileType = "image";
			} else if (file.type.startsWith("video/")) {
				fileType = "video";
			}

			return {
				type: fileType,
				uID: uuidv4(),
				url: createURLfromImage(file),
				croppedUrl: "",
				croppedAreaPixels: {},
				crop: { x: 0, y: 0 },
				zoom: 1,
				rotation: 0,
				aspectRatio,
			};
		});
		dispatch(loadStories(selectedStories));
	};

	return (
		<CustomModal
			sx={{ background: "rgba(0, 0, 0, 0.3)" }}
			closeIcon={true}
			open={open}
			onClose={() => {
				onClose();
				dispatch(clearStories());
			}}
		>
			<MainBox>
				<StoryHeader onClose={onClose} />
				<ContentBox>
					{storyMedias?.length !== 0 ? (
						<StoryView />
					) : (
						<MainBox sx={{ width: "100%", height: "100%", gap: "1rem" }}>
							<ReactIcons.MdOutlinePhotoFilter size={matchDownMd ? 60 : 100} />
							<Typography
								variant="body"
								style={{ fontSize: matchDownMd ? "0.9em" : "1.1rem" }}
							>
								Drag photos and videos here
							</Typography>
							<Button
								component="label"
								for="storyFile"
								style={{
									background: theme.palette.primary.main,
									color: theme.palette.common.white,
									borderRadius: "8px",
									fontWeight: "bold",
									padding: "0.25rem 1rem",
									cursor: "pointer",
								}}
							>
								Select from computer
							</Button>
							<TextField
								id="storyFile"
								style={{ display: "none" }}
								onChange={handleSelectStoryFile}
								type="file"
								inputProps={{
									multiple: true,
									accept: "image/*, video/*",
								}}
							/>
						</MainBox>
					)}
				</ContentBox>
			</MainBox>
		</CustomModal>
	);
}

export default CreateStory;
