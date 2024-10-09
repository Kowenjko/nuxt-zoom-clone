<script lang="ts" setup>
useHead({
	title: 'VOOM',
	meta: {
		name: 'description',
		content: 'A workspace for your team, powered by Stream Chat and Clerk.',
	},
})
</script>
<template>
	<main class="relative">
		<Navbar />

		<div class="flex">
			<Sidebar />

			<section class="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
				<div class="w-full"><slot /></div>
			</section>
		</div>
	</main>
</template>
