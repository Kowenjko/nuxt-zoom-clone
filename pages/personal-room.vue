<script lang="ts" setup>
import { useToast } from '@/components/ui/toast/use-toast'
import { useClipboard } from '@vueuse/core'

const { user } = useUser()
const { copy } = useClipboard()
const { toast } = useToast()
const { publicBaseUrl } = useRuntimeConfig().public
const store = useStreamStore()

const meetingLink = computed(() => `${publicBaseUrl}/meeting/${user.value?.id}?personal=true`)

const startRoom = async () => await store.startRoom()

const copyLink = () => {
	copy(meetingLink.value)
	toast({ title: 'Link Copied' })
}
</script>
<template>
	<section class="flex size-full flex-col gap-5 text-white">
		<h1 class="text-xl font-bold lg:text-3xl">Personal Meeting Room</h1>
		<div class="flex w-full flex-col gap-8 xl:max-w-[900px]">
			<MeetingTable title="Topic" :description="`${user?.firstName}'s Meeting Room`" />
			<MeetingTable title="Meeting ID" :description="user?.id!" />
			<MeetingTable title="Invite Link" :description="meetingLink" />
		</div>
		<div class="flex gap-5">
			<Button class="bg-blue-1" @click="startRoom"> Start Meeting </Button>
			<Button class="bg-dark-3" @click="copyLink"> Copy Invitation </Button>
		</div>
	</section>
</template>
