import ReactIcons from "./ReactIcons";

export const drawerWidth = 250;
export const defaultSpacing = 2;

export const messageSections = {
	PRIMARY: "Primary",
	GENERAL: "General",
	REQUESTS: "Requests",
};

export const sidebarpopUps = {
	SEARCH: "search",
	NOTIFICATION: "notification",
	CREATE: "create",
};

export const postStages = {
	CROP: "crop",
	EDIT: "edit",
	SHARE: "share",
};

export const postRatios = {
	PORTRAIT: 4 / 5,
	SQUARE: 1 / 1,
	LANDSCAPE: 16 / 9,
	REELS: 9 / 16,
	STORY: 9 / 16,
};

export const commentTypes = {
	GENERAL: "general",
	REPLY: "reply",
};

export const messageTypes = {
	GENERAL: "general",
	REPLY: "reply",
};

export const messageContentTypes = {
	TEXT: "text",
	MEDIA: "media",
};

export const messageMediaTypes = {
	IMAGE: "image",
	VIDEO: "video",
	AUDIO: "audio",
	FILE: "file",
};

export const messageStatusTypes = {
	SEND: "send",
	SENDING: "sending",
	FAILED: "failed",
};

export const relationStatus = {
	FOLLOWING: "following",
	REQUESTED: "requested",
	NOT_FOLLOWING: "not_following",
};

export const editingSlidersConfig = [
	{
		id: "Brightness",
		label: "Brightness",
		min: 0,
		max: 100,
		defaultValue: 50,
		Icon: ReactIcons.BsBrightnessHigh,
	},
	{
		id: "Contrast",
		label: "Contrast",
		min: 0,
		max: 100,
		defaultValue: 50,
		Icon: ReactIcons.IoContrast,
	},
	{
		id: "Saturation",
		label: "Saturation",
		min: 0,
		max: 100,
		defaultValue: 50,
		Icon: ReactIcons.MdOutlineWaterDrop,
	},
	{
		id: "Fade",
		label: "Fade",
		min: 0,
		max: 100,
		defaultValue: 50,
		Icon: ReactIcons.LuCloudy,
	},

	{
		id: "Temperature",
		label: "Temperature",
		min: 0,
		max: 100,
		defaultValue: 50,
		Icon: ReactIcons.BsThermometerHalf,
	},
	{
		id: "Vignette",
		label: "Vignette",
		min: 0,
		max: 100,
		defaultValue: 50,
		Icon: ReactIcons.BsVignette,
	},
];
