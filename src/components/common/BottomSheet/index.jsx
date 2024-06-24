import {
	animate,
	AnimatePresence,
	motion,
	useMotionTemplate,
	useMotionValue,
	useMotionValueEvent,
	useTransform,
} from "framer-motion";
import { useEffect, forwardRef, useRef, useState } from "react";
import Slide from "@mui/material/Slide";
import {
	Backdrop,
	Box,
	Modal,
	Typography,
	styled,
	useMediaQuery,
	useTheme,
} from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const BottomSheetContent = styled(Box)(({ theme, open }) => ({
	background: "white",
	maxHeight: "100vh",
	width: "100%",
	borderRadius: "15px 15px 0 0",
	transform: open ? "translateY(0%)" : "translateY(100%)",
	transition: "0.2s ease",
}));

const BottomSheetHeader = styled(Box)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: "0.5rem",
	borderBottom: `1px solid ${theme.palette.grey[300]}`,
	flexDirection: "column",
	cursor: "grab",
}));

const DragHandle = styled(Box)(({ theme }) => ({
	width: "40px",
	padding: "3px",
	borderRadius: "30px",
	backgroundColor: theme.palette.grey[300],
}));

const BottomSheetBody = styled(Box)(({ theme }) => ({
	width: "100%",
	height: "calc(100% - 49.5px)",
	maxHeight: "100%",
	overflowY: "scroll",
	padding: "0.5rem",
	color: "inherit",
}));

function BottomSheet({
	children,
	title = "",
	open = false,
	onClose = () => {},
	sheetBodyStyles = {},
}) {
	const theme = useTheme();
	const machDownMd = useMediaQuery(theme.breakpoints.down("md"));
	const backdropRef = useRef();
	const contentRef = useRef();
	const headerRef = useRef();
	const isDragging = useRef(false);
	const startY = useRef();
	const startHeight = useRef(contentRef.current);

	useEffect(() => {
		updateSheetHeight(60);
	}, []);

	useEffect(() => {
		const header = headerRef.current;
		const backdrop = backdropRef.current;

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
			contentRef.current.style.transition = "0.2s ease-in";
			e.preventDefault();
			e.stopPropagation();
		};

		document.addEventListener("mousemove", dragging);
		document.addEventListener("mouseup", dragEnd);
		header.addEventListener("mousedown", dragStart);
		header.addEventListener("touchstart", dragStart);
		header.addEventListener("touchmove", dragging);
		header.addEventListener("touchend", dragEnd);

		return () => {
			header.removeEventListener("mousedown", dragStart);
			header.removeEventListener("touchstart", dragStart);
			header.removeEventListener("touchmove", dragging);
			header.removeEventListener("touchend", dragEnd);
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
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "end",
				zIndex: (theme) => theme.zIndex.drawer + 1,
			}}
			open={open}
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				onClose();
			}}
		>
			<motion.div
				ref={contentRef}
				open={open}
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
				}}
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
				</BottomSheetHeader>
				<BottomSheetBody className="scrollbar-hide" sx={{ ...sheetBodyStyles }}>
					{children}
				</BottomSheetBody>
			</motion.div>
		</Backdrop>
	);
}

export default BottomSheet;
