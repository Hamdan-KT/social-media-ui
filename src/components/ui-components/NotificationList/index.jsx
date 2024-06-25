/* eslint-disable react/display-name */
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/material/styles";
import Btn from "components/common/Button";
import { forwardRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImgWrapper from "components/common/ImgWrapper";
import { Typography } from "@mui/material";

function NotificationList({
	data,
	urlPrefix,
	navigateId,
	actionButton = false,
	loading = false,
	onClick,
	onButtonClick,
	buttonState,
	primaryText,
	secondaryText,
	customButton: CustomButton,
	sx = {},
}) {
	const theme = useTheme();
	const navigate = useNavigate();
	return (
		<List
			dense
			sx={{
				width: "100%",
				maxWidth: 400,
				bgcolor: theme.palette.background.default,
				gap: "0.5rem",
				...sx,
			}}
		>
			{data?.map((noti, index) => {
				const labelId = `checkbox-list-secondary-label-${index}`;
				return (
					<ListItem
						key={index}
						secondaryAction={
							CustomButton ? (
								<CustomButton onClick={() => onButtonClick(noti)} />
							) : actionButton ? (
								<>
									{noti.type === "normal" ? (
										noti[buttonState] ? (
											<Btn
												variant="outlined"
												onClick={() => onButtonClick(noti)}
											>
												Following
											</Btn>
										) : (
											<Btn onClick={() => onButtonClick(noti)}>Follow</Btn>
										)
									) : noti?.type === "action" ? (
										<ImgWrapper
											sx={{
												borderRadius: "7px",
												width: "2.5rem",
												height: "2.5rem",
											}}
										>
											<img
												style={{
													display: "block",
													width: "100%",
													objectFit: "cover",
												}}
												src={noti?.media}
												alt="img"
											/>
										</ImgWrapper>
									) : null}
								</>
							) : null
						}
						disablePadding
					>
						<ListItemButton
							onClick={() => {
								typeof onClick === "function" && onClick();
								urlPrefix &&
									navigateId &&
									navigate(`${urlPrefix}/${noti[navigateId]}`);
							}}
						>
							<ListItemAvatar>
								<Avatar alt={`not found`} src={noti?.profile} />
							</ListItemAvatar>
							<ListItemText
								primaryTypographyProps={{
									fontSize: 13,
									fontWeight: "bold",
								}}
								secondaryTypographyProps={{
									whiteSpace: "wrap",
									flexWrap: "wrap",
									fontSize: 14,
									mr: {
										xs: 9,
										sm: 5,
									},
								}}
								id={labelId}
								primary={noti[primaryText] ?? noti?.name}
								secondary={noti[secondaryText]}
							></ListItemText>
						</ListItemButton>
					</ListItem>
				);
			})}
		</List>
	);
}

export default NotificationList;
