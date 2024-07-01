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
			manifest: {
				name: "Instagram_Lite",
				short_name: "Instagram_Lite",
				description:
					"It is clone application of Instagram application, not included all features",
				icons: [
					{
						src: "/pwa-192x192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "/pwa-512x512.png",
						sizes: "512x512",
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
				theme_color: "#171717",
				background_color: "#f0e7db",
				display: "standalone",
				scope: "/",
				start_url: "/",
				orientation: "portrait",
			},
		}),
	],
	server: {
		port: 5173,
		host: true,
	},
	build: {
		outDir: "dist",
		sourcemap: true,
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
