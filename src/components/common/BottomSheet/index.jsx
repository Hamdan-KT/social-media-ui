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
	// position: "absolute",
	// top: "50%",
	// left: "50%",
	// transform: "translate(-50%, -50%)",
	// minHeight: "100vh",
	// maxHeight: "100vh",
	// width: "100%",
	// borderRadius: "15px 15px 0 0",
	// bgcolor: "background.paper",
	// border: "2px solid #000",
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
}) {
	const theme = useTheme();
	const machDownMd = useMediaQuery(theme.breakpoints.down("md"));
	const backdropRef = useRef();
	const contentRef = useRef();
	const headerRef = useRef();
	// global variables
	const isDragging = useRef(false);
	const startY = useRef();
	const startHeight = useRef(contentRef.current);

	useEffect(() => {
		updateSheetHeight(60);
	}, []);

	useEffect(() => {
		console.log("Executed.....");
		const header = headerRef.current;
		const backdrop = backdropRef.current;
		header.addEventListener("mousedown", dragStart);
		backdrop.addEventListener("mousemove", dragging);
		backdrop.addEventListener("mouseup", dragEnd);

		header.addEventListener("touchstart", dragStart);
		backdrop.addEventListener("touchmove", dragging);
		backdrop.addEventListener("touchend", dragEnd);

		// header.addEventListener("pointerdown", dragStart);
		// document.addEventListener("pointermove", dragging);
		// document.addEventListener("pointerup", dragEnd);

		return () => {
			header.removeEventListener("mousedown", dragStart);
			backdrop.removeEventListener("mousemove", dragging);
			backdrop.removeEventListener("mouseup", dragEnd);

			header.removeEventListener("touchstart", dragStart);
			backdrop.removeEventListener("touchmove", dragging);
			backdrop.removeEventListener("touchend", dragEnd);

			// header.removeEventListener("pointerdown", dragStart);
			// document.removeEventListener("pointermove", dragging);
			// document.removeEventListener("pointerup", dragEnd);
		};
	});

	function updateSheetHeight(height) {
		console.log({ height });
		if (contentRef.current) contentRef.current.style.height = `${height}vh`;
	}

	function dragStart(e) {
			isDragging.current = true;
			startY.current = e.pageY || e.touches?.[0]?.pageY;
			startHeight.current = parseInt(contentRef.current.style.height);
			headerRef.current.style.cursor = "grabbing";
			contentRef.current.style.transition = "none";
		}
		function dragging(e) {
			if (!isDragging.current) return;
			let delta = startY.current - (e.pageY || e.touches?.[0]?.pageY);
			let updatedHeight =
				startHeight.current + (delta / window.innerHeight) * 100;
			updateSheetHeight(updatedHeight);
		}
		function dragEnd(e) {
			isDragging.current = false;
			const sheetHeight = parseInt(contentRef.current?.style.height);
			sheetHeight < 25
				? onClose()
				: sheetHeight > 75
				? updateSheetHeight(100)
				: updateSheetHeight(60);
			headerRef.current.style.cursor = "grab";
			contentRef.current.style.transition = "0.2s ease-in";
		}

	return (
		<Backdrop
			ref={backdropRef}
			sx={{
				color: "#fff",
				display: "flex",
				height: "100%",
				width: "100%",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "end",
				zIndex: (theme) => theme.zIndex.drawer + 1,
			}}
			open={open}
			onClick={onClose}
		>
			<motion.div
				ref={contentRef}
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
				}}
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
						<Typography sx={{ mt: 1, userSelect: "none" }} variant="userName">
							{title}
						</Typography>
					)}
				</BottomSheetHeader>
				<BottomSheetBody className="scrollbar-hide">{children}</BottomSheetBody>
			</motion.div>
		</Backdrop>
	);
}

export default BottomSheet;



// import {
// 	animate,
// 	AnimatePresence,
// 	motion,
// 	useMotionTemplate,
// 	useMotionValue,
// 	useMotionValueEvent,
// 	useTransform,
// } from "framer-motion";

// import { useEffect, forwardRef, useRef, useState } from "react";
// import Slide from "@mui/material/Slide";
// import {
// 	Backdrop,
// 	Box,
// 	Modal,
// 	Typography,
// 	styled,
// 	useMediaQuery,
// 	useTheme,
// } from "@mui/material";

// const Transition = forwardRef(function Transition(props, ref) {
// 	return <Slide direction="up" ref={ref} {...props} />;
// });

// const BottomSheetContent = styled(Box)(({ theme, open }) => ({
// 	background: "white",
// 	maxHeight: "100vh",
// 	width: "100%",
// 	borderRadius: "15px 15px 0 0",
// 	transform: open ? "translateY(0%)" : "translateY(100%)",
// 	transition: "0.2s ease",
// 	// position: "absolute",
// 	// top: "50%",
// 	// left: "50%",
// 	// transform: "translate(-50%, -50%)",
// 	// minHeight: "100vh",
// 	// maxHeight: "100vh",
// 	// width: "100%",
// 	// borderRadius: "15px 15px 0 0",
// 	// bgcolor: "background.paper",
// 	// border: "2px solid #000",
// }));

