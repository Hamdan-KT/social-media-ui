/* eslint-disable react/display-name */
import { Box, IconButton, Zoom, styled } from "@mui/material";
import { forwardRef } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Slide from "components/common/Carousel/Slide";
import Slider from "components/common/Carousel/Carousel";

const PostSlider = forwardRef(
	({ medias = [], onDoubleClick, mediaStyles = {} }, ref) => {
		return (
			<Slider
				sx={{
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				{Array.isArray(medias) &&
					medias.map((media, ind) => (
						<Slide
							key={media.uID}
							sx={{
								width: "100%",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								position: "relative",
								overflow: "hidden",
							}}
						>
							{media.type === "image" && (
								<img
									style={{
										height: "92vh",
										width: "auto",
										display: "block",
										objectFit: "contain",
										...mediaStyles,
									}}
									alt="Not found!"
									key={ind}
									src={media.src}
									loading="lazy"
									draggable={false}
								/>
							)}
							{media.type === "video" && (
								<video
									controls
									key={ind}
									src={media.src}
									alt="Not Found!"
									style={{
										height: "92vh",
										width: "auto",
										display: "block",
										objectFit: "contain",
										...mediaStyles,
									}}
									loading="lazy"
									draggable={false}
								/>
							)}
						</Slide>
					))}
			</Slider>
		);
	}
);

export default PostSlider;
