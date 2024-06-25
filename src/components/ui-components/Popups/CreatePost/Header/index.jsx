import ReactIcons from "utils/ReactIcons";
import {
	Box,
	CircularProgress,
	Typography,
	styled,
	useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { postStages as ps } from "utils/constants";
import { setPostStages, cropPosts } from "app/slices/postSlice/postSlice";
import { getCroppedImg } from "utils/common";
import { useState } from "react";

const StyledHeader = styled(Box)(({ theme }) => ({
	width: "100%",
	height: "max-content",
	display: "flex",
	gap: "0.5rem",
	padding: "0.5rem 1rem",
	alignItems: "center",
	justifyContent: "space-between",
	borderBottom: `1px solid ${theme.palette.grey[300]}`,
}));

function CreateHeader() {
	const theme = useTheme();
	const dispatch = useDispatch();
	const postStates = useSelector((state) => state.post);
	const [loading, setLoading] = useState(false);

	// set cropped media to redux
	const handleCrop = async (postMedias) => {
		setLoading(true);
		await Promise.all(
			postMedias?.map(async (media) => ({
				...media,
				croppedUrl: await getCroppedImg(media?.url, media.croppedAreaPixels),
			}))
		)
			.then((result) => {
				setLoading(false);
				return dispatch(cropPosts(result));
			})
			.catch((error) => {
				console.log(error)
				setLoading(false);
			});
	};

	const handleStageChange = (type = "next") => {
		if (type === "next") {
			if (postStates?.postStages[ps.CROP]) {
				if (postStates?.postMedias?.length !== 0) {
					handleCrop(postStates?.postMedias);
				}
			} else if (postStates?.postStages[ps.EDIT]) {
				dispatch(setPostStages({ type: ps.SHARE, value: true }));
			} else return;
		} else {
			if (postStates?.postStages[ps.SHARE]) {
				dispatch(setPostStages({ type: ps.EDIT, value: true }));
			} else if (postStates?.postStages[ps.EDIT]) {
				dispatch(setPostStages({ type: ps.CROP, value: true }));
			} else return;
		}
	};

	console.log(postStates?.postMedias?.length !== 0);

	return (
		<StyledHeader>
			<ReactIcons.IoArrowBack
				style={{ fontSize: "1.7rem", cursor: "pointer" }}
				onClick={() => handleStageChange("prev")}
			/>
			<Typography variant="h4" sx={{userSelect: "none"}}>
				{postStates?.postStages[ps.CROP]
					? "Crop"
					: postStates?.postStages[ps.EDIT]
					? "Edit"
					: postStates?.postStages[ps.SHARE]
					? "Share"
					: ""}
			</Typography>
			{loading ? (
				<CircularProgress thickness={6} size={20} />
			) : (
				<Typography
					variant="body"
						sx={{
						userSelect: "none",
						cursor: "pointer",
						padding: "0 0.3rem",
						fontWeight: 600,
						"&:hover": { color: theme.palette.text.primary },
					}}
					color={theme.palette.primary.main}
					onClick={() => handleStageChange("next")}
				>
					{postStates?.postStages[ps.SHARE] ? "Share" : "Next"}
				</Typography>
				// <p>hello</p>
			)}
		</StyledHeader>
	);
}

export default CreateHeader;
