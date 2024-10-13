<script lang="ts" setup>
defineProps<{ title: string; description?: string }>()
</script>
<template>
	<div class="flex flex-col items-start gap-2 xl:flex-row">
		<h1 class="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32">{{ title }}:</h1>
		<h1 class="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">
			{{ description }}
		</h1>
	</div>
</template>
