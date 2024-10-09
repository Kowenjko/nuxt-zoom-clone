<script lang="ts" setup>
import { sidebarLinks } from '@/constants'

const route = useRoute()
</script>
<template>
	<section class="w-full max-w-[264px]">
		<Sheet>
			<SheetTrigger asChild>
				<img
					src="/icons/hamburger.svg"
					width="36"
					height="36"
					alt="hamburger icon"
					class="cursor-pointer sm:hidden"
				/>
			</SheetTrigger>
			<SheetContent side="left" class="border-none bg-dark-1">
				<SheetTitle v-show="false"></SheetTitle>
				<SheetDescription v-show="false"></SheetDescription>
				<nuxt-link to="/" class="flex items-center gap-1">
					<img src="/icons/logo.svg" width="32" height="32" alt="yoom logo" />
					<p class="text-[26px] font-extrabold text-white">VOOM</p>
				</nuxt-link>
				<div class="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
					<SheetClose asChild>
						<section class="flex h-full flex-col gap-6 pt-16 text-white">
							<SheetClose asChild v-for="item in sidebarLinks" :key="item.label">
								<nuxt-link
									:to="item.route"
									class="flex gap-4 items-center p-4 rounded-lg w-full max-w-60"
									:class="{ 'bg-blue-1': route.path === item.route }"
								>
									<img :src="item.imgURL" :alt="item.label" width="20" height="20" />
									<p class="font-semibold">{{ item.label }}</p>
								</nuxt-link>
							</SheetClose>
						</section>
					</SheetClose>
				</div>
			</SheetContent>
		</Sheet>
	</section>
</template>
