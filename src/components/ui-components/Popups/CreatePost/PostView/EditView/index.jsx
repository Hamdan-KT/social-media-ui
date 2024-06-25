import React from "react";

function EditView({ media }) {
	return (
		<>
			{media?.type === "image" && (
				<img
					loading="lazy"
					draggable={false}
					src={media?.croppedUrl}
					className={media.filterClassName}
					style={{
						display: "block",
						height: "100%",
						width: "100%",
						objectFit: "contain",
						scale: `${media.flip?.x} ${media.flip?.y}`,
						filter:
							media.filterClassName === "" &&
							`brightness(${media.customFilters?.Brightness}%) saturate(${media.customFilters?.Saturation}%)`,
					}}
				/>
			)}
			{media?.type === "video" && (
				<video
					loading="lazy"
					draggable={false}
					src={media?.croppedUrl}
					className={media.filterClassName}
					style={{
						display: "block",
						height: "100%",
						width: "100%",
						objectFit: "contain",
						scale: `${media.flip?.x} ${media.flip?.y}`,
						filter:
							media.filterClassName === "" &&
							`brightness(${media.customFilters?.Brightness}%) saturate(${media.customFilters?.Saturation}%)`,
					}}
				/>
			)}
		</>
	);
}

export default EditView;
