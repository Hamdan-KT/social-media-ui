import Btn from "components/common/Button";
import ImgWrapper from "components/common/ImgWrapper";
import ProfileAvatar from "components/common/ProfileAvatar";
import {
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

function NotiListItem({
	type = "action",
	buttonState,
	customButton,
	onButtonClick = () => {},
	onClick,
	data = {},
	urlPrefix,
	navigateId,
	primaryText,
	secondaryText,
	customButtonProps,
	actionButton = true,
}) {
	const navigate = useNavigate();
	const ModifiedCustomBtn = React.Children.map(customButton, (child) =>
		React.cloneElement(child, {
			onClick: () => onButtonClick(data),
			...customButtonProps,
		})
	);
	return (
		<ListItem
			secondaryAction={
				customButton ? (
					ModifiedCustomBtn
				) : actionButton ? (
					<>
						{type === "action" ? (
							data[buttonState] ? (
								<Btn variant="outlined" onClick={() => onButtonClick(data)}>
									Following
								</Btn>
							) : (
								<Btn onClick={() => onButtonClick(data)}>Follow</Btn>
							)
						) : type === "normal" ? (
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
									src={data?.media}
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
					urlPrefix && navigateId && navigate(`${urlPrefix}/${navigateId}`);
				}}
			>
				<ListItemAvatar sx={{ display: "flex" }}>
					<ProfileAvatar
						data={data}
						sx={{
							width: { xs: 43, sm: 46 },
							height: { xs: 43, sm: 46 },
						}}
						containerSx={{ padding: { xs: "2px", sm: "2px" }, mr: 1 }}
					/>
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
					primary={primaryText}
					secondary={secondaryText}
				></ListItemText>
			</ListItemButton>
		</ListItem>
	);
}

export default NotiListItem;
