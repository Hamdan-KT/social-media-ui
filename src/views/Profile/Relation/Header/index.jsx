import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import ReactIcons from "utils/ReactIcons";
import { RoutePath } from "utils/routes";

const StyledToolBar = styled(Toolbar)(({ theme }) => ({
	display: "flex",
	width: "100%",
	alignItems: "center",
	justifyContent: "start",
	padding: "0em",
	backgroundColor: theme.palette.background.default,
	position: "fixed",
	zIndex: 7,
	top: 0,
	left: 0,
	borderBottom: `1px solid ${theme.palette.grey[300]}`,
}));

function RelHeader({ title = "" }) {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const navigate = useNavigate();
	const { uid } = useParams();

	return (
		<>
			{matchDownSm && (
				<StyledToolBar>
					<IconButton
						size="medium"
						color="inherit"
						onClick={() => navigate(`/${RoutePath.PROFILE}/${uid}`)}
					>
						<ReactIcons.IoChevronBack />
					</IconButton>
					{title && (
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								width: "calc(100% - 20%)",
							}}
						>
							<Typography variant="h4">{title}</Typography>
						</Box>
					)}
				</StyledToolBar>
			)}
		</>
	);
}

export default RelHeader;
