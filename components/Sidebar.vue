<script lang="ts" setup>
import { sidebarLinks } from '@/constants'

const route = useRoute()
</script>
<template>
	<section
		class="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]"
	>
		<div class="flex flex-1 flex-col gap-6">
			<MenuNav size-image="24" class-text="text-lg max-lg:hidden" />
		</div>
	</section>
</template>
