import React from "react";

function Video({ ...props }) {
	return <video loading="lazy" draggable={false} {...props} />;
}

export default Video;
