import React from "react";
import { Box, Skeleton } from "@mui/material";

const ChatMessagesSkeleton = () => {
	// Array to simulate the loading messages structure
	const loadingMessages = Array(10).fill(null);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				height: "auto",
				width: "100%",
				padding: "0.5rem",
				overflowY: "auto",
				gap: "0.5rem",
			}}
		>
			{loadingMessages.map((_, index) => (
				<Box
					key={index}
					sx={{
						display: "flex",
						width: "100%",
						justifyContent: index % 2 === 0 ? "flex-start" : "flex-end",
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: "0.5rem",
							width: "70%",
							alignItems: index % 2 === 0 ? "flex-start" : "flex-end",
						}}
					>
						<Skeleton
							variant="rounded"
							width={`${Math.random() * (90 - 70) + 70}%`} // Random width for variety
							height={32}
							sx={{ borderRadius: "20px" }}
						/>
						<Skeleton
							variant="rounded"
							width={`${Math.random() * (90 - 70) + 70}%`} // Random width for variety
							height={32}
							sx={{ borderRadius: "20px" }}
						/>
						{index % 2 === 0 && (
							<Skeleton
								variant="rounded"
								width={`${Math.random() * (90 - 20) + 20}%`} // Random width for variety
								height={32}
								sx={{ borderRadius: "20px" }}
							/>
						)}
					</Box>
				</Box>
			))}
		</Box>
	);
};

export default ChatMessagesSkeleton;
