/* eslint-disable react-hooks/exhaustive-deps */
import {
	Box,
	IconButton,
	Toolbar,
	Typography,
	styled,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactIcons from "utils/ReactIcons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import PostMobile from "components/ui-components/Post/mobile";
import { userPosts } from "src/data";
import PostLarge from "components/ui-components/Post/large";

const MainBox = styled(Box)(({ theme }) => ({
	width: "100%",
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	position: "relative",
	flexDirection: "column",
	background: theme.palette.background.paper,
}));

const StyledToolBar = styled(Toolbar)(({ theme }) => ({
	display: "flex",
	width: "100%",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "0.2em",
	backgroundColor: theme.palette.background.default,
	position: "fixed",
	zIndex: 7,
	top: 0,
	left: 0,
	borderBottom: `1px solid ${theme.palette.grey[400]}`,
}));

const PostContainer = styled(Box)(({ theme }) => ({
	width: "100%",
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "start",
	position: "relative",
	flexDirection: "column",
	marginTop: 0,
	[theme.breakpoints.down("sm")]: {
		marginTop: "3rem",
	},
}));

function ViewPostMobile() {
	const theme = useTheme();
	const postStates = useSelector((state) => state.post);
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const navigate = useNavigate();
	const { pId } = useParams();
	// temp post
	const [tempPost, setTempPost] = useState({});
	useEffect(() => {
		const post = userPosts?.find((post) => post.id == pId);
		setTempPost(post);
	}, [pId]);

	return (
		<MainBox>
			{matchDownSm && (
				<StyledToolBar>
					<IconButton
						size="large"
						sx={{ padding: 0 }}
						color="inherit"
						onClick={() => navigate(-1)}
					>
						<ReactIcons.IoChevronBack
							style={{ fontSize: "2rem", cursor: "pointer" }}
						/>
					</IconButton>
					<Typography variant="h4" mr="45%">
						Post
					</Typography>
				</StyledToolBar>
			)}
			<PostContainer>
				{matchDownSm ? (
					<PostMobile data={tempPost} />
				) : (
					<PostLarge data={tempPost} />
				)}
			</PostContainer>
		</MainBox>
	);
}

export default ViewPostMobile;
