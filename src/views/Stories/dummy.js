import { faker } from "@faker-js/faker";
import { v4 as uuId } from "uuid";
export function generateStories() {
	const users = [];

	for (let i = 1; i <= 20; i++) {
		const user = {
			id: i,
			name: faker.person.fullName(),
			avatar: faker.image.avatar(),
			medias: [],
		};

		const storyCount = faker.number.int({ min: 1, max: 5 }); // Each user has 1-5 stories

		for (let j = 1; j <= storyCount; j++) {
			const media = {
				id: uuId(),
				type: faker.helpers.arrayElement(["image"]),
				url: faker.image.urlPicsumPhotos({ width: 1080, height: 1920 }),
				timestamp: faker.date.recent().toISOString(),
			};

			user.medias.push(media);
		}

		users.push(user);
	}

	return users;
}

export const storyTray = [
	{
		id: "8709608662",
		strong_id__: "8709608662",
		latest_reel_media: 1738734902,
		seen: 0,
		can_reply: true,
		can_gif_quick_reply: true,
		can_reshare: true,
		reel_type: "user_reel",
		ad_expiry_timestamp_in_millis: null,
		is_cta_sticker_available: null,
		app_sticker_info: null,
		should_treat_link_sticker_as_cta: null,
		pool_refresh_ttl_in_sec: null,
		can_react_with_avatar: false,
		expiring_at: 1738821302,
		user: {
			pk: "8709608662",
			pk_id: "8709608662",
			username: "afnan_fazz",
			full_name: "Afnan Kkr",
			is_private: false,
			strong_id__: "8709608662",
			id: "8709608662",
			is_verified: false,
			profile_pic_id: "3560763345366627453_8709608662",
			profile_pic_url:
				"https://scontent-tir3-3.cdninstagram.com/v/t51.2885-19/476510050_623638830041169_5029667840773733541_n.jpg?stp=dst-jpg_s150x150_tt6\u0026_nc_ht=scontent-tir3-3.cdninstagram.com\u0026_nc_cat=109\u0026_nc_ohc=yPfbThlsxM0Q7kNvgGK0nZv\u0026_nc_gid=f590155e54c84337a9e1ad08764944f4\u0026edm=ALlQn9MBAAAA\u0026ccb=7-5\u0026oh=00_AYCJUHT2DqXckw-w1UwCxqfMmph42w6rIA99le8izMwmDQ\u0026oe=67A8BDAB\u0026_nc_sid=e7f676",
			friendship_status: {
				muting: false,
				is_muting_reel: false,
				following: true,
				is_bestie: false,
				outgoing_request: false,
			},
		},
		ranked_position: 1,
		seen_ranked_position: 1,
		muted: false,
		prefetch_count: 0,
		ranker_scores: {
			ptap: 0.12432861328125,
			fp: null,
			vm: null,
			ranking_info_token: "",
			delivered_at_timestamp_s: 1738735201,
			ranked_at_timestamp_s: 1738735201,
		},
		story_duration_secs: 8.0,
		birthday_badge_enabled: false,
		has_besties_media: false,
		has_wearables_media: false,
		latest_wearables_reel_media: 0,
		latest_wearables_reel_media_long: 0,
		latest_besties_reel_media: 0.0,
		media_count: 3,
		media_ids: [
			"3560762987541986820",
			"3561088577428252731",
			"3561088960384903031",
		],
		has_video: true,
		has_fan_club_media: false,
		show_fan_club_stories_teaser: false,
		disabled_reply_types: ["story_remix_reply", "story_selfie_reply"],
		is_archived: false,
	},
];
