import { Box, styled } from "@mui/material";
import React from "react";

const ActiveIndex = styled(Box)({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	position: "absolute",
	bottom: 0,
	marginBottom: "0.5rem",
	left: "50%",
	transform: "translateX(-50%)",
	gap: "0.3rem",
});

const ActiveIndexItem = styled(Box)(({ active }) => ({
	padding: "4px",
	backgroundColor: active ? "#ffff" : "rgba(202, 202, 202, 0.61)",
	borderRadius: "50%",
	cursor: "pointer",
}));

function Pagination({
	activeIndex = 0,
	setActiveIndex,
	slideLength = 0,
}) {
	return (
		<>
			{slideLength !== 1 && (
				<ActiveIndex>
					{Array.from({ length: slideLength })?.map((item, ind) => (
						<ActiveIndexItem
							key={ind}
							active={activeIndex === ind}
							onClick={() => {
								setActiveIndex((pv) => (pv = ind));
							}}
						/>
					))}
				</ActiveIndex>
			)}
		</>
	);
}

export default Pagination;
