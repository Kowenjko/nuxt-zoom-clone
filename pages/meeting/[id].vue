<script lang="ts" setup>
import { useStreamStore } from '@/stores/streamStore'

const isSetupComplete = ref(false)

const { id } = useRoute().params
const store = useStreamStore()

const createMeet = () => {
	if (id) {
		store.createCall(String(id))
	}
}

const endMeet = () => {
	store.endCall()
}

useHead({ title: String(id) ?? 'meat' })

definePageMeta({ layout: 'meat' })
</script>
<template>
	<MeetingSetup :call="store.call" :participant="store.localParticipant" />

	<Button type="button" @click="createMeet">Create Meet</Button>
	<Button type="button" @click="endMeet">End Meet</Button>
	<!-- <div v-else>Meeting Room</div> -->
</template>
