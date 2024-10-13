<script lang="ts" setup>
import { avatarImages } from '@/constants'
import { useClipboard } from '@vueuse/core'
import { useToast } from '@/components/ui/toast/use-toast'

const { link } = defineProps<{
	title: string
	date: string
	icon: string
	isPreviousMeeting?: boolean
	buttonIcon1?: string
	buttonText?: string
	link: string
}>()

const emit = defineEmits<{ handleClick: [] }>()

const { copy } = useClipboard()
const { toast } = useToast()

const copyLink = () => {
	copy(link)
	toast({ title: 'Link Copied' })
}
</script>
<template>
	<section
		class="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-[568px]"
	>
		<article class="flex flex-col gap-5">
			<img :src="icon" alt="upcoming" width="28" height="28" />
			<div class="flex justify-between">
				<div class="flex flex-col gap-2">
					<h1 class="text-2xl font-bold">{{ title }}</h1>
					<p class="text-base font-normal">{{ date }}</p>
				</div>
			</div>
		</article>
		<article class="flex justify-center relative">
			<div class="relative flex w-full max-sm:hidden">
				<img
					v-for="(img, index) in avatarImages"
					:key="index"
					:src="img"
					alt="attendees"
					width="40"
					height="40"
					class="rounded-full"
					:class="{ absolute: index > 0 }"
					:style="{ top: 0, left: index * 28 + 'px' }"
				/>

				<div
					class="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-dark-3 bg-dark-4"
				>
					+5
				</div>
			</div>

			<div v-if="isPreviousMeeting" class="flex gap-2">
				<Button @click="emit('handleClick')" class="rounded bg-blue-1 px-6">
					<Image v-if="buttonIcon1" :src="buttonIcon1" alt="feature" width="20" height="20" />
					&nbsp; {{ buttonText }}
				</Button>
				<Button @click="copyLink" class="bg-dark-4 px-6">
					<img src="/icons/copy.svg" alt="feature" width="20" height="20" />
					&nbsp; Copy Link
				</Button>
			</div>
		</article>
	</section>
</template>
