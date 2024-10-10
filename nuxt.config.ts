// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },
	modules: [
		'@nuxt/image',
		'@nuxt/fonts',
		'@nuxtjs/tailwindcss',
		'nuxt-typed-router',
		'@nuxtjs/html-validator',
		'@vueuse/nuxt',
		'@pinia/nuxt',
		'shadcn-nuxt',
		'vue-clerk/nuxt',
	],

	fonts: {
		families: [{ name: 'Inter', provider: 'google' }],
	},
	shadcn: {
		prefix: '',
		componentDir: './components/ui',
	},
	clerk: {
		appearance: {
			layout: { logoImageUrl: '/icons/yoom-logo.svg', socialButtonsVariant: 'iconButton' },
			variables: {
				colorText: '#ffffff',
				colorPrimary: '#0E78F9',
				colorBackground: '#1c1f2e',
				colorInputBackground: '#252a41',
				colorInputText: '#ffffff',
			},
		},
	},
	runtimeConfig: {
		public: {
			clerkPublishableKey: process.env.NUXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
			streamApiKey: process.env.NUXT_STREAM_API_KEY,
			publicBaseUrl: process.env.NUXT_PUBLIC_BASE_URL,
		},
		clerkSecretKey: process.env.NUXT_CLERK_SECRET_KEY,
		streamSecret: process.env.NUXT_STREAM_SECRET,
	},
})
