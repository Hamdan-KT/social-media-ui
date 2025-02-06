import React, { useState, useEffect, useRef } from "react";
import {
	Box,
	IconButton,
	styled,
	Typography,
	useMediaQuery,
	useTheme,
	Zoom,
} from "@mui/material";
import "./index.css";
import Image from "src/components/common/Image";
import Story from "./Story";
import { generateStories } from "./dummy";
import ReactIcons from "src/utils/ReactIcons";
import { useNavigate } from "react-router";
import { RoutePath } from "src/utils/routes";

const CommonBox = styled("div")(({ theme }) => ({
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "auto",
}));

function Stories() {
	const [open, setOpen] = useState(true);
	const [stories, setStories] = useState(generateStories() ?? []);
	const theme = useTheme();
	const navigate = useNavigate();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<Zoom in={open} timeout={500}>
			<Box className="container">
				{!matchDownSm && (
					<ReactIcons.IoClose
						style={{
							position: "absolute",
							left: "0.3rem",
							top: "0.3rem",
							color: theme.palette.background.paper,
							cursor: "pointer",
							fontSize: "2rem",
						}}
						onClick={() => navigate(RoutePath.HOME)}
					/>
				)}
				{!matchDownSm && (
					<Typography
						variant="logo"
						sx={{
							fontSize: "2.3rem",
							position: "absolute",
							right: "1rem",
							top: "1rem",
							color: theme.palette.background.paper,
							cursor: "pointer",
						}}
					>
						Instogram
					</Typography>
				)}
				<Story stories={stories} />
			</Box>
		</Zoom>
	);
}

export default Stories;
