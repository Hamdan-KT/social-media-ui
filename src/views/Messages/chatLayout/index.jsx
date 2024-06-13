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
			initial={{ width: matchDownMd && 0 }}
			animate={{ width: matchDownMd && "100%" }}
			exit={{ x: matchDownMd && "100%" }}
		>
			<Grid container>
				{matchDownMd && <ChatHeader />}
				<Grid item xs={12}>
					<Box
						sx={{
							width: "100%",
							position: "relative",
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
							mt: { xs: 7, sm: 6, md: 8 },
							height: {
								md: `calc(100vh - 165px)`,
							},
							maxHeight: { xs: `100%`, md: `calc(100vh - 165px)` },
							overflowY: { md: "scroll" },
							p: { xs: 0.5, sm: 1},
						}}
					>
						{/* chats will render heare */}
						<Chat data={chatData} />
					</Box>
				</Grid>
				<Grid item xs={12} p={{ xs: "0.2rem 0", md: 1 }}>
					{!matchDownMd && <ChatInput />}
				</Grid>
				{matchDownMd && <ChatInput />}
			</Grid>
		</motion.div>
	);
}

export default ChatLayout;
