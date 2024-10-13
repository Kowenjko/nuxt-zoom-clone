<script lang="ts" setup>
const props = defineProps<{ isMeting: boolean }>()

const videoElement = ref<HTMLVideoElement | null>(null)
const audioElement = ref<HTMLAudioElement | null>(null)
const unbindVideoElement = ref<(() => void) | undefined>()
const unbindAudioElement = ref<(() => void) | undefined>()

const store = useStreamStore()

watch(
	[() => store.call, () => props.isMeting],
	() => {
		if (videoElement.value) {
			store.call?.trackElementVisibility(
				videoElement.value,
				store.localParticipant?.sessionId || 'sessionId',
				'videoTrack'
			)
			unbindVideoElement.value = store.call?.bindVideoElement(
				videoElement.value,
				store.localParticipant?.sessionId || 'sessionId',
				'videoTrack'
			)
		}

		if (audioElement.value) {
			unbindAudioElement.value = store.call?.bindAudioElement(
				audioElement.value,
				store.localParticipant?.sessionId || 'sessionId'
			)
		}
	},
	{ deep: true }
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
