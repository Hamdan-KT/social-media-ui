import CustomModal from "components/common/Modal";
import { Box, styled, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import Slider from "components/common/Carousel/Carousel";
import Slide from "components/common/Carousel/Slide";
import Image from "components/common/Image";
import Video from "components/common/Video";

const MainBox = styled(Box)(({ theme }) => ({
	width: "100%",
	height: "100%",
	display: "flex",
	gap: "0.5rem",
	alignItems: "center",
	justifyContent: "center",
	flexDirection: "column",
}));

// View Box
const ViewBox = styled(Box)({
	display: "flex",
	minWidth: "100%",
	height: "100%",
	maxHeight: "100%",
	alignItems: "center",
	justifyContent: "center",
});

function MobileImageView({ medias = [] }) {
	const theme = useTheme();
	const viewBoxRef = useRef();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const [selectedImage, setSelectedImage] = useState(0);
	const [mainViewOpen, setMainViewOpen] = useState(false);

	return (
		<>
			{matchDownSm && (
				<>
					<MainBox>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								gap: "0.8rem",
								width: "100%",
								minHeight: "100%",
								overflowY: "scroll",
							}}
						>
							{Array.isArray(medias) &&
								medias?.map((media, ind) => (
									<ViewBox
										ref={viewBoxRef}
										key={ind}
										onClick={() => {
											if (medias.length > 1) {
												setSelectedImage(ind);
												setMainViewOpen(true);
											}
										}}
									>
										{media?.type === "image" && (
											<Image
												src={media?.src}
												alt="Not Found"
												style={{
													display: "block",
													width: "100%",
													userSelect: "none",
													objectFit: "contain",
													borderRadius: "15px",
												}}
												loading="lazy"
												draggable={false}
											/>
										)}
										{media?.type === "video" && (
											<Video
												src={media?.src}
												alt="Not Found"
												style={{
													display: "block",
													width: "100%",
													userSelect: "none",
													objectFit: "contain",
													borderRadius: "15px",
												}}
												loading="lazy"
												draggable={false}
											/>
										)}
									</ViewBox>
								))}
						</Box>
					</MainBox>
					{/* main view Window of selected image */}
					{medias?.length > 1 && (
						<CustomModal
							sx={{
								backdropFilter: "blur(10px)",
								background: "rgba(0, 0, 0, 0.5)",
							}}
							closeIcon={true}
							open={mainViewOpen}
							onClose={() => setMainViewOpen(false)}
						>
							<MainBox>
								<Slider
									currentIndex={selectedImage}
									pagination={false}
									controllButtons={false}
								>
									{Array.isArray(medias) &&
										medias?.map((media, ind) => (
											<Slide key={ind} sx={{ padding: "0.4rem" }}>
												{media?.type === "image" && (
													<Image
														style={{
															display: "block",
															objectFit: "cover",
															width: "100%",
															borderRadius: "15px",
														}}
														alt="Not found!"
														key={ind}
														src={media?.src}
														loading="lazy"
														draggable={false}
													/>
												)}
												{media?.type === "video" && (
													<Video
														controls
														key={ind}
														src={media?.src}
														alt="Not Found!"
														style={{
															display: "block",
															objectFit: "cover",
															width: "100%",
															borderRadius: "15px",
														}}
														loading="lazy"
														draggable={false}
													/>
												)}
											</Slide>
										))}
								</Slider>
							</MainBox>
						</CustomModal>
					)}
				</>
			)}
		</>
	);
}

export default MobileImageView;
