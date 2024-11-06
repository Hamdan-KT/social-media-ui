import { motion } from "framer-motion";
import React, { useEffect, useRef, forwardRef } from "react";
import { Backdrop, Box, Typography, styled } from "@mui/material";
import useOutSlideClick from "hooks/useOutSlideClick";
import DefaultLoader from "../DefaultLoader";

const BottomSheetHeader = styled(Box)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: "0.5rem",
	borderBottom: `1px solid ${theme.palette.grey[300]}`,
	flexDirection: "column",
	cursor: "grab",
	position: "relative",
}));

const DragHandle = styled(Box)(({ theme }) => ({
	width: "40px",
	padding: "3px",
	borderRadius: "30px",
	backgroundColor: theme.palette.grey[300],
}));

const BottomSheetBody = styled(Box)(({ theme, title }) => ({
	width: "100%",
	height: title ? "calc(100% - 49.5px)" : "calc(100% - 22px)",
	maxHeight: "100%",
	overflowY: "scroll",
	color: "inherit",
}));

const CommonBox = styled("div")(({ theme }) => ({
	height: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "auto",
	gap: "1rem",
}));

const BottomSheet = forwardRef(function (
	{
		children,
		open,
		onClose = () => {},
		title = "",
		actionButton,
		sheetBodyStyles = {},
		actionLoading = false,
	},
	ref
) {
	const backdropRef = useRef();
	const contentRef = useRef();
	const headerRef = useRef();
	const isDragging = useRef(false);
	const startY = useRef();
	const startHeight = useRef(contentRef.current);

	const ModifiedActionBtn = React.Children.map(actionButton, (child) =>
		React.cloneElement(child, {
			...child.props,
		})
	);

	// out side click detect hook
	useOutSlideClick(contentRef, onClose);

	// handling initial height of sheet on each open
	useEffect(() => {
		if (open) {
			updateSheetHeight(60);
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [open]);

	// core js functions
	useEffect(() => {
		const header = headerRef.current;

		const dragStart = (e) => {
			isDragging.current = true;
			startY.current = e.pageY || e.touches?.[0]?.pageY;
			startHeight.current = parseInt(contentRef.current.style.height);
			headerRef.current.style.cursor = "grabbing";
			contentRef.current.style.transition = "none";
			e.preventDefault();
			e.stopPropagation();
		};

		const dragging = (e) => {
			if (!isDragging.current) return;
			let delta = startY.current - (e.pageY || e.touches?.[0]?.pageY);
			let updatedHeight =
				startHeight.current + (delta / window.innerHeight) * 100;
			updateSheetHeight(updatedHeight);
			e.preventDefault();
			e.stopPropagation();
		};

		const dragEnd = (e) => {
			isDragging.current = false;
			const sheetHeight = parseInt(contentRef.current?.style.height);
			sheetHeight < 25
				? onClose()
				: sheetHeight > 75
				? updateSheetHeight(100)
				: updateSheetHeight(60);
			headerRef.current.style.cursor = "grab";
			contentRef.current.style.transition = "0.2s ease-in-out";
			e.preventDefault();
			e.stopPropagation();
		};

		document.addEventListener("mousemove", dragging);
		document.addEventListener("mouseup", dragEnd);
		header?.addEventListener("mousedown", dragStart);
		header?.addEventListener("touchstart", dragStart);
		header?.addEventListener("touchmove", dragging);
		header?.addEventListener("touchend", dragEnd);

		return () => {
			header?.removeEventListener("mousedown", dragStart);
			header?.removeEventListener("touchstart", dragStart);
			header?.removeEventListener("touchmove", dragging);
			header?.removeEventListener("touchend", dragEnd);
			document.removeEventListener("mousemove", dragging);
			document.removeEventListener("mouseup", dragEnd);
		};
	}, []);

	function updateSheetHeight(height) {
		if (contentRef.current) contentRef.current.style.height = `${height}vh`;
	}

	return (
		<Backdrop
			ref={backdropRef}
			sx={{
				display: "flex",
				height: "100%",
				width: "100%",
				position: "fixed",
				top: 0,
				left: 0,
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "end",
				overflow: "hidden",
				zIndex: (theme) => theme.zIndex.drawer + 1,
			}}
			open={open}
		>
			<motion.div
				ref={contentRef}
				open={open}
				style={{
					background: "white",
					maxHeight: "100vh",
					width: "100%",
					borderRadius: "15px 15px 0 0",
					transform: open ? "translateY(0%)" : "translateY(100%)",
					transition: "0.2s ease",
				}}
			>
				<BottomSheetHeader ref={headerRef}>
					<DragHandle />
					{title && (
						<Typography sx={{ mt: 1, userSelect: "none" }} variant="h4">
							{title}
						</Typography>
					)}
					{actionButton && (
						<CommonBox sx={{ position: "absolute", right: "10px" }}>
							{actionLoading ? <DefaultLoader size={23} /> : ModifiedActionBtn}
						</CommonBox>
					)}
				</BottomSheetHeader>
				<BottomSheetBody
					className="scrollbar-hide"
					title={title}
					sx={{ ...sheetBodyStyles }}
				>
					{children}
				</BottomSheetBody>
			</motion.div>
		</Backdrop>
	);
});

export default BottomSheet;
