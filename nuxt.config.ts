// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxt/fonts', '@nuxt/icon'],

	runtimeConfig: {
		public: {
			twitterApiKey: process.env.TWITTER_API_KEY,
			twitterApiSecret: process.env.TWITTER_API_SECRET,
			callbackUrl: process.env.TWITTER_CALLBACK_URL,
		},
	},

	css: ['~/assets/css/main.css'],
	compatibilityDate: '2025-01-12',
});
