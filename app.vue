<script lang="ts" setup>
useHead({
	titleTemplate: (titleChunk) => {
		return titleChunk ? `My Zoom | ${titleChunk}` : 'My Zoom'
	},
	meta: {
		name: 'description',
		content: 'A workspace for your team, powered by Stream Chat and Clerk.',
	},
	htmlAttrs: { lang: 'en-US' },
	link: [{ rel: 'icon', type: 'image/svg+xml', href: '/icons/logo.svg' }],
})
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
