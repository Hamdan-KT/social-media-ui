import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import ReactIcons from "src/utils/ReactIcons";
import { RoutePath } from "utils/routes";
import { useSelector } from "react-redux";
import ImgWrapper from "src/components/common/ImgWrapper";
import Image from "src/components/common/Image";
import verifiedBadge from "assets/images/verifiedBadge.png";

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
					<Box
						sx={{
							display: "flex",
							width: "auto",
							alignItems: "center",
							gap: "0.5rem",
							justifyContent: "center",
						}}
					>
						<Typography variant="h4">{data?.userName}</Typography>
						<ImgWrapper sx={{ width: "1rem", height: "1rem" }}>
							<Image
								src={verifiedBadge}
								style={{
									display: "block",
									width: "100%",
									objectFit: "cover",
								}}
							/>
						</ImgWrapper>
					</Box>
					{data?._id && data?._id === user?._id ? (
						<IconButton
							size="medium"
							color="inherit"
							onClick={() => navigate(`/${RoutePath.SETTINGS}`)}
						>
							<ReactIcons.MdMenu />
						</IconButton>
					) : (
						<Box>
							<IconButton aria-label="more">
								<ReactIcons.LuSend
									style={{
										color: `${theme.palette.text.dark}`,
										transform: "rotate(20deg)",
									}}
								/>
							</IconButton>
							<IconButton aria-label="more">
								<ReactIcons.MdMoreHoriz
									style={{ color: `${theme.palette.text.dark}` }}
								/>
							</IconButton>
						</Box>
					)}
				</StyledToolBar>
			)}
		</>
	);
}

export default ProfileHeader;
