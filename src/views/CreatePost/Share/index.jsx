import ReactIcons from "utils/ReactIcons";
import {
	Avatar,
	Box,
	Collapse,
	Divider,
	IconButton,
	TextField,
	Toolbar,
	Typography,
	styled,
	useTheme,
} from "@mui/material";
import React, { useState } from "react";
import MUISwitch from "components/common/formInputs/Switch";
import { useDispatch, useSelector } from "react-redux";
import { postStages as ps } from "utils/constants";
import { useNavigate } from "react-router";
import { RoutePath } from "utils/routes";

const ContentBox = styled(Box)(({ theme }) => ({
	width: "100%",
	height: "auto",
	display: "flex",
	background: theme.palette.background.paper,
	flexDirection: "column",
	alignItems: "center",
	overflowY: "scroll",
	padding: "0.8rem",
	gap: "0.6rem",
}));

const ItemsWrapper = styled(Box)(({ theme, hoverEffect }) => ({
	width: "100%",
	height: "max-content",
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "0.5rem 0.5rem",
	"&:hover": hoverEffect && {
		background: theme.palette.grey[200],
		borderRadius: "10px",
		cursor: "pointer",
	},
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

function PostSettingsMobile() {
	const postStates = useSelector((state) => state.post);
	const [openADVsettings, setOpenADVsettings] = useState(false);
	const navigate = useNavigate();
	const theme = useTheme();

	return (
		<ContentBox className="scrollbar-hide">
			{/* header */}
			<StyledToolBar>
				<IconButton
					size="large"
					sx={{ padding: 0 }}
					color="inherit"
					onClick={() => navigate(-1)}
				>
					<ReactIcons.IoClose style={{ fontSize: "2rem", cursor: "pointer" }} />
				</IconButton>
				<Typography variant="h4">New post</Typography>
				<Typography
					variant="body"
					sx={{
						cursor: "pointer",
						padding: "0 0.3rem",
						fontWeight: 600,
						"&:hover": { color: theme.palette.text.primary },
					}}
					color={theme.palette.primary.main}
				>
					Share
				</Typography>
			</StyledToolBar>
			{/* contents */}
			<Box
				sx={{
					display: "flex",
					gap: "0.5rem",
					flexDirection: "row",
					width: "100%",
					alignItems: "center",
					justifyContent: "start",
					mt: 6,
				}}
			>
				<Avatar
					src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
					aria-label="profile-picture"
					sx={{ width: 30, height: 30 }}
				/>
				<Typography variant="userName">Jack_Sparrow</Typography>
			</Box>
			<TextField
				id="outlined-basic"
				fullWidth
				multiline
				rows={6}
				placeholder="Write a caption"
			/>
			<ItemsWrapper hoverEffect={true}>
				<Typography variant="body" sx={{ fontWeight: "medium" }}>
					Add Location
				</Typography>
				<ReactIcons.IoLocationOutline size={20} />
			</ItemsWrapper>
			<ItemsWrapper
				hoverEffect={true}
				onClick={() => navigate(`/${RoutePath.CREATE}/${RoutePath.TAG}`)}
			>
				<Typography variant="body" sx={{ fontWeight: "medium" }}>
					Tag People
				</Typography>
				<ReactIcons.MdNavigateNext size={26} />
			</ItemsWrapper>
			<ItemsWrapper
				onClick={() => setOpenADVsettings(!openADVsettings)}
				hoverEffect={true}
			>
				<Typography variant="body" sx={{ fontWeight: "medium" }}>
					Advanced Settings
				</Typography>
				<ReactIcons.MdNavigateNext size={26} />
			</ItemsWrapper>
			<Collapse in={openADVsettings} timeout={300} sx={{ width: "100%" }}>
				<ItemsWrapper
					sx={{
						alignItems: "start",
						flexDirection: "column",
					}}
				>
					<Typography variant="userName">Like and view counts</Typography>
					<ItemsWrapper sx={{ padding: "1rem 0rem" }}>
						<Typography>Hide like and view counts on this post</Typography>
						<MUISwitch />
					</ItemsWrapper>
					<Typography variant="caption">
						Only you will see the total number of likes and views on this post.
						You can change this later by going to the ... menu at the top of
						post.
					</Typography>
				</ItemsWrapper>
				<Divider />
				<ItemsWrapper
					sx={{
						alignItems: "start",
						flexDirection: "column",
					}}
				>
					<Typography variant="userName">Comments</Typography>
					<ItemsWrapper sx={{ padding: "1rem 0rem" }}>
						<Typography>Turn off commenting</Typography>
						<MUISwitch />
					</ItemsWrapper>
					<Typography variant="caption">
						You can change this later by going to the ... menu at the top of
						your post.
					</Typography>
				</ItemsWrapper>
				<Divider />
				<ItemsWrapper
					sx={{
						alignItems: "start",
						flexDirection: "column",
					}}
				>
					<Typography variant="userName">Accessibility</Typography>
					<ItemsWrapper sx={{ padding: "1rem 0rem" }}>
						<Typography>Write alt text</Typography>
					</ItemsWrapper>
					<Typography variant="caption">
						Alt text describes your photos for people with visual impairments.
						Alt text will be created automatically for your photos or you can
						choose to write you own
					</Typography>
				</ItemsWrapper>
			</Collapse>
		</ContentBox>
	);
}

export default PostSettingsMobile;
