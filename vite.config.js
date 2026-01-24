import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// using vite pwa plugin
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: [
				"favicon.ico",
				"apple-touch-icon.png",
				"maskable_icon.svg",
			],
			devOptions: {
				enabled: true,
				type: "module",
			},
			manifest: {
				name: "Instogram",
				short_name: "Instogram",
				description:
					"It is clone application of Instagram application, not included all features",
				icons: [
					{
						src: "/pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "/pwa-192x192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "/pwa-maskable-192x192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "maskable",
					},
					{
						src: "/pwa-maskable-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable",
					},
				],
				theme_color: "#ffffff",
				background_color: "#ffffff",
				display: "standalone",
				scope: "/",
				start_url: "/",
				orientation: "portrait",
			},
			workbox: {
				// swDest: "dist/sw.js",
				// runtimeCaching: [
				// 	{
				// 		urlPattern: ({ request }) => {
				// 			request.destination === "document";
				// 		},
				// 		handler: "NetworkFirst",
				// 		options: {
				// 			cacheName: "html-cache",
				// 		},
				// 	},
				// 	{
				// 		urlPattern: ({ request }) => {
				// 			request.destination === "script";
				// 		},
				// 		handler: "NetworkFirst",
				// 		options: {
				// 			cacheName: "js-cache",
				// 		},
				// 	},
				// 	{
				// 		urlPattern: ({ request }) => {
				// 			request.destination === "image";
				// 		},
				// 		handler: "CacheFirst",
				// 		options: {
				// 			cacheName: "image-cache",
				// 			expiration: {
				// 				maxEntries: 50,
				// 				maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
				// 			},
				// 		},
				// 	},
				// ],
			},
		}),
	],
	server: {
		port: 5173,
		host: true,
		allowedHosts: ["instogram.dev"],
	},
	build: {
		outDir: "dist",
		sourcemap: true,
		rollupOptions: {
			output: {
				entryFileNames: "assets/[name].[hash].js",
				chunkFileNames: "assets/[name].[hash].js",
				assetFileNames: "assets/[name].[hash].[ext]",
			},
		},
	},
	resolve: {
		alias: {
			public: "/public",
			src: "/src",
			routes: "/src/routes",
			api: "/src/api",
			app: "/src/app",
			assets: "/src/assets",
			components: "/src/components",
			hooks: "/src/hooks",
			themes: "/src/themes",
			utils: "/src/utils",
			views: "/src/views",
			layouts: "/src/layouts",
		},
	},
});
