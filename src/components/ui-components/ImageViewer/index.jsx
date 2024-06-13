import * as React from "react";
import CustomModal from "../../common/Modal";
import { Box, styled, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { useRef } from "react";
import DefaultView from "./DefaultView";
import MobileImageView from "./MobileView";

const medias = [
	{
		type: "image",
		src: "https://images.pexels.com/photos/4621896/pexels-photo-4621896.jpeg?auto=compress&cs=tinysrgb&w=600",
	},
	{
		type: "image",
		src: "https://images.pexels.com/photos/5192244/pexels-photo-5192244.jpeg?auto=compress&cs=tinysrgb&w=600",
	},
	{
		type: "image",
		src: "https://images.pexels.com/photos/4621896/pexels-photo-4621896.jpeg?auto=compress&cs=tinysrgb&w=600",
	},
	{
		type: "image",
		src: "https://images.pexels.com/photos/5192244/pexels-photo-5192244.jpeg?auto=compress&cs=tinysrgb&w=600",
	},
	{
		type: "image",
		src: "https://images.pexels.com/photos/4621896/pexels-photo-4621896.jpeg?auto=compress&cs=tinysrgb&w=600",
	},
	{
		type: "image",
		src: "https://images.pexels.com/photos/5192244/pexels-photo-5192244.jpeg?auto=compress&cs=tinysrgb&w=600",
	},
	{
		type: "image",
		src: "https://images.pexels.com/photos/4621896/pexels-photo-4621896.jpeg?auto=compress&cs=tinysrgb&w=600",
	},
	{
		type: "image",
		src: "https://images.pexels.com/photos/5192244/pexels-photo-5192244.jpeg?auto=compress&cs=tinysrgb&w=600",
	},
	{
		type: "image",
		src: "https://images.pexels.com/photos/4621896/pexels-photo-4621896.jpeg?auto=compress&cs=tinysrgb&w=600",
	},
	{
		type: "image",
		src: "https://images.pexels.com/photos/5192244/pexels-photo-5192244.jpeg?auto=compress&cs=tinysrgb&w=600",
	},
	{
		type: "image",
		src: "https://images.pexels.com/photos/4621896/pexels-photo-4621896.jpeg?auto=compress&cs=tinysrgb&w=600",
	},
	{
		type: "image",
		src: "https://images.pexels.com/photos/5192244/pexels-photo-5192244.jpeg?auto=compress&cs=tinysrgb&w=600",
	},
];

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
