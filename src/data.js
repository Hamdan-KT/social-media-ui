import { faker } from "@faker-js/faker";

function getRandomImageRatio() {
	const sizes = [
		{ width: 1080, height: 1350 },
		{ width: 1080, height: 1080 },
		{ width: 1080, height: 608 },
	];
	const randomIndex = Math.floor(Math.random() * sizes.length);
	return sizes[randomIndex];
}

export const defaultUser = {
	id: faker.database.mongodbObjectId(),
	userId: faker.person.fullName(),
	name: faker.person.fullName(),
	profile: faker.image.avatarLegacy(),
};

export const generateUserPosts = () => {
	const imageRatio = getRandomImageRatio();
	return Array.from({ length: 42 }, () => ({
		id: faker.database.mongodbObjectId(),
		name: faker.person.fullName(),
		profile: faker.image.avatarLegacy(),
		media: [
			{
				type: "image",
				src: faker.image.urlPicsumPhotos(imageRatio),
			},
			{
				type: "image",
				src: faker.image.urlPicsumPhotos(imageRatio),
			},
		],
		location: faker.location.country(),
		time: "4d",
		verified: false,
		likes: faker.number.int(20000),
		comments: faker.number.int(5000),
	}));
};

export const generateUserStories = () => {
	return Array.from({ length: 30 }, () => ({
		id: faker.database.mongodbObjectId(),
		name: faker.person.fullName(),
		profile: faker.image.avatarLegacy(),
		stories: [],
		verified: false,
	}));
};
export const generateUsers = () => {
	return Array.from({ length: 40 }, () => ({
		id: faker.database.mongodbObjectId(),
		name: faker.person.fullName(),
		profile: faker.image.avatarLegacy(),
		time: "49m",
		verified: false,
		following: false,
	}));
};

export const generateExplorePosts = () => {
	const imageRatio = getRandomImageRatio();
	return Array.from({ length: 51 }, () => ({
		id: faker.database.mongodbObjectId(),
		name: faker.person.fullName(),
		profile: faker.image.avatarLegacy(),
		media: [
			{
				type: "image",
				src: faker.image.urlPicsumPhotos(imageRatio),
			},
			{
				type: "image",
				src: faker.image.urlPicsumPhotos(imageRatio),
			},
		],
		location: faker.location.country(),
		time: "49m",
		verified: false,
		likes: faker.number.int(20000),
		comments: faker.number.int(5000),
	}));
};

export const generateNotifications = () => {
	return Array.from({ length: 10 }, () => ({
		id: faker.database.mongodbObjectId(),
		name: faker.person.fullName(),
		profile: faker.image.avatarLegacy(),
		time: "49m",
		verified: false,
		type: "normal",
		media: faker.image.urlPicsumPhotos({ width: 1080, height: 1350 }),
		message: `${faker.person.fullName()} liked your post`,
	}));
};

export const generateCommentList = () => {
	return Array.from({ length: 40 }, () => ({
		id: faker.database.mongodbObjectId(),
		name: faker.person.fullName(),
		profile: faker.image.avatarLegacy(),
		time: "1h",
		verified: true,
		comment: faker.lorem.sentence(),
		likes: faker.number.int(1300),
		replies: [
			{
				id: faker.database.mongodbObjectId(),
				name: faker.person.fullName(),
				profile: faker.image.avatarLegacy(),
				time: "1h",
				verified: false,
				comment: faker.lorem.sentence(),
				likes: faker.number.int(1300),
			},
			{
				id: faker.database.mongodbObjectId(),
				name: faker.person.fullName(),
				profile: faker.image.avatarLegacy(),
				time: "1h",
				verified: false,
				comment: faker.lorem.sentence(),
				likes: faker.number.int(1300),
			},
		],
	}));
};

