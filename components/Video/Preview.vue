<script lang="ts" setup>
import type { Call, StreamVideoParticipant } from '@stream-io/video-client'
const props = defineProps<{
	call: Call | undefined
	participant?: StreamVideoParticipant | undefined
}>()

const videoElement = ref<HTMLVideoElement | null>(null)
const audioElement = ref<HTMLAudioElement | null>(null)
const unbindVideoElement = ref<(() => void) | undefined>()
const unbindAudioElement = ref<(() => void) | undefined>()

watch(
	() => props.call,
	() => {
		console.log(videoElement.value)
		if (videoElement.value) {
			unbindVideoElement.value = props.call?.bindVideoElement(
				videoElement.value,
				props.participant?.sessionId || 'sessionId',
				'videoTrack'
			)
		}
		console.log(unbindVideoElement.value)
		if (audioElement.value) {
			unbindAudioElement.value = props.call?.bindAudioElement(
				audioElement.value,
				props.participant?.sessionId || 'sessionId'
			)
		}
	}
)

onUnmounted(() => {
	unbindVideoElement.value?.()
	unbindAudioElement.value?.()
})
</script>
<template>
	<video ref="videoElement" width="400" height="300" style="object-fit: contain" />
	<audio ref="audioElement" />
</template>
