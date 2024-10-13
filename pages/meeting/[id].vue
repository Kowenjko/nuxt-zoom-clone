<script lang="ts" setup>
import { useStreamStore } from '@/stores/streamStore'

const isSetupComplete = ref(false)
const isMeting = ref(false)

const { id } = useRoute().params
const store = useStreamStore()
const { isLoaded, user } = useUser()

const createMeet = () => {
	if (id) {
		store.createCall(String(id))
	}
}

// get more info about custom call type:  https://getstream.io/video/docs/react/guides/configuring-call-types/
const notAllowed = computed(
	() =>
		store.call?.type === 'invited' &&
		(!user || !store.call.state.members.find((m) => m.user.id === user.value?.id))
)

const endMeet = () => {
	store.endCall()
}

const joinMeeting = () => {
	store.call?.join()
	isMeting.value = true
	isSetupComplete.value = true
}

onMounted(async () => await store.loadCall(String(id)))

useHead({ title: String(id) ?? 'meat' })

definePageMeta({ layout: 'meat' })
</script>
<template>
	<Loader v-if="!isLoaded || store.isCallLoading" />

	<Alert v-if="notAllowed" title="You are not allowed to join this meeting" />
	<p v-if="!store.call" class="text-center text-3xl font-bold text-white flex-center h-screen">
		Call Not Found
	</p>
	<ClientOnly>
		<MeetingRoom v-if="isSetupComplete" />
		<MeetingSetup v-else @goToRoom="joinMeeting" :isMeting="isMeting" />
	</ClientOnly>

	<Button type="button" @click="createMeet">Create Meet</Button>
	<Button type="button" @click="endMeet">End Meet</Button>
</template>