export const chatData = [
	{
		id: 1,
		type: "text",
		caption: "Hey there! How's it going?",
		incoming: true,
	},
	{
		id: 2,
		type: "text",
		caption: "Hey! I'm doing great, thanks. How about you?",
		incoming: false,
	},
	{
		id: 3,
		type: "text",
		caption: "I'm good too. What have you been up to?",
		incoming: true,
	},
	{
		id: 4,
		type: "text",
		caption: "Not much, just working on some projects.",
		incoming: false,
	},
	{
		id: 4,
		type: "text",
		caption: "and Finding New Ideas.",
		incoming: false,
	},
	{
		id: 5,
		type: "time",
		time: "Today",
	},
	{
		id: 6,
		type: "media",
		media: [
			{
				type: "image",
				src: "https://images.pexels.com/photos/5192244/pexels-photo-5192244.jpeg?auto=compress&cs=tinysrgb&w=600",
			},
		],
		incoming: true,
	},
	{
		id: 7,
		type: "text",
		caption: "Wow, that's beautiful! Where was it taken?",
		incoming: true,
	},
	{
		id: 8,
		type: "reply",
		ref: {
			type: "image",
			src: "https://images.pexels.com/photos/5192244/pexels-photo-5192244.jpeg?auto=compress&cs=tinysrgb&w=600",
		},
		caption: "I'm not sure, but I love the colors!",
		incoming: false,
	},
	{
		id: 9,
		type: "reply",
		ref: {
			type: "text",
			caption: "I'm good too. What have you been up to?",
		},
		caption: "Just the usual. How about you?",
		incoming: false,
	},
	{
		id: 10,
		type: "media",
		media: [
			{
				type: "image",
				src: "https://images.pexels.com/photos/4621896/pexels-photo-4621896.jpeg?auto=compress&cs=tinysrgb&w=600",
			},
			{
				type: "image",
				src: "https://images.pexels.com/photos/5192244/pexels-photo-5192244.jpeg?auto=compress&cs=tinysrgb&w=600",
			},
			{
				type: "image",
				src: "https://images.pexels.com/photos/4621896/pexels-photo-4621896.jpeg?auto=compress&cs=tinysrgb&w=600",
			},
			{
				type: "image",
				src: "https://images.pexels.com/photos/5192244/pexels-photo-5192244.jpeg?auto=compress&cs=tinysrgb&w=600",
			},
		],
		incoming: false,
	},
	{
		id: 8,
		type: "reply",
		ref: {
			type: "image",
			src: "https://images.pexels.com/photos/4621896/pexels-photo-4621896.jpeg?auto=compress&cs=tinysrgb&w=600",
		},
		caption: "Ya it looking good 🥰",
		incoming: true,
	},
	{
		id: 9,
		type: "reply",
		ref: {
			type: "text",
			caption: "Just the usual. How about you?",
		},
		caption: "Fine 🤞",
		incoming: true,
	},
	{
		id: 11,
		type: "media",
		media: [
			{
				type: "voice",
				src: "https://images.pexels.com/photos/5192244/pexels-photo-5192244.jpeg?auto=compress&cs=tinysrgb&w=600",
			},
		],
		incoming: true,
	},
	{
		id: 12,
		type: "media",
		media: [
			{
				type: "voice",
				src: "https://images.pexels.com/photos/5192244/pexels-photo-5192244.jpeg?auto=compress&cs=tinysrgb&w=600",
			},
		],
		incoming: false,
	},
	{
		id: 13,
		type: "reply",
		ref: {
			type: "voice",
			src: "https://images.pexels.com/photos/5192244/pexels-photo-5192244.jpeg?auto=compress&cs=tinysrgb&w=600",
		},
		caption: "Check it out",
		incoming: true,
	},
	{
		id: 13,
		type: "reply",
		ref: {
			type: "voice",
			src: "https://images.pexels.com/photos/5192244/pexels-photo-5192244.jpeg?auto=compress&cs=tinysrgb&w=600",
		},
		caption: "That's so cool! What were you saying?",
		incoming: false,
	},
	{
		id: 14,
		type: "text",
		caption: "I'm heading out now. Catch up later!",
		incoming: true,
	},
	{
		id: 15,
		type: "text",
		caption: "Sure! Take care and talk to you soon!",
		incoming: false,
	},
	{
		id: 16,
		type: "text",
		caption: "Bye!",
		incoming: true,
	},
	{
		id: 17,
		type: "text",
		caption: "Goodbye!",
		incoming: false,
	},
];
