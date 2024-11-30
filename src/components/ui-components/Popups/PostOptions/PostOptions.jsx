import ReactIcons from "src/utils/ReactIcons";
import { Box, styled, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "src/api/postAPI";
import toast from "react-hot-toast";
import { RoutePath } from "src/utils/routes";

const CommonBox = styled("div")(({ theme }) => ({
	display: "flex",
	width: "100%",
	alignItems: "center",
	justifyContent: "center",
	gap: "0.5rem",
}));

const StyledPopoverBox = styled(Box)(({ theme }) => ({
	width: "100%",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	flexDirection: "column",
}));

const StyledTypography = styled(Typography)(({ theme, border = true }) => ({
	width: "100%",
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	flexDirection: "row",
	padding: "0.7rem 0.7rem",
	borderRadius: "7px",
	cursor: "pointer",
	gap: "0.5rem",
	"&:hover": {
		background: theme.palette.grey[200],
	},
	[theme.breakpoints.up("xs")]: {
		borderBottom: border ? `1px solid ${theme.palette.grey[300]}` : "",
	},
}));

function PostOptions({
	pId,
	isHideLikes,
	isDisableComment,
	onClose,
	postUser,
}) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state?.user?.user);
	const theme = useTheme();
	const queryClient = useQueryClient();

	const deleteUserPost = useMutation({
		mutationKey: ["delete-post"],
		mutationFn: (pId) => deletePost(pId),
		onSuccess: (data) => {
			onClose();
			queryClient.invalidateQueries({ queryKey: ["get-all-user-posts"] });
			toast.success(data?.message);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return (
		<CommonBox
			sx={{
				flexDirection: "column",
				gap: "1rem",
				padding: { xs: "0.5rem", sm: "1rem" },
			}}
		>
			<StyledPopoverBox sx={{ padding: "0rem" }}>
				{user?._id === postUser && (
					<>
						<StyledTypography
							sx={{ color: theme.palette.error.main }}
							onClick={() => {
								deleteUserPost.mutate(pId);
								onClose();
							}}
						>
							Delete
							<ReactIcons.LuTrash size={20} />
						</StyledTypography>
						<StyledTypography>
							Edit
							<ReactIcons.MdEdit size={20} />
						</StyledTypography>
						<StyledTypography>
							Hide like count
							<ReactIcons.LuHeartOff size={20} />
						</StyledTypography>
						<StyledTypography>
							Turn off commenting
							<ReactIcons.RiChatOffLine size={20} />
						</StyledTypography>
					</>
				)}
				<StyledTypography
					onClick={() => navigate(`/${RoutePath.PROFILE}/${postUser}`)}
				>
					Go to profile
					<ReactIcons.RiAccountCircleLine size={23} />
				</StyledTypography>
				<StyledTypography>
					About this account
					<ReactIcons.IoInformationCircleOutline size={23} />
				</StyledTypography>
				<StyledTypography border={false}>
					Copy link
					<ReactIcons.RiLinkM size={23} />
				</StyledTypography>
			</StyledPopoverBox>
		</CommonBox>
	);
}

export default PostOptions;
