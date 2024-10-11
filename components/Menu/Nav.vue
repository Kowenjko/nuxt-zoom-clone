<script lang="ts" setup>
import { sidebarLinks } from '@/constants'

defineProps<{ classText?: string; sizeImage: string }>()

const route = useRoute()
</script>
<template>
	<nuxt-link
		v-for="item in sidebarLinks"
		:key="item.label"
		:to="item.route"
		class="flex gap-4 items-center p-4 rounded-lg w-full max-w-60 hover:bg-blue-1/50 transition-all"
		:class="{ 'bg-blue-1': route.path === item.route }"
	>
		<img :src="item.imgURL" :alt="item.label" :width="sizeImage" :height="sizeImage" />
		<p class="font-semibold" :class="classText">{{ item.label }}</p>
	</nuxt-link>
</template>
