<script lang="ts" setup>
import { SignedIn, UserButton } from 'vue-clerk'
</script>
<template>
	<nav class="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
		<nuxt-link to="/" class="flex items-center gap-1">
			<img src="/icons/logo.svg" width="32" height="32" alt="yoom logo" class="max-sm:size-10" />
			<p class="text-[26px] font-extrabold text-white max-sm:hidden">My Zoom</p>
		</nuxt-link>
		<div class="flex-between gap-5">
			<SignedIn>
				<UserButton afterSignOutUrl="/sign-in" />
			</SignedIn>

			<MobileNav />
		</div>
	</nav>
</template>
