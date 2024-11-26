import React from "react";
import CustomModal from "components/common/Modal";
import { styled, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Relation from "src/views/Profile/Relation";
import { useLocation, useNavigate, useParams } from "react-router";
import { RoutePath } from "src/utils/routes";

const Wrappper = styled("div")(({ theme }) => ({
	height: "72%",
	position: "relative",
	display: "flex",
	flexDirection: "column",
	alignItems: "start",
	justifyContent: "start",
	aspectRatio: 1 / 1,
	background: theme.palette.background.paper,
	borderRadius: 15,
	overflow: "hidden",
	padding: "0.5rem",
}));

function RelationPopUp({ open = false, onClose = () => {} }) {
	const theme = useTheme();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const shareWindowOpen = useSelector((state) => state.share.shareWindowOpen);
	const dispatch = useDispatch();
	const navigate = useNavigate(-1);
	const location = useLocation();
	const { uid } = useParams();

	return (
		<CustomModal
			closeIcon={true}
			open={true}
			onClose={() =>
				navigate(`/${RoutePath.PROFILE}/${uid}`, { replace: true })
			}
		>
			<Wrappper>
				<Relation />
			</Wrappper>
		</CustomModal>
	);
}

export default RelationPopUp;
