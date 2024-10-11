<script lang="ts" setup>
import { type DateValue } from '@internationalized/date'
import { useToast } from '@/components/ui/toast/use-toast'

const meetingState = ref<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>(
	undefined
)

const callDetail = ref()

interface IFormData {
	dateTime: DateValue | null
	link: string
	description: string
}

const formData = reactive<IFormData>({
	dateTime: null,
	link: '',
	description: '',
})

const { user } = useUser()
const { toast } = useToast()

const client = useStreamVideoClient()

const createMeeting = async () => {
	if (!client || !user.value) return

	try {
		if (!formData.dateTime) {
			toast({ title: 'Please select a date and time' })
			return
		}

		const id = crypto.randomUUID()
		const call = client.call('default', id)

		if (!call) throw new Error('Failed to create meeting')

		const startsAt = formData.dateTime
			? new Date(
					formData.dateTime.year,
					formData.dateTime.month,
					formData.dateTime.day
				).toISOString()
			: new Date(Date.now()).toISOString()

		const description = formData.description || 'Instant Meeting'

		await call.getOrCreate({
			data: {
				starts_at: startsAt,
				custom: {
					description,
				},
			},
		})
		callDetail.value = call
		if (!formData.description) {
			navigateTo(`/meeting/${call.id}`)
		}
		toast({
			title: 'Meeting Created',
		})
	} catch (err) {
		console.error(err)
		toast({ title: 'Failed to create Meeting' })
	}
}

watch(formData, (value) => console.log(value))
</script>
<template>
	<section class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
		<HomeCard
			imgURL="/icons/add-meeting.svg"
			title="New Meeting"
			description="Start an instant meeting"
			@click="meetingState = 'isInstantMeeting'"
		/>
		<HomeCard
			imgURL="/icons/join-meeting.svg"
			title="Join Meeting"
			description="Via invitation link"
			class="!bg-blue-1"
			@click="meetingState = 'isJoiningMeeting'"
		/>
		<HomeCard
			imgURL="/icons/schedule.svg"
			title="Schedule Meeting"
			description="Plan your meeting"
			class="!bg-purple-1"
			@click="meetingState = 'isScheduleMeeting'"
		/>
		<HomeCard
			imgURL="/icons/recordings.svg"
			title="View Recordings"
			description="Meeting Recordings"
			class="!bg-yellow-1"
			@click="navigateTo('/recordings')"
		/>

		<MeetingModal
			v-if="callDetail"
			:isOpen="meetingState === 'isScheduleMeeting'"
			@onClose="meetingState = undefined"
			title="Meeting Created"
			handleClick=""
			image="/icons/checked.svg"
			buttonIcon="/icons/copy.svg"
			className="text-center"
			buttonText="Copy Meeting Link"
		/>

		<MeetingModal
			v-else
			:isOpen="meetingState === 'isScheduleMeeting'"
			@onClose="meetingState = undefined"
			title="Create Meeting"
			@handleClick="createMeeting"
		>
			<div class="flex flex-col gap-2.5">
				<label class="text-base font-normal leading-[22.4px] text-sky-2"> Add a description </label>
				<Textarea
					class="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
					v-model="formData.description"
				/>
			</div>
			<div class="flex w-full flex-col gap-2.5">
				<label class="text-base font-normal leading-[22.4px] text-sky-2">
					Select Date and Time
				</label>
				<DatePicker
					v-model="formData.dateTime as DateValue"
					class="w-full rounded bg-dark-3 p-2 focus:outline-none"
				/>
			</div>
		</MeetingModal>
		<MeetingModal
			:isOpen="meetingState === 'isJoiningMeeting'"
			@onClose="meetingState = undefined"
			title="Type the link here"
			className="text-center"
			buttonText="Join Meeting"
			handleClick=""
		>
			<Input
				placeholder="Meeting link"
				class="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
				v-model="formData.link"
			/>
		</MeetingModal>

		<MeetingModal
			:isOpen="meetingState === 'isInstantMeeting'"
			@onClose="meetingState = undefined"
			title="Start an Instant Meeting"
			className="text-center"
			buttonText="Start Meeting"
			handleClick=""
		/>
	</section>
</template>
