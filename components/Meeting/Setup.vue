<script lang="ts" setup>
const props = defineProps<{ isMeting: boolean }>()

const emit = defineEmits(['goToRoom'])

const isMicCamToggled = ref(false)
const store = useStreamStore()

// console.log(store.call?.state.startsAt)
// console.log(store.call?.state.endedAt)

const toggleMicCam = () => {
	if (isMicCamToggled.value && store.call) {
		store.call?.camera.disable()
		store.call?.microphone.disable()
	} else {
		store.call?.camera.enable()
		store.call?.microphone.enable()
	}
}

const goToRoom = () => emit('goToRoom')

watch(isMicCamToggled, toggleMicCam)
watch(() => store.call, toggleMicCam)
</script>

<template>
	<section class="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
		<h1 class="text-center text-2xl font-bold">Setup</h1>
		<VideoPreview :isMeting="isMeting" />
		<div class="flex h-16 items-center justify-center gap-3">
			<label class="flex items-center justify-center gap-2 font-medium">
				<input type="checkbox" v-model="isMicCamToggled" /> Join with mic and camera off
			</label>
			<!-- <DeviceSettings /> -->
		</div>
		<Button type="button" class="rounded-md bg-green-500 px-4 py-2.5" @click="goToRoom">
			Join meeting
		</Button>
	</section>
</template>
