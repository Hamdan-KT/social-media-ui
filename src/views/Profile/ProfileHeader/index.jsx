import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import ReactIcons from "utils/ReactIcons";
import { RoutePath } from "utils/routes";
import { useSelector } from "react-redux";

const StyledToolBar = styled(Toolbar)(({ theme }) => ({
	display: "flex",
	width: "100%",
	alignItems: "center",
	justifyContent: "space-between",
	padding: "0em",
	backgroundColor: theme.palette.background.default,
	position: "fixed",
	zIndex: 7,
	top: 0,
	left: 0,
}));

function ProfileHeader({ data = {} }) {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const navigate = useNavigate();
	const user = useSelector((state) => state.user?.user);

	return (
		<>
			{matchDownSm && (
				<StyledToolBar>
					<IconButton
						size="medium"
						color="inherit"
						onClick={() => navigate(-1)}
					>
						<ReactIcons.IoChevronBack />
					</IconButton>
					<Box>
						<Typography variant="h4">{data?.userName}</Typography>
					</Box>
					{data?._id && data?._id === user?._id && (
						<IconButton
							size="medium"
							color="inherit"
							onClick={() => navigate(`/${RoutePath.SETTINGS}`)}
						>
							<ReactIcons.MdMenu />
						</IconButton>
					)}
				</StyledToolBar>
			)}
		</>
	);
}

export default ProfileHeader;
