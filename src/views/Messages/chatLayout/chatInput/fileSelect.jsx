import ReactIcons from "src/utils/ReactIcons";
import { IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import {
	messageContentTypes,
	messageMediaTypes,
	messageStatusTypes,
	messageTypes,
} from "src/utils/constants";
import { blobUrlToFile, createURLfromImage } from "src/utils/common";
import { useDispatch, useSelector } from "react-redux";
import {
	setChatMessages,
	updateAttachment,
} from "src/app/slices/messageSlice/messageSlice";
import { messageEvents } from "src/services/socket/events";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { uploadMessageMedias } from "src/api/messageAPI";

function FileSelect() {
	const messageState = useSelector((state) => state.message);
	const user = useSelector((state) => state.user?.user);
	const socket = useSelector((state) => state.socket.socket);
	const dispatch = useDispatch();
	const { chatId } = useParams();

	const uploadMessagMedia = useMutation({
		mutationKey: ["upload-messge-media"],
		mutationFn: (data) => uploadMessageMedias(data),
	});

	const sendMediaMessage = async (medias = []) => {
		const newMessage = {
			_id: uuidv4(),
			chatId: chatId ?? messageState?.selectedChat?._id,
			senderId: user?._id,
			receiverId: messageState?.selectedChat?.receiver?._id,
			messageType: messageState?.attachment?.message
				? messageTypes.REPLY
				: messageTypes.GENERAL,
			contentType:
				medias?.length > 0
					? messageContentTypes.MEDIA
					: messageContentTypes.TEXT,
			replyRef: messageState?.attachment?.message ?? null,
			content: "",
			media: medias,
			...(messageState?.attachment?.media && {
				details: {
					mediaId: messageState.attachment.media,
				},
			}),
			sender: {
				_id: user?._id,
			},
		};
		let updatedMessages = [
			...(messageState?.chatMessages ?? []),
			{ ...newMessage, status: messageStatusTypes.SENDING },
		];
		dispatch(setChatMessages(updatedMessages));
		const formData = new FormData();
		await Promise.all(
			medias?.map(async (media) => {
				formData.append(
					[media?.name],
					await blobUrlToFile(media?.url, media?.name, media?.actualType)
				);
			})
		);
		formData.append("chatId", chatId ?? messageState?.selectedChat?._id);
		await uploadMessagMedia.mutateAsync(formData).then((data) => {
			socket.emit(
				messageEvents.SEND_MESSAGE,
				{ ...newMessage, media: data?.data },
				(response) => {
					console.log({ response });
					dispatch(
						setChatMessages(
							updatedMessages.map((msg) =>
								msg._id === newMessage._id
									? {
											...response.formattedMessage,
											status: messageStatusTypes.SEND,
									  }
									: msg
							)
						)
					);
				}
			);
			if (newMessage?.messageType === messageTypes.REPLY) {
				dispatch(updateAttachment({}));
			}
		});
	};

	const handleFileSelect = (e) => {
		const files = e.target.files;

		if (files?.length === 0) {
			return;
		}

		const selectedMedias = Object.keys(files).map((key) => {
			const file = files[key];
			let fileType = "";

			// checking file type
			if (file.type.startsWith("image/")) {
				fileType = messageMediaTypes.IMAGE;
			} else if (file.type.startsWith("video/")) {
				fileType = messageMediaTypes.VIDEO;
			} else if (file.type.startsWith("audio/")) {
				fileType = messageMediaTypes.AUDIO;
			}

			return {
				type: fileType,
				url: createURLfromImage(file),
				actualType: file?.type,
				name: file?.name,
			};
		});

		sendMediaMessage(selectedMedias);
	};

	return (
		<>
			<IconButton color="inherit" for="message-file" component="label">
				<ReactIcons.IoMdImages />
			</IconButton>
			<TextField
				id="message-file"
				style={{ display: "none" }}
				onChange={handleFileSelect}
				type="file"
				inputProps={{
					multiple: true,
					accept: "image/*, video/*, audio/*",
				}}
			/>
		</>
	);
}

export default FileSelect;
