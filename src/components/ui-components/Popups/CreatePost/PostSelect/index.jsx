import ReactIcons from "utils/ReactIcons";
import {
	Box,
	Button,
	TextField,
	Typography,
	styled,
	useTheme,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createURLfromImage } from "utils/common";
import { v4 as uuidv4 } from "uuid";
import { loadPosts } from "app/slices/postSlice/postSlice";

const MainBox = styled(Box)(({ theme }) => ({
	width: "auto",
	height: "74vh",
	aspectRatio: 1 / 1,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	position: "relative",
	flexDirection: "column",
	background: theme.palette.background.paper,
	gap: "1.3rem",
}));

function PostSelect() {
	const theme = useTheme();
	const dispatch = useDispatch();
	const aspectRatio = useSelector((state) => state.post.aspectRatio);

	// handle selection of post images
	const handleSelectPostFile = (e) => {
		const files = e.target.files;
		const selectedPosts = Object.keys(files).map((key) => {
			return {
				uID: uuidv4(),
				url: createURLfromImage(files[key]),
				crop: { x: 0, y: 0 },
				zoom: 1,
				rotation: 0,
				flip: { x: 1, y: 1 },
				aspectRatio,
				filterClassName: "",
				customFilters: {},
			};
		});
		dispatch(loadPosts(selectedPosts));
	};

	return (
		<MainBox>
			<ReactIcons.LiaPhotoVideoSolid size={100} />
			<Typography variant="body" style={{ fontSize: "1.1rem" }}>
				Drag photos and videos here
			</Typography>
			<Button
				component="label"
				for="postfile"
				style={{
					background: theme.palette.primary.main,
					color: theme.palette.common.white,
					borderRadius: "8px",
					fontWeight: "bold",
					padding: "0.25rem 1rem",
					cursor: "pointer",
				}}
			>
				Select from computer
			</Button>
			<TextField
				id="postfile"
				style={{ display: "none" }}
				onChange={handleSelectPostFile}
				type="file"
				inputProps={{
					multiple: true,
				}}
			/>
		</MainBox>
	);
}

export default PostSelect;
