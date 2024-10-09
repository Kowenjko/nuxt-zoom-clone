<script lang="ts" setup>
const now = new Date()

const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(now)
</script>
<template>
	<section class="flex size-full flex-col gap-5 text-white">
		<div class="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
			<div class="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
				<p class="glassmorphism max-w-[273px] rounded py-2 text-center text-base font-normal">
					Upcoming Meeting at: 12:30 PM
				</p>
				<div class="flex flex-col gap-2">
					<h1 class="text-4xl font-extrabold lg:text-7xl">{{ time }}</h1>
					<p class="text-lg font-medium text-sky-1 lg:text-2xl">{{ date }}</p>
				</div>
			</div>
		</div>

		<!-- <MeetingTypeList /> -->
	</section>
</template>
