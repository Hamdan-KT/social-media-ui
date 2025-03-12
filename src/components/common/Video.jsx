import React from "react";
import { forwardRef } from "react";

const Video = forwardRef(function Video({ ...props }, ref) {
	return <video ref={ref} loading="eager" draggable={false} {...props} />; 
});

export default Video;
