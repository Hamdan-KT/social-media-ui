import Image from "components/common/Image";
import Video from "components/common/Video";
import React from "react";

function EditView({ media }) {
	return (
		<>
			{media?.type === "image" && (
				<Image
					loading="lazy"
					draggable={false}
					src={media?.croppedUrl}
					className={media.filterClassName}
					style={{
						display: "block",
						height: "100%",
						width: "100%",
						objectFit: "contain",
						filter:
							media.filterClassName === "" &&
							`brightness(${
								media?.customFilters?.Brightness ?? 100
							}%) contrast(${
								media?.customFilters?.Contrast ?? 100
							}%) saturate(${media?.customFilters?.Saturation ?? 100}%)`,
					}}
				/>
			)}
			{media?.type === "video" && (
				<Video
					loading="lazy"
					draggable={false}
					src={media?.croppedUrl}
					className={media.filterClassName}
					style={{
						display: "block",
						height: "100%",
						width: "100%",
						objectFit: "contain",
						filter:
							media.filterClassName === "" &&
							`brightness(${
								media?.customFilters?.Brightness ?? 100
							}%) contrast(${
								media?.customFilters?.Contrast ?? 100
							}%) saturate(${media?.customFilters?.Saturation ?? 100}%)`,
					}}
				/>
			)}
		</>
	);
}

export default EditView;
