<script lang="ts" setup>
defineProps<{ imgURL: string; title: string; description: string }>()
</script>
<template>
	<section
		class="bg-orange-1 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer"
	>
		<div class="flex-center glassmorphism size-12 rounded-[10px]">
			<img :src="imgURL" alt="meeting" width="27" height="27" />
		</div>

		<div class="flex flex-col gap-2">
			<h2 class="text-2xl font-bold">{{ title }}</h2>
			<p class="text-lg font-normal">{{ description }}</p>
		</div>
	</section>
</template>
