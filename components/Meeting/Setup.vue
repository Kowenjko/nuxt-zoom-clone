<script lang="ts" setup>
import type { Call, StreamVideoParticipant } from '@stream-io/video-client'
const props = defineProps<{
	call: any
	participant?: StreamVideoParticipant | undefined
}>()

const isMicCamToggled = ref(false)

const toggleMicCam = () => {
	if (isMicCamToggled.value && props.call) {
		props.call?.camera.disable()
		props.call?.microphone.disable()
	} else {
		props.call?.camera.enable()
		props.call?.microphone.enable()
	}
}

watch(isMicCamToggled, toggleMicCam)
watch(() => props.call, toggleMicCam)
</script>

<template>
	<section class="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
		<h1 class="text-center text-2xl font-bold">Setup</h1>
		<VideoPreview :call="call" :participant="participant" />
		<div class="flex h-16 items-center justify-center gap-3">
			<label class="flex items-center justify-center gap-2 font-medium">
				<input type="checkbox" v-model="isMicCamToggled" /> Join with mic and camera off
			</label>
			<!-- <DeviceSettings /> -->
		</div>
		<Button type="button" class="rounded-md bg-green-500 px-4 py-2.5"> Join meeting </Button>
	</section>
</template>
