/* eslint-disable react-hooks/exhaustive-deps */
import Slider from "components/common/Carousel/Carousel";
import Slide from "components/common/Carousel/Slide";
import {
	Box,
	IconButton,
	Slider as MUISlider,
	Tooltip,
	Typography,
	styled,
	useTheme,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import PopOver from "components/common/Popover";
import ReactIcons from "utils/ReactIcons";
import { useDispatch, useSelector } from "react-redux";
import {
	setAspectRatioVal,
	setCroppedAreaPixels,
	setFlipVal,
	setRotationVal,
	setActivePost,
	setCropVal,
	setZoomVal,
} from "app/slices/postSlice/postSlice";
import { postStages as ps } from "utils/constants";

const MainBox = styled(Box)(({ theme }) => ({
	width: "auto",
	height: "74vh",
	aspectRatio: 1 / 1,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	position: "relative",
	flexDirection: "column",
	background: theme.palette.background.paper,
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
	color: theme.palette.text.primary,
	"&:hover": {
		background: theme.palette.common.black,
		color: theme.palette.common.white,
	},
}));

const StyledPopoverBox = styled(Box)(({ theme }) => ({
	width: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	flexDirection: "column",
	padding: "0.5rem",
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
	width: "100%",
	display: "flex",
	alignItems: "center",
	justifyContent: "start",
	flexDirection: "row",
	padding: "0.5rem",
	borderRadius: "7px",
	cursor: "pointer",
	gap: "0.5rem",
	"&:hover": {
		background: theme.palette.grey[200],
	},
}));

const aspectRatios = [
	{
		Icon: <ReactIcons.MdCropDin size={23} />,
		value: 1 / 1,
		label: "1:1",
	},
	{
		Icon: <ReactIcons.MdCropPortrait size={23} />,
		value: 4 / 5,
		label: "4:5",
	},
	{
		Icon: <ReactIcons.MdCrop32 size={23} />,
		value: 16 / 9,
		label: "16:9",
	},
];

function PostView() {
	const theme = useTheme();
	const dispatch = useDispatch();
	const postStates = useSelector((state) => state.post);
	// refs
	const aspectRatioMenuRef = useRef();

	// test useEffect
	useEffect(() => {
		console.log(postStates.activePost?.crop);
		console.log(postStates.activePost);
	}, [postStates.activePost?.flip, postStates.activePost]);

	// handle post slide view change to get current item to manage values for each one
	const onSlideChange = (activeIndex) =>
		dispatch(setActivePost(postStates.postMedias[activeIndex]));
	// handling crop
	const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
		console.log(croppedArea, croppedAreaPixels);
		dispatch(
			setCroppedAreaPixels({
				uID: postStates.activePost?.uID,
				croppedAreaPixels,
			})
		);
	}, []);
	// handling media Rotation
	const onRotationChange = (rotation) => {
		dispatch(
			setRotationVal({
				uID: postStates.activePost?.uID,
				rotation: rotation == 360 ? 90 : rotation + 90,
			})
		);
	};
	// handling media Flip
	const handleFlip = (type) => {
		if (type == "Horizontal") {
			dispatch(
				setFlipVal({
					uID: postStates.activePost?.uID,
					flip: {
						x: postStates.activePost?.flip?.x == 1 ? -1 : 1,
						y: postStates.activePost?.flip?.y,
					},
				})
			);
		} else {
			dispatch(
				setFlipVal({
					uID: postStates.activePost?.uID,
					flip: {
						x: postStates.activePost?.flip?.x,
						y: postStates.activePost?.flip?.y == 1 ? -1 : 1,
					},
				})
			);
		}
	};

	return (
		<MainBox>
			<Slider
				sx={{ width: "100%", height: "100%" }}
				onSlideChange={onSlideChange}
				disableDrag={true}
			>
				{Array.isArray(postStates.postMedias) &&
					postStates.postMedias?.map((media, ind) => (
						<Slide
							key={media.uID}
							sx={{
								width: "100%",
								height: "100%",
								display: "flex",
								gap: "0.5rem",
								alignItems: "center",
								justifyContent: "center",
								position: "relative",
								overflow: "hidden",
								background: "black",
							}}
						>
							{postStates.postStages[ps.CROP] ? (
								<Cropper
									image={media.url}
									crop={postStates.activePost?.crop}
									zoom={postStates.activePost?.zoom}
									rotation={postStates.activePost?.rotation}
									aspect={postStates.aspectRatio}
									onCropComplete={onCropComplete}
									onCropChange={(crop) => {
										dispatch(
											setCropVal({ uID: postStates.activePost?.uID, crop })
										);
									}}
									onZoomChange={(zoom) => {
										dispatch(
											setZoomVal({ uID: postStates.activePost?.uID, zoom })
										);
									}}
									style={{
										containerStyle: {
											background: "black",
										},
										mediaStyle: {
											scale: `${media.flip?.x} ${media.flip?.y}`,
										},
									}}
								/>
							) : (
								<img
									draggable={false}
									src={media?.croppedUrl}
									className={media.filterClassName}
									style={{
										display: "block",
										height: "100%",
										width: "100%",
										objectFit: "contain",
										scale: `${media.flip?.x} ${media.flip?.y}`,
									}}
								/>
							)}
						</Slide>
					))}
			</Slider>
			{postStates.postStages[ps.CROP] && (
				<Box
					sx={{
						display: "flex",
						width: "100%",
						alignItems: "center",
						justifyContent: "space-between",
						p: "0.2rem 0.5rem",
					}}
				>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							gap: "0.5rem",
						}}
					>
						<PopOver
							ref={aspectRatioMenuRef}
							Button={
								<Tooltip title="Crop" placement="top" arrow>
									<StyledIconButton>
										<ReactIcons.LuCrop size={17} />
									</StyledIconButton>
								</Tooltip>
							}
						>
							<StyledPopoverBox>
								{aspectRatios.map((ratio, ind) => (
									<StyledTypography
										key={ind}
										onClick={() => {
											dispatch(setAspectRatioVal({ ratio: ratio.value }));
											aspectRatioMenuRef.current?.handleClose();
										}}
									>
										{ratio.Icon}
										{ratio.label}
									</StyledTypography>
								))}
							</StyledPopoverBox>
						</PopOver>
						<PopOver
							Button={
								<Tooltip title="Zoom" placement="top" arrow>
									<StyledIconButton>
										<ReactIcons.TbZoomIn size={17} />
									</StyledIconButton>
								</Tooltip>
							}
						>
							<StyledPopoverBox sx={{ width: 200, p: "0.5rem 1rem" }}>
								<Tooltip
									title={postStates.activePost?.zoom}
									placement="top"
									arrow
								>
									<MUISlider
										value={postStates.activePost?.zoom}
										min={1}
										max={3}
										step={0.1}
										onChange={(e, zoom) =>
											dispatch(
												setZoomVal({ uID: postStates.activePost?.uID, zoom })
											)
										}
										size="small"
										aria-label="Zoom"
									/>
								</Tooltip>
							</StyledPopoverBox>
						</PopOver>

						<Tooltip title="Rotate" placement="top" arrow>
							<StyledIconButton
								onClick={() =>
									onRotationChange(postStates.activePost?.rotation)
								}
							>
								<ReactIcons.MdCropRotate size={17} />
							</StyledIconButton>
						</Tooltip>
						<Tooltip title="Flip Horizontal" placement="top" arrow>
							<StyledIconButton onClick={() => handleFlip("Horizontal")}>
								<ReactIcons.LuFlipHorizontal2 size={17} />
							</StyledIconButton>
						</Tooltip>
						<Tooltip title="Flip Vertical" placement="top" arrow>
							<StyledIconButton onClick={() => handleFlip("Vertical")}>
								<ReactIcons.LuFlipVertical2 size={17} />
							</StyledIconButton>
						</Tooltip>
					</Box>
					<Box>
						<Tooltip title="Select Multiple Files" placement="top" arrow>
							<StyledIconButton>
								<ReactIcons.TbBoxMultiple size={17} />
							</StyledIconButton>
						</Tooltip>
					</Box>
				</Box>
			)}
		</MainBox>
	);
}

export default PostView;
