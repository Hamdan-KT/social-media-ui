import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Fade, Zoom, styled, useTheme } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useRef } from "react";
import { useEffect } from "react";
import ReactIcons from "utils/ReactIcons";

const MainBox = styled(Box)(({ theme }) => ({
	width: "100%",
	position: "absolute",
	height: "100%",
	maxHeight: "100%",
	boxShadow: 24,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: "2.5rem 0.5rem 0.5rem 0.5rem",
	overflow: "hidden"
}));

function CustomModal({
	children,
	open = false,
	onClose = () => {},
	closeIcon = false,
	sx = {},
}) {
	const theme = useTheme()
	return (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			open={open}
			onClose={!closeIcon ? onClose : null}
			closeAfterTransition
			disableAutoFocus
			slots={{ backdrop: Backdrop }}
			slotProps={{
				backdrop: {
					timeout: 500,
					// onClick: onClose
				},
			}}
			sx={sx}
		>
			<Fade in={open}>
				{closeIcon ? (
					<MainBox>
						{closeIcon && (
							<ReactIcons.IoClose
								style={{
									position: "absolute",
									left: "0.3rem",
									top: "0.3rem",
									color: theme.palette.background.paper,
									cursor: "pointer",
									fontSize: "2rem",
								}}
								onClick={onClose}
							/>
						)}
						{children}
					</MainBox>
				) : (
					<>{children}</>
				)}
			</Fade>
		</Modal>
	);
}

export default CustomModal;
