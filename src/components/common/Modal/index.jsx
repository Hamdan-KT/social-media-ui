import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Fade, styled, useTheme } from "@mui/material";
import ReactIcons from "utils/ReactIcons";
import { useRef } from "react";
import useOutSlideClick from "src/hooks/useOutSlideClick";

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
	overflow: "hidden",
}));

function CustomModal({
	children,
	open = false,
	onClose = () => {},
	closeIcon = false,
	sx = {},
}) {
	const theme = useTheme();
	const ref = useRef();

	const { outSide } = useOutSlideClick(ref, onClose);
	console.log(outSide);

	return (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			open={open}
			// onClose={!closeIcon ? onClose : null}
			onClose={() => onClose()}
			closeAfterTransition
			disableAutoFocus
			slots={{ backdrop: Backdrop }}
			slotProps={{
				backdrop: {
					timeout: 500,
					onClose: () => {
						console.log("calling backdrop click....");
					},
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
						{/* <div
							ref={ref}
							style={{
								// maxWidth: "100%",
								// height: "100%",
								alignItems: "center",
								justifyContent: "center",
								display: "flex",
							}}
						> */}
						{children}
						{/* </div> */}
					</MainBox>
				) : (
					<div
						ref={ref}
						style={{
							// maxWidth: "100%",
							// maxHeight: "100%",
							alignItems: "center",
							justifyContent: "center",
							display: "flex",
						}}
					>
						{children}
					</div>
				)}
			</Fade>
		</Modal>
	);
}

export default CustomModal;
