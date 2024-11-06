import ReactIcons from "utils/ReactIcons";
import { Box, Typography, styled, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { postStages as ps } from "utils/constants";
import { setPostStages, cropPosts } from "app/slices/postSlice/postSlice";
import { getCroppedImg, getEditedImage } from "src/utils/common";
import { useState } from "react";
import DefaultLoader from "components/common/DefaultLoader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "src/api/postAPI";
import toast from "react-hot-toast";
import { clearPosts } from "src/app/slices/postSlice/postSlice";

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

function CreateHeader({ onClose }) {
	const theme = useTheme();
	const dispatch = useDispatch();
	const postStates = useSelector((state) => state.post);
	const [loading, setLoading] = useState(false);
	const queryClient = useQueryClient();

	// set cropped media to redux
	const handleCrop = async (postMedias) => {
		setLoading(true);
		await Promise.all(
			postMedias?.map(async (media) => ({
				...media,
				croppedUrl: await getCroppedImg(
					media?.url,
					media.croppedAreaPixels,
					media?.rotation,
					media?.flip
				),
			}))
		)
			.then((result) => {
				setLoading(false);
				return dispatch(cropPosts(result));
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	};

	const formattedPostData = async (postMedias) => {
		const formData = new FormData();
		let postData = {};
		setLoading(true);
		await Promise.all(
			postMedias?.map(async (media) => {
				formData.append(
					[media?.uID],
					await getEditedImage(media.croppedUrl, media?.customFilters)
				);
				postData[media?.uID] = { tags: media?.tags ?? [] };
			})
		)
			.then((result) => {
				console.log({ submit: result });
				for (const key in postStates?.postDetails) {
					formData.append(key, postStates?.postDetails[key]);
				}
				formData.append("postData", JSON.stringify(postData));
				// Convert FormData to an object
				const formDataObject = Object.fromEntries(formData.entries());
				console.log({ formDataObject });
				setLoading(false);
				return uploadPost.mutate(formData);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	};

	const uploadPost = useMutation({
		mutationKey: ["createPost"],
		mutationFn: (userData) => createPost(userData),
		onSuccess: (data) => {
			onClose();
			dispatch(clearPosts());
			queryClient.invalidateQueries({ queryKey: ["get-user-posts"] });
			toast.success(data?.message);
			// navigate(RoutePath.HOME, { replace: true });
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const handleStageChange = (type = "next") => {
		if (type === "next") {
			if (postStates?.postStages[ps.CROP]) {
				if (postStates?.postMedias?.length !== 0) {
					handleCrop(postStates?.postMedias);
				}
			} else if (postStates?.postStages[ps.EDIT]) {
				dispatch(setPostStages({ type: ps.SHARE, value: true }));
			} else {
				return formattedPostData(postStates?.postMedias);
			}
		} else {
			if (postStates?.postStages[ps.SHARE]) {
				dispatch(setPostStages({ type: ps.EDIT, value: true }));
			} else if (postStates?.postStages[ps.EDIT]) {
				dispatch(setPostStages({ type: ps.CROP, value: true }));
			} else {
				return;
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
				{postStates?.postStages[ps.CROP]
					? "Crop"
					: postStates?.postStages[ps.EDIT]
					? "Edit"
					: postStates?.postStages[ps.SHARE]
					? "Share"
					: ""}
			</Typography>
			{loading || uploadPost.isPending ? (
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
					{postStates?.postStages[ps.SHARE] ? "Share" : "Next"}
				</Typography>
				// <p>hello</p>
			)}
		</StyledHeader>
	);
}

export default CreateHeader;
