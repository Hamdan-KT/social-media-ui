import StoryView from "src/components/ui-components/Popups/CreateStory/StoryView";
import {
	Avatar,
	Box,
	Button,
	IconButton,
	styled,
	Typography,
	useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RoutePath } from "src/utils/routes";
import { storyStages } from "src/utils/constants";
import {
	clearStories,
	cropStories,
	setStoryStages,
} from "src/app/slices/storySlice/storySlice";
import { getCroppedImg, getEditedImage } from "src/utils/common";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import DefaultLoader from "src/components/common/DefaultLoader";
import ReactIcons from "src/utils/ReactIcons";
import { createStory } from "src/api/storyAPI";

const CommonBox = styled(Box)(({ theme }) => ({
	width: "100%",
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const MainBox = styled(Box)(({ theme }) => ({
	width: "100%",
	height: "auto",
	aspectRatio: 9 / 16,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	position: "relative",
	flexDirection: "column",
	overflow: "hidden",
	background: theme.palette.background.paper,
}));

const StyledButton = styled(Button)(({ theme }) => ({
	borderRadius: 20,
	width: "100%",
	background: theme.palette.grey[800],
	color: theme.palette.common.white,
	// fontWeight: "bold",
	"&:hover": {
		background: theme.palette.grey[500],
		color: theme.palette.common.white,
	},
}));

function CreateStoryMobile() {
	const theme = useTheme();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const storyStates = useSelector((state) => state.story);
	const user = useSelector((state) => state.user?.user);
	const [loading, setLoading] = useState(false);
	const queryClient = useQueryClient();

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

	const formattedStoryData = async (storyMedias) => {
		const formData = new FormData();
		setLoading(true);
		await Promise.all(
			storyMedias?.map(async (media) => {
				formData.append([media?.uID], await getEditedImage(media.croppedUrl));
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
			dispatch(clearStories());
			queryClient.invalidateQueries({ queryKey: ["get-user-story"] });
			toast.success(data?.message);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return (
		<CommonBox
			sx={{
				flexDirection: "column",
				justifyContent: "start",
				height: "100vh",
				background: "black",
			}}
		>
			<MainBox>
				<StoryView />
			</MainBox>
			{storyStates?.storyStages[storyStages.CROP] && (
				<CommonBox sx={{ p: 1, gap: "0.5rem" }}>
					<StyledButton
						variant="contained"
						onClick={() => navigate(RoutePath.HOME, { replace: true })}
					>
						Cancel
					</StyledButton>
					<StyledButton
						variant="contained"
						onClick={() => handleCrop(storyStates?.storyMedias)}
					>
						{loading ? <DefaultLoader size={23} /> : "Crop"}
					</StyledButton>
				</CommonBox>
			)}
			{storyStates?.storyStages[storyStages.EDIT] && (
				<CommonBox sx={{ p: 1, gap: "0.5rem" }}>
					<StyledButton variant="contained">
						<>
							<Avatar sx={{ width: 25, height: 25, mr: 1 }} />
							Mention
						</>
					</StyledButton>
					<StyledButton
						variant="contained"
						onClick={() => formattedStoryData(storyStates?.storyMedias)}
					>
						{loading || uploadStory.isPending ? (
							<DefaultLoader size={23} />
						) : (
							<>
								<Avatar
									src={user?.avatar}
									alt={user?.userName}
									sx={{ width: 25, height: 25, mr: 1 }}
								/>
								Your Story
							</>
						)}
					</StyledButton>
				</CommonBox>
			)}
		</CommonBox>
	);
}

export default CreateStoryMobile;
