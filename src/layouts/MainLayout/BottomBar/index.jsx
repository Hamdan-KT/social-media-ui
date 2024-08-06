/* eslint-disable react/display-name */
import { useRef, useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import {
	Box,
	TextField,
	Typography,
	styled,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createURLfromImage } from "utils/common";
import { v4 as uuidv4 } from "uuid";
// menu list for bottom bar
import { BottomBarMenuList } from "./MenuList";
import { RoutePath } from "utils/routes";
import PopOver from "components/common/Popover";
import ReactIcons from "utils/ReactIcons";
import { loadPosts } from "app/slices/postSlice/postSlice";
import { memo } from "react";

const StyledPopoverBox = styled(Box)(({ theme }) => ({
	width: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	flexDirection: "column",
	padding: "0.5rem",
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
	width: "100%",
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	flexDirection: "row",
	padding: "0.5rem",
	borderRadius: "7px",
	cursor: "pointer",
	gap: "0.5rem",
	"&:hover": {
		background: theme.palette.grey[200],
	},
}));

const BottomBar = memo(function () {
	const theme = useTheme();
	const [value, setValue] = useState(0);
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const dispatch = useDispatch();
	const aspectRatio = useSelector((state) => state.post.aspectRatio);
	// refs
	const createMenuRef = useRef();

	const onChange = (event, url) => {
		if (url) {
			const formattedURL = url === RoutePath.HOME ? url : `/${url}`;
			// updating state
			setValue(formattedURL);
			// navigating to specific path
			if (pathname !== formattedURL) return navigate(formattedURL);
		}
	};

	// handle selection of post images
	const handleSelectPostFile = (e) => {
		const files = e.target.files;
		const selectedPosts = Object.keys(files).map((key) => {
			const file = files[key];
			let fileType = "";

			if (file.type.startsWith("image/")) {
				fileType = "image";
			} else if (file.type.startsWith("video/")) {
				fileType = "video";
			}
			return {
				type: fileType,
				uID: uuidv4(),
				url: createURLfromImage(file),
				croppedUrl: "",
				croppedAreaPixels: {},
				crop: { x: 0, y: 0 },
				zoom: 1,
				rotation: 0,
				flip: { x: 1, y: 1 },
				aspectRatio,
				filterClassName: "",
				customFilters: {
					Brightness: 100,
					Contrast: 0,
					Saturation: 100,
					Fade: 0,
					Temperature: 0,
					Vignette: 0,
				},
			};
		});
		dispatch(loadPosts(selectedPosts));
		createMenuRef.current?.handleClose();
		navigate(`/${RoutePath.CREATE}/${RoutePath.CROP}`);
	};

	return (
		<>
			{matchDownSm && (
				<Paper
					sx={{ position: "fixed", zIndex: 1000, bottom: 0, left: 0, right: 0 }}
				>
					<BottomNavigation
						// showLabels
						value={value}
						onChange={onChange}
						sx={{ maxWidth: "100%" }}
					>
						{BottomBarMenuList?.map((menu, index) => {
							const FilledIcon = menu?.icon;
							const OutlinedIcon = menu?.outLinedIcon;
							if (menu?.popup && menu?.id === RoutePath.CREATE) {
								return (
									<PopOver
										key={index}
										ref={createMenuRef}
										Button={
											<BottomNavigationAction
												value={menu?.url ?? null}
												key={index}
												icon={
													pathname.split("/")[1] === menu?.id ? (
														<FilledIcon
															style={{
																color: `${theme.palette.text.dark}`,
																fontSize: 25,
															}}
														/>
													) : (
														<OutlinedIcon
															style={{
																color: `${theme.palette.text.dark}`,
																fontSize: 25,
															}}
														/>
													)
												}
											/>
										}
									>
										<StyledPopoverBox>
											<StyledTypography component="label" for="mobviewPostFile">
												{"Post"}
												<ReactIcons.MdOutlineGridOn size={23} />
											</StyledTypography>
											<TextField
												id="mobviewPostFile"
												style={{ display: "none" }}
												onChange={handleSelectPostFile}
												type="file"
												inputProps={{
													multiple: true,
												}}
											/>
											<StyledTypography
												onClick={() => {
													createMenuRef.current?.handleClose();
												}}
											>
												{"Story"}
												<ReactIcons.MdOutlineAddCircleOutline size={23} />
											</StyledTypography>
										</StyledPopoverBox>
									</PopOver>
								);
							} else {
								return (
									<BottomNavigationAction
										value={menu?.url ?? null}
										key={index}
										icon={
											pathname.split("/")[1] === menu?.id ? (
												<FilledIcon
													style={{
														color: `${theme.palette.text.dark}`,
														fontSize: 25,
													}}
												/>
											) : (
												<OutlinedIcon
													style={{
														color: `${theme.palette.text.dark}`,
														fontSize: 25,
													}}
												/>
											)
										}
									/>
								);
							}
						})}
					</BottomNavigation>
				</Paper>
			)}
		</>
	);
});

export default BottomBar;
