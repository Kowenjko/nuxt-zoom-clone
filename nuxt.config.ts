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
	],

	fonts: {
		families: [{ name: 'Inter', provider: 'google' }],
	},
	shadcn: {
		prefix: '',
		componentDir: './components/ui',
	},
})
