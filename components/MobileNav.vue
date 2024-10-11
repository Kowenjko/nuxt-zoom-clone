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
					<p class="text-[26px] font-extrabold text-white">My Zoom</p>
				</nuxt-link>
				<div class="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
					<SheetClose asChild>
						<section>
							<SheetClose class="flex h-full flex-col gap-6 pt-16 text-white">
								<MenuNav size-image="20" />
							</SheetClose>
						</section>
					</SheetClose>
				</div>
			</SheetContent>
		</Sheet>
	</section>
</template>
