import React from "react";

function Image(props) {
	return <img loading="lazy" draggable={false} {...props} />;
}

export default Image;
