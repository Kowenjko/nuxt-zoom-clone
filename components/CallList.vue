<script lang="ts" setup>
import type { Call, CallRecording } from '@stream-io/video-client'

const { type } = defineProps<{ type: 'ended' | 'upcoming' | 'recordings' }>()

const recordings = ref<CallRecording[]>([])

const store = useStreamStore()
const { publicBaseUrl } = useRuntimeConfig().public

const getCalls = computed(() => {
	switch (type) {
		case 'ended':
			return store.endedCalls
		case 'recordings':
			return recordings.value
		case 'upcoming':
			return store.upcomingCalls
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

const getTitle = (meeting: Call & CallRecording) =>
	meeting.state?.custom?.description || meeting.filename?.substring(0, 20) || 'No Description'

const getDate = (meeting: Call & CallRecording) =>
	meeting.state?.startsAt?.toLocaleString() || meeting.start_time?.toLocaleString()

const getLink = (meeting: Call & CallRecording) =>
	type === 'recordings'
		? (meeting as CallRecording).url
		: `${publicBaseUrl}/meeting/${(meeting as Call).id}`

const handleClick = (meeting: Call & CallRecording) => {
	type === 'recordings'
		? () => navigateTo(`${(meeting as CallRecording).url}`)
		: () => navigateTo(`/meeting/${(meeting as Call).id}`)
}

onMounted(async () => {
	await store.getCalls()

	if (type === 'recordings') await fetchRecordings()
})
</script>
<template>
	<Loader v-if="store.isCallLoading" />
	<div class="grid grid-cols-1 gap-5 xl:grid-cols-2">
		<template v-if="getCalls && getCalls.length > 0">
			<MeetingCard
				v-for="meeting in getCalls"
				:key="meeting.id"
				:icon="getIcon"
				:title="getTitle(meeting)"
				:date="getDate(meeting)"
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
