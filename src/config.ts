import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "白鹿原嚒",
	subtitle: "白鹿原嚒的博客",
	lang: "zh_CN",
	themeColor: {
		hue: 120, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: false, // Hide the theme color picker for visitors
	},
	banner: {
		enable: false,
		src: "assets/images/demo-banner.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
		position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: false, // Display the credit text of the banner image
			text: "", // Credit text to be displayed
			url: "", // (Optional) URL link to the original artwork or artist's page
		},
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		// Leave this array empty to use the default favicon
		// {
		//   src: '/favicon/icon.png',    // Path of the favicon, relative to the /public directory
		//   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
		//   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
		// }
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		{
			name: "主页",
			url: "https://blym.top/",
			external: true,
		},
		LinkPreset.blog,
		LinkPreset.Archive,
		{
			name: "关于",
			url: "/about",
		},
		{
			name: "友链",
			url: "https://blym.top/#friends",
			external: true,
		},
		{
			name: "GitHub",
			url: "https://github.com/COLDESTBOW30654",
			external: true,
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.png",
	name: "白鹿原嚒",
	bio: "尚未决定清与浊的心，是否能成为自己的眼睛？",
	links: [
		{
			name: "GitHub",
			url: "https://github.com/COLDESTBOW30654",
			icon: "fa6-brands:github",
		},
		{
			name: "Gitee",
			url: "https://gitee.com/coldestbow30654",
			icon: 'custom:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296z"/></svg>',
		},
		{
			name: "Bilibili",
			url: "https://space.bilibili.com/3546562022083097",
			icon: "fa6-brands:bilibili",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
	// Please select a dark theme, as this blog theme currently only supports dark background color
	theme: "github-dark",
};

export const analyticsConfig = {
	clarity: {
		enable: true,
		projectId: "vm8hp8kdfq",
	},
};

export const gitHubEditConfig = {
	enable: true,
	baseUrl:
		"https://github.com/COLDESTBOW30654/myblog/blob/main/src/content/posts",
};

export const giscusConfig = {
	enable: true,
	dataRepo: "COLDESTBOW30654/myblog",
	dataRepoId: "R_kgDOLd4jdg",
	dataCategory: "Announcements",
	dataCategoryId: "DIC_kwDOLd4jds4Cgkim",
	dataMapping: "url",
	dataStrict: "0",
	dataReactionsEnabled: "1",
	dataEmitMetadata: "0",
	dataInputPosition: "top",
	dataLang: "zh-CN",
	dataLoading: "lazy",
};
