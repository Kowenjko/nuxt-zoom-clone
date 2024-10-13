<script lang="ts" setup>
import type { Call, CallRecording } from '@stream-io/video-client'

const { type } = defineProps<{ type: 'ended' | 'upcoming' | 'recordings' }>()

const recordings = ref<CallRecording[]>([])
const loading = ref(true)

const store = useStreamStore()
const { publicBaseUrl } = useRuntimeConfig().public

const getCalls = computed(() => {
	switch (type) {
		case 'ended':
			return store.endedCalls.map((item) => {
				return { state: item.state, id: item.id }
			})
		case 'recordings':
			return recordings.value
		case 'upcoming':
			return store.upcomingCalls.map((item) => {
				return { state: item.state, id: item.id }
			})
		default:
			return []
	}
})

const getNoCallsMessage = computed(() => {
	switch (type) {
		case 'ended':
			return 'No Previous Calls'
		case 'upcoming':
			return 'No Upcoming Calls'
		case 'recordings':
			return 'No Recordings'
		default:
			return ''
	}
})

const fetchRecordings = async () => {
	const callData = await Promise.all(
		store.callRecordings?.map((meeting) => meeting.queryRecordings()) ?? []
	)

	console.log(callData)

	recordings.value = callData
		.filter((call) => call.recordings.length > 0)
		.flatMap((call) => call.recordings)
}

const getIcon = computed(() =>
	type === 'ended'
		? '/icons/previous.svg'
		: type === 'upcoming'
			? '/icons/upcoming.svg'
			: '/icons/recordings.svg'
)

const getLink = (meeting: any) =>
	type === 'recordings'
		? (meeting as CallRecording).url
		: `${publicBaseUrl}/meeting/${(meeting as Call).id}`

const handleClick = (meeting: any) => {
	type === 'recordings'
		? () => navigateTo(`${(meeting as CallRecording).url}`)
		: () => navigateTo(`/meeting/${(meeting as Call).id}`)
}

onMounted(async () => {
	await store.getCalls()
	if (type === 'recordings') await fetchRecordings()
	loading.value = false
})
</script>
<template>
	<Loader v-if="loading || store.isCallLoading" />
	<div class="grid grid-cols-1 gap-5 xl:grid-cols-2">
		<template v-if="getCalls && getCalls.length > 0">
			<MeetingCard
				v-for="(meeting, index) in getCalls"
				:key="index"
				:icon="getIcon"
				:meeting="meeting"
				date="getDate(meeting)"
				:isPreviousMeeting="type === 'ended'"
				:link="getLink(meeting)"
				:buttonIcon1="type === 'recordings' ? '/icons/play.svg' : undefined"
				:buttonText="type === 'recordings' ? 'Play' : 'Start'"
				@handleClick="handleClick(meeting)"
			/>
		</template>
		<h1 v-else class="text-2xl font-bold text-white">{{ getNoCallsMessage }}</h1>
	</div>
</template>
