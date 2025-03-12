import React from "react";

function Image(props) {
	return <img loading="eager" draggable={false} {...props} />;
}

export default Image;
