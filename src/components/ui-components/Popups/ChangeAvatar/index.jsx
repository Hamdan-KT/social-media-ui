import React, { useCallback, useState } from "react";
import CustomModal from "components/common/Modal";
// import ListSection from "./ListSection";
import {
	Box,
	styled,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import BottomSheet from "components/common/BottomSheet";
import { useDispatch, useSelector } from "react-redux";
import Cropper from "react-easy-crop";
import DefaultLoader from "src/components/common/DefaultLoader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserAvatar } from "src/api/userAPI";
import toast from "react-hot-toast";
import { getCroppedImgFile } from "src/utils/common";

const Wrappper = styled("div")(({ theme }) => ({
	height: "72%",
	position: "relative",
	display: "flex",
	flexDirection: "column",
	alignItems: "start",
	justifyContent: "start",
	aspectRatio: 1 / 1,
	background: theme.palette.background.paper,
	borderRadius: 15,
	overflow: "hidden",
}));

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

const CommonBox = styled("div")(({ theme }) => ({
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
	gap: "1rem",
}));

function ChangeAvatar({ open = false, onClose = () => {}, imgUrl = "" }) {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
	// const [croppedImgFile, setCroppedImgFile] = useState("");

	const queryClient = useQueryClient();

	const changeProfileAvatar = useMutation({
		mutationKey: ["change-user-avatar"],
		mutationFn: async (imgUrl) => {
			const file = await getCroppedImgFile(imgUrl, croppedAreaPixels);
			return updateUserAvatar(file);
		},
		onSuccess: (data) => {
			toast.success(data?.message);
			queryClient.invalidateQueries({ queryKey: ["currentuser"] });
			onClose();
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	// handling crop
	const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
		setCroppedAreaPixels(croppedAreaPixels);
	}, []);

	return (
		<>
			{matchDownSm ? (
				<BottomSheet
					open={open}
					onClose={onClose}
					title="Change Avatar"
					actionLoading={changeProfileAvatar.isPending}
					actionButton={
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
							onClick={() => changeProfileAvatar.mutate(imgUrl)}
						>
							Save
						</Typography>
					}
				>
					<CommonBox sx={{ position: "relative", height: "55vh" }}>
						<Cropper
							image={imgUrl}
							aspect={1 / 1}
							crop={crop}
							zoom={zoom}
							onZoomChange={setZoom}
							onCropComplete={onCropComplete}
							onCropChange={setCrop}
							style={{
								containerStyle: {
									background: "black",
								},
							}}
						/>
					</CommonBox>
				</BottomSheet>
			) : (
				<CustomModal closeIcon={true} open={open} onClose={onClose}>
					<Wrappper sx={{ padding: "0.5rem" }}>
						<StyledHeader sx={{ mb: 1 }}>
							<Typography variant="h4" sx={{ userSelect: "none" }}>
								Change Avatar
							</Typography>
							{changeProfileAvatar.isPending ? (
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
									onClick={() => changeProfileAvatar.mutate(imgUrl)}
								>
									Save
								</Typography>
							)}
						</StyledHeader>
						<CommonBox
							sx={{
								position: "relative",
								height: "100%",
								overflow: "hidden",
								borderRadius: "12px",
							}}
						>
							<Cropper
								image={imgUrl}
								aspect={1 / 1}
								zoom={zoom}
								onZoomChange={setZoom}
								crop={crop}
								onCropComplete={onCropComplete}
								onCropChange={setCrop}
								style={{
									containerStyle: {
										background: "black",
									},
								}}
							/>
						</CommonBox>
					</Wrappper>
				</CustomModal>
			)}
		</>
	);
}

export default ChangeAvatar;
