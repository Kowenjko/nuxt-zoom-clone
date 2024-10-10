<script lang="ts" setup>
interface MeetingModalProps {
	isOpen: boolean
	title: string
	className?: string
	buttonText?: string
	instantMeeting?: boolean
	image?: string
	buttonClass?: string
	buttonIcon?: string
}

defineProps<MeetingModalProps>()

const emit = defineEmits(['onClose', 'handleClick'])

const onClose = () => emit('onClose')
const handleClick = () => emit('handleClick')
</script>
<template>
	<Dialog :open="isOpen" @update:open="onClose">
		<DialogContent
			class="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white"
		>
			<DialogTitle v-show="false"></DialogTitle>
			<DialogDescription v-show="false"> </DialogDescription>
			<div class="flex flex-col gap-6">
				<div v-if="image" class="flex justify-center">
					<img :src="image" alt="checked" width="72" height="72" />
				</div>

				<h1 class="text-3xl font-bold leading-[42px]" :class="className">
					{{ title }}
				</h1>
				<slot />
				<Button
					class="bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0"
					:class="buttonClass"
					@click="handleClick"
				>
					<img v-if="buttonIcon" :src="buttonIcon" alt="button icon" width="13" height="13" />
					<span v-else> &nbsp; {{ buttonText || 'Schedule Meeting' }}</span>
				</Button>
			</div>
		</DialogContent>
	</Dialog>
</template>
