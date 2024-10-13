<script lang="ts" setup>
defineProps<{ title: string; iconUrl?: string }>()
</script>
<template>
	<section class="flex-center h-screen w-full">
		<Card class="w-full max-w-[520px] border-none bg-dark-1 p-6 py-9 text-white">
			<CardContent>
				<div class="flex flex-col gap-9">
					<div class="flex flex-col gap-3.5">
						<div v-if="iconUrl" class="flex-center">
							<img :src="iconUrl" width="72" height="72" alt="icon" />
						</div>

						<p class="text-center text-xl font-semibold">{{ title }}</p>
					</div>

					<Button asChild class="bg-blue-1">
						<nuxt-link to="/">Back to Home</nuxt-link>
					</Button>
				</div>
			</CardContent>
		</Card>
	</section>
</template>
