import * as React from "react";
import CustomModal from "../../common/Modal";
import DefaultView from "./DefaultView";
import MobileImageView from "./MobileView";

function ImageViewer({ medias = [], open = false, onClose }) {
	if (medias.length === 0) return null;
	return (
		<CustomModal
			sx={{ backdropFilter: "blur(10px)", background: "rgba(0, 0, 0, 0.5)" }}
			closeIcon={true}
			open={open}
			onClose={onClose}
		>
			{/* large Devices */}
			<DefaultView medias={medias} />
			{/* mobile section */}
			<MobileImageView medias={medias} />
		</CustomModal>
	);
}

export default ImageViewer;
