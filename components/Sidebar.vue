<script lang="ts" setup>
import { sidebarLinks } from '@/constants'

const route = useRoute()

console.log(route.path)
</script>
<template>
	<section
		class="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]"
	>
		<div class="flex flex-1 flex-col gap-6">
			<NuxtLink
				v-for="item in sidebarLinks"
				:key="item.label"
				:to="item.route"
				class="flex gap-4 items-center p-4 rounded-lg justify-start"
				:class="{ 'bg-blue-1': route.path === item.route }"
			>
				<img v-if="item.imgURL" :src="item.imgURL" :alt="item.label" width="24" height="24" />
				<p class="text-lg font-semibold max-lg:hidden">{{ item.label }}</p>
			</NuxtLink>
		</div>
	</section>
</template>
