<script lang="ts" setup>
const store = useStreamStore()

const isMeetingOwner = computed(() => {
	if (store.call) {
		return (
			store.localParticipant &&
			store.call?.state.createdBy &&
			store.localParticipant.userId === store.call.state.createdBy.id
		)
	}
	return null
})

const endCall = async () => {
	await store.endCall()
	navigateTo('/')
}
</script>
<template>
	<Button v-if="isMeetingOwner" type="button" @click="endCall" class="bg-red-500">
		End call for everyone
	</Button>
</template>
