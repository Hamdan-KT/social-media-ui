import ReactIcons from "utils/ReactIcons";
import {
	Box,
	Button,
	Grid,
	TextField,
	Typography,
	styled,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Users, userStories } from "src/data";
import ShareHeader from "../header";
import ProfileAvatar from "components/common/ProfileAvatar";
import SearchInput from "components/common/SearchInput";
import _ from "lodash";
import ScrollBox from "components/ui-components/Wrappers/ScrollBox";
import SelectionList from "src/components/ui-components/SelectionList";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "src/api/userAPI";
import {
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import DefaultLoader from "src/components/common/DefaultLoader";
import { useDebounceValue } from "src/hooks/useDebounce";
import NewMessageHeader from "../header";
import { addPeoplesToChat, inintializeChat } from "src/api/messageAPI";
import { setSelectedChat } from "src/app/slices/messageSlice/messageSlice";
import { RoutePath } from "src/utils/routes";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import AddPeopleHeader from "../header";

const CommonBox = styled("div")(({ theme }) => ({
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
}));

function AddPeopleToChatListSection({ onClose = () => {} }) {
	const theme = useTheme();
	const { ref, inView } = useInView();
	const { ref: shareListRef, inView: shareListInView } = useInView();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const dispatch = useDispatch();
	const selectedChat = useSelector((state) => state?.message?.selectedChat);
	const [showingSelectionUsers, setShowingSelectionUsers] = useState(
		[]
		// selectedChat?.participants ?? []
	);
	const [selectedUsers, setSelectedUsers] = useState({
		// ...(selectedChat?.participants?.reduce((acc, user) => {
		// 	acc[user?._id] = true;
		// 	return acc;
		// }, {}) || {}),
	});
	const { debouncedValue, value, setValue } = useDebounceValue("", 500);
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const {
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isSuccess,
		isFetching,
		data,
	} = useInfiniteQuery({
		queryKey: ["get-all-users", debouncedValue],
		queryFn: ({ pageParam = 1 }) => getUsers({ search: value }, pageParam, 10),
		initialPageParam: 1,
		enabled: !!debouncedValue,
		getNextPageParam: (lastPage, allPages) => {
			const nextPage = lastPage?.data?.length
				? allPages?.length + 1
				: undefined;
			return nextPage;
		},
	});

	useEffect(() => {
		if (inView && hasNextPage && !isFetching) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, fetchNextPage, isFetching]);

	useEffect(() => {
		console.log({ selectedUsers });
	}, [selectedUsers]);

	const {
		fetchNextPage: shareListfetchNextPage,
		hasNextPage: shareListhasNextPage,
		isFetchingNextPage: shareListisFetchingNextPage,
		isSuccess: shareListisSuccess,
		isFetching: shareListisFetching,
		data: shareListdata,
	} = useInfiniteQuery({
		queryKey: ["get-sharing-users"],
		queryFn: ({ pageParam = 1 }) => getUsers({}, pageParam, 10),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			const nextPage = lastPage?.data?.length
				? allPages?.length + 1
				: undefined;
			return nextPage;
		},
	});

	useEffect(() => {
		if (shareListInView && shareListhasNextPage && !shareListisFetching) {
			shareListfetchNextPage();
		}
	}, [
		shareListInView,
		shareListhasNextPage,
		shareListfetchNextPage,
		shareListisFetching,
	]);

	useEffect(() => {
		console.log({ shareusers: shareListdata });
	}, [shareListisSuccess, shareListdata]);

	const handleSelection = (data) => {
		if (!_.isEmpty(data)) {
			let checked = !selectedUsers[data["_id"]];
			if (checked) {
				handleShowSelectionUsers(data, "add");
				dispatch(
					setSelectedUsers({
						...selectedUsers,
						[data["_id"]]: checked,
					})
				);
			} else {
				let updatedSelection = { ...selectedUsers };
				delete updatedSelection[data["_id"]];
				handleShowSelectionUsers(data, "remove");
				dispatch(setSelectedUsers({ ...updatedSelection }));
			}
		}
	};

	const handleShowSelectionUsers = (data, type = "add") => {
		if (type === "add") {
			setShowingSelectionUsers((prev) => [...prev, data]);
		} else {
			setShowingSelectionUsers((prev) =>
				prev.filter((user) => user._id !== data._id)
			);
		}
	};

	const addToChat = useMutation({
		mutationKey: ["add-users-to-chat"],
		mutationFn: (info) => {
			return addPeoplesToChat({
				chat: selectedChat?._id,
				participants: [...Object.keys(selectedUsers)],
			});
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries(["get-chat-members"]);
			onClose();
		},
	});

	return (
		<Box
			sx={{
				width: "100%",
				height: "100%",
				position: "relative",
				mt: matchDownSm ? "3rem" : 0,
			}}
		>
			{!matchDownSm && <AddPeopleHeader onClose={onClose} />}
			<CommonBox sx={{ p: 1 }}>
				<SearchInput value={value} setValue={setValue} />
			</CommonBox>
			{showingSelectionUsers.length > 0 && (
				<CommonBox
					className="scrollbar-hide"
					sx={{
						p: "0.1rem 0.5rem 0.5rem 0.5rem",
						gap: "0.5rem",
						overflowX: "scroll",
						justifyContent: "start",
					}}
				>
					{showingSelectionUsers?.map((user, index) => (
						<Typography
							key={user?._id}
							variant="subtitle1"
							sx={{
								fontWeight: "bold",
								padding: "0rem 0.4rem",
								color: theme.palette.primary.dark,
								background: theme.palette.primary.light,
								borderRadius: "10rem",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								gap: "0.2rem",
								userSelect: "none",
							}}
						>
							{user?.userName}
							<ReactIcons.IoClose
								style={{ cursor: "pointer" }}
								onClick={() => handleSelection(user)}
							/>
						</Typography>
					))}
				</CommonBox>
			)}
			<CommonBox
				className="scrollbar-hide"
				sx={{
					height: matchDownSm
						? `${
								!_.isEmpty(selectedUsers)
									? "calc(100vh - 9rem)"
									: "calc(100vh - 6.3rem)"
						  }`
						: `${
								!_.isEmpty(selectedUsers)
									? "calc(100% - 11.2rem)"
									: "calc(100% - 6rem)"
						  }`,
					overflowY: "scroll",
					alignItems: "start",
					justifyContent: "start",
					p: 0.5,
				}}
			>
				<Grid
					container
					sx={{ mb: matchDownSm && !_.isEmpty(selectedUsers) ? 6 : 0 }}
				>
					{_.isEmpty(value) ? (
						<React.Fragment>
							<SelectionList
								ref={shareListRef}
								data={shareListdata?.pages?.flatMap((page) => page?.data) ?? []}
								sx={{
									maxWidth: "100%",
								}}
								selection={selectedUsers}
								setSelection={setSelectedUsers}
								onClick={handleSelection}
								onChange={handleSelection}
								dataTag="_id"
								secondaryText="name"
							/>
							{shareListisFetchingNextPage && (
								<Box
									sx={{
										width: "100%",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<DefaultLoader />
								</Box>
							)}
						</React.Fragment>
					) : (
						<ScrollBox sx={{ mt: 0, height: "auto", flexDirection: "column" }}>
							<SelectionList
								ref={ref}
								data={data?.pages?.flatMap((page) => page?.data) ?? []}
								sx={{ maxWidth: "100%" }}
								selection={selectedUsers}
								setSelection={setSelectedUsers}
								onClick={handleSelection}
								onChange={handleSelection}
								dataTag="_id"
								secondaryText="name"
							/>
							{isFetchingNextPage && (
								<Box
									sx={{
										width: "100%",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<DefaultLoader />
								</Box>
							)}
						</ScrollBox>
					)}
				</Grid>
			</CommonBox>
			{!_.isEmpty(selectedUsers) && (
				<Box
					sx={{
						width: "100%",
						background: theme.palette.common.white,
						padding: 1,
						position: "absolute",
						left: 0,
						bottom: 0,
						border: "none",
					}}
				>
					<Button
						variant="contained"
						sx={{ fontWeight: "bold", borderRadius: 2 }}
						fullWidth
						disableElevation
						onClick={() => addToChat.mutate()}
					>
						{addToChat.isPending ? <DefaultLoader size={24} /> : "Add"}
					</Button>
				</Box>
			)}
		</Box>
	);
}

export default AddPeopleToChatListSection;