// const BottomSheetHeader = styled(Box)(({ theme }) => ({
// 	display: "flex",
// 	alignItems: "center",
// 	justifyContent: "center",
// 	padding: "0.5rem",
// 	borderBottom: `1px solid ${theme.palette.grey[300]}`,
// 	flexDirection: "column",
// 	cursor: "grab",
// }));

// const DragHandle = styled(Box)(({ theme }) => ({
// 	width: "40px",
// 	padding: "3px",
// 	borderRadius: "30px",
// 	backgroundColor: theme.palette.grey[300],
// }));

// const BottomSheetBody = styled(Box)(({ theme }) => ({
// 	width: "100%",
// 	height: "calc(100% - 49.5px)",
// 	maxHeight: "100%",
// 	overflowY: "scroll",
// 	padding: "0.5rem",
// 	color: "inherit",
// }));

// function BottomSheet({
// 	children,
// 	title = "",
// 	open = false,
// 	onClose = () => {},
// }) {
// 	const theme = useTheme();
// 	const machDownMd = useMediaQuery(theme.breakpoints.down("md"));
// 	const backdropRef = useRef();
// 	const contentRef = useRef();
// 	const headerRef = useRef();
// 	// global variables
// 	const isDragging = useRef(false);
// 	const startY = useRef();
// 	const startHeight = useRef(contentRef.current);

// 	useEffect(() => {
// 		updateSheetHeight(60);
// 	}, []);

// 	useEffect(() => {
// 		console.log("Executed.....");
// 		const header = headerRef.current;
// 		const backdrop = backdropRef.current;
// 		header.addEventListener("mousedown", dragStart);
// 		backdrop.addEventListener("mousemove", dragging);
// 		backdrop.addEventListener("mouseup", dragEnd);

// 		header.addEventListener("touchstart", dragStart);
// 		backdrop.addEventListener("touchmove", dragging);
// 		backdrop.addEventListener("touchend", dragEnd);

// 		// header.addEventListener("pointerdown", dragStart);
// 		// document.addEventListener("pointermove", dragging);
// 		// document.addEventListener("pointerup", dragEnd);

// 		return () => {
// 			header.removeEventListener("mousedown", dragStart);
// 			backdrop.removeEventListener("mousemove", dragging);
// 			backdrop.removeEventListener("mouseup", dragEnd);

// 			header.removeEventListener("touchstart", dragStart);
// 			backdrop.removeEventListener("touchmove", dragging);
// 			backdrop.removeEventListener("touchend", dragEnd);

// 			// header.removeEventListener("pointerdown", dragStart);
// 			// document.removeEventListener("pointermove", dragging);
// 			// document.removeEventListener("pointerup", dragEnd);
// 		};
// 	});

// 	function updateSheetHeight(height) {
// 		console.log({ height });
// 		if (contentRef.current) contentRef.current.style.height = `${height}vh`;
// 	}

// 	function dragStart(e) {
// 			isDragging.current = true;
// 			startY.current = e.pageY || e.touches?.[0]?.pageY;
// 			startHeight.current = parseInt(contentRef.current.style.height);
// 			headerRef.current.style.cursor = "grabbing";
// 			contentRef.current.style.transition = "none";
// 		}
// 		function dragging(e) {
// 			if (!isDragging.current) return;
// 			let delta = startY.current - (e.pageY || e.touches?.[0]?.pageY);
// 			let updatedHeight =
// 				startHeight.current + (delta / window.innerHeight) * 100;
// 			updateSheetHeight(updatedHeight);
// 		}
// 		function dragEnd(e) {
// 			isDragging.current = false;
// 			const sheetHeight = parseInt(contentRef.current?.style.height);
// 			sheetHeight < 25
// 				? onClose()
// 				: sheetHeight > 75
// 				? updateSheetHeight(100)
// 				: updateSheetHeight(60);
// 			headerRef.current.style.cursor = "grab";
// 			contentRef.current.style.transition = "0.2s ease-in";
// 		}

// 	return (
// 		<Backdrop
// 			ref={backdropRef}
// 			sx={{
// 				color: "#fff",
// 				display: "flex",
// 				height: "100%",
// 				width: "100%",
// 				flexDirection: "column",
// 				alignItems: "center",
// 				justifyContent: "end",
// 				zIndex: (theme) => theme.zIndex.drawer + 1,
// 			}}
// 			open={open}
// 			onClick={onClose}
// 		>
// 			<motion.div
// 				ref={contentRef}
// 				onClick={(e) => {
// 					e.preventDefault();
// 					e.stopPropagation();
// 				}}
// 				open={open}
// 				style={{
// 					background: "white",
// 					maxHeight: "100vh",
// 					width: "100%",
// 					borderRadius: "15px 15px 0 0",
// 					transform: open ? "translateY(0%)" : "translateY(100%)",
// 					transition: "0.2s ease",
// 				}}
// 			>
// 				<BottomSheetHeader ref={headerRef}>
// 					<DragHandle />
// 					{title && (
// 						<Typography sx={{ mt: 1, userSelect: "none" }} variant="userName">
// 							{title}
// 						</Typography>
// 					)}
// 				</BottomSheetHeader>
// 				<BottomSheetBody className="scrollbar-hide">{children}</BottomSheetBody>
// 			</motion.div>
// 		</Backdrop>
// 	);
// }

// export default BottomSheet;