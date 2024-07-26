import React from "react";
import ChatHeader from "./Header";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import ChatInput from "./chatInput/Index";
import { motion } from "framer-motion";
import { chatData } from "src/data";
import Chat from "../chat";

function ChatLayout() {
	const theme = useTheme();
	const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<motion.div
			// initial={{ width: 0 }}
			// animate={{ width: "100%" }}
			// exit={{ x: "100%" }}
			style={{width: "100%"}}
		>
			<Grid container>
				{matchDownMd && <ChatHeader />}
				<Grid item xs={12}>
					<Box
						sx={{
							width: "100%",
							position: "relative",
							padding: 0,
						}}
					>
						{/* message header */}
						{!matchDownMd && <ChatHeader />}
					</Box>
				</Grid>
				<Grid item xs={12}>
					<Box
						sx={{
							overflowX: "hidden",
							mt: { xs: 6, sm: 7, md: 8 },
							height: {
								md: `calc(100vh - 20vh)`,
							},
							maxHeight: { xs: `100%`, md: `calc(100vh - 20vh)` },
							overflowY: { md: "scroll" },
							p: { xs: 0.5, sm: 1 },
							mb: { xs: 1, sm: 7, md: 0 },
							width: "100%"
						}}
					>
						{/* chats will render heare */}
						<Chat data={chatData} />
					</Box>
				</Grid>
				<Grid item xs={12} sx={{ xs: "0.2rem 0", md: 1 }}>
					{!matchDownMd && <ChatInput />}
				</Grid>
				{matchDownMd && <ChatInput />}
			</Grid>
		</motion.div>
	);
}

export default ChatLayout;
