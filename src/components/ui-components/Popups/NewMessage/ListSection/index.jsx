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
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import DefaultLoader from "src/components/common/DefaultLoader";
import { useDebounceValue } from "src/hooks/useDebounce";
import NewMessageHeader from "../header";
import { inintializeChat } from "src/api/messageAPI";
import { setSelectedChat } from "src/app/slices/messageSlice/messageSlice";
import { RoutePath } from "src/utils/routes";
import { useLocation, useNavigate } from "react-router";

const CommonBox = styled("div")(({ theme }) => ({
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "100%",
}));

function NewMessageListSection({ onClose = () => {} }) {
	const theme = useTheme();
	const { ref, inView } = useInView();
	const { ref: shareListRef, inView: shareListInView } = useInView();
	const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
	const dispatch = useDispatch();
	const selectedChat = useSelector((state) => state?.message?.selectedChat);
	const [showingSelectionUsers, setShowingSelectionUsers] = useState([
		...(selectedChat?.receiver ? [selectedChat?.receiver] : []),
	]);
	const [selectedUsers, setSelectedUsers] = useState({
		...(selectedChat?.receiver ? { [selectedChat?.receiver?._id]: true } : {}),
	});
	const { debouncedValue, value, setValue } = useDebounceValue("", 500);
	const [groupName, setGroupName] = useState("");
	const navigate = useNavigate();

	const {
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isSuccess,
		isFetching,
		data,
	} = useInfiniteQuery({
		queryKey: ["get-sharing-users", debouncedValue],
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
		queryKey: ["get-all-users"],
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

	const initialChat = useMutation({
		mutationKey: ["initial-new-chat"],
		mutationFn: (info) =>
			inintializeChat({
				participants: [...Object.keys(selectedUsers)],
				isGroupChat: Object.keys(selectedUsers).length > 1 ? true : false,
				groupName: Object.keys(selectedUsers).length > 1 ? groupName : null,
			}),
		onSuccess: (data) => {
			console.log({ chatInitialData: data });
			setGroupName("");
			dispatch(setSelectedChat(data?.data));
			onClose();
			navigate(`/${RoutePath.MESSAGES}/${data?.data?._id}`);
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
			{!matchDownSm && <NewMessageHeader onClose={onClose} />}
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
			{Object.keys(selectedUsers).length > 1 && (
				<CommonBox sx={{ padding: "0rem 0.5rem 0.3rem 0.5rem" }}>
					<TextField
						fullWidth
						size="small"
						value={groupName}
						onChange={(e) => setGroupName(e.target.value)}
						placeholder="Group name (optional)"
					/>
				</CommonBox>
			)}
			<CommonBox
				className="scrollbar-hide"
				sx={{
					height: matchDownSm
						? `${
								!_.isEmpty(selectedUsers)
									? Object.keys(selectedUsers).length > 1
										? "calc(100vh - 11.6rem)"
										: "calc(100vh - 9rem)"
									: "calc(100vh - 6.3rem)"
						  }`
						: `${
								!_.isEmpty(selectedUsers)
									? Object.keys(selectedUsers).length > 1
										? "calc(100% - 13.5rem)"
										: "calc(100% - 11.2rem)"
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
								data={shareListdata}
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
								data={data}
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
						onClick={() => initialChat.mutate()}
					>
						Chat
					</Button>
				</Box>
			)}
		</Box>
	);
}

export default NewMessageListSection;
