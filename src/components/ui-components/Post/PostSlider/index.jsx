/* eslint-disable react/display-name */
import { forwardRef } from "react";
import Slide from "components/common/Carousel/Slide";
import Slider from "components/common/Carousel/Carousel";

const PostSlider = forwardRef(
	({ medias = [], mediaStyles = {} }, ref) => {
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
								height: "100%",
							}}
						>
							{media.type === "image" && (
								<img
									style={{
										maxHeight: "92vh",
										width: "100%",
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
										maxHeight: "92vh",
										width: "100%",
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
