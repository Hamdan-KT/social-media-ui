import ReactIcons from "utils/ReactIcons";
import { Box, Typography, styled, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { storyStages } from "src/utils/constants";
import { getCroppedImg, getEditedImage } from "src/utils/common";
import { useState } from "react";
import DefaultLoader from "components/common/DefaultLoader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
	clearStories,
	cropStories,
	setStoryStages,
} from "src/app/slices/storySlice/storySlice";
import { createStory } from "src/api/storyAPI";

const StyledHeader = styled(Box)(({ theme }) => ({
	width: "100%",
	height: "max-content",
	display: "flex",
	gap: "0.5rem",
	padding: "0.5rem 1rem",
	alignItems: "center",
	justifyContent: "space-between",
}));

function StoryHeader({ onClose }) {
	const theme = useTheme();
	const dispatch = useDispatch();
	const storyStates = useSelector((state) => state.story);
	const [loading, setLoading] = useState(false);
	const queryClient = useQueryClient();

	// set cropped media to redux
	const handleCrop = async (storyMedias) => {
		setLoading(true);
		await Promise.all(
			storyMedias?.map(async (media) => ({
				...media,
				croppedUrl: await getCroppedImg(
					media?.url,
					media.croppedAreaPixels,
					media?.rotation
				),
			}))
		)
			.then((result) => {
				setLoading(false);
				return dispatch(cropStories(result));
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	};

	const formattedPostData = async (storyMedias) => {
		const formData = new FormData();
		setLoading(true);
		await Promise.all(
			storyMedias?.map(async (media) => {
				formData.append(
					[media?.uID],
					await getEditedImage(media.croppedUrl, media?.customFilters)
				);
			})
		)
			.then((result) => {
				console.log({ submit: result });
				for (const key in storyStates?.storyDetails) {
					formData.append(key, storyStates?.storyDetails[key]);
				}
				// Convert FormData to an object
				const formDataObject = Object.fromEntries(formData.entries());
				console.log({ formDataObject });
				setLoading(false);
				return uploadStory.mutate(formData);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	};

	const uploadStory = useMutation({
		mutationKey: ["createStory"],
		mutationFn: (userData) => createStory(userData),
		onSuccess: (data) => {
			onClose();
			dispatch(clearStories());
			queryClient.invalidateQueries({ queryKey: ["get-user-story"] });
			toast.success(data?.message);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const handleStageChange = (type = "next") => {
		if (type === "next") {
			if (storyStates?.storyStages[storyStages.CROP]) {
				if (storyStates?.storyMedias?.length !== 0) {
					handleCrop(storyStates?.storyMedias);
				}
			} else if (storyStates?.storyStages[storyStages.EDIT]) {
				return formattedPostData(storyStates?.storyMedias);
			}
		} else {
			if (storyStates?.storyStages[storyStages.EDIT]) {
				dispatch(setStoryStages({ type: storyStages.CROP, value: true }));
			} else {
				onClose();
			}
		}
	};

	return (
		<StyledHeader>
			<ReactIcons.IoArrowBack
				style={{ fontSize: "1.7rem", cursor: "pointer" }}
				onClick={() => handleStageChange("prev")}
			/>
			<Typography variant="h4" sx={{ userSelect: "none" }}>
				{storyStates?.storyStages[storyStages.CROP]
					? "Crop"
					: storyStates?.storyStages[storyStages.EDIT]
					? "Edit"
					: ""}
			</Typography>
			{loading || uploadStory.isPending ? (
				<DefaultLoader size={23} />
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
					{storyStates?.storyStages[storyStages.EDIT] ? "Share" : "Next"}
				</Typography>
			)}
		</StyledHeader>
	);
}

export default StoryHeader;
