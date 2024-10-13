import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from '@/components/ui/toast/use-toast'

import type { Call, StreamVideoParticipant } from '@stream-io/video-client'
import type { Subscription } from 'rxjs'

export const useStreamStore = defineStore('stream', () => {
	const call = ref<Call | undefined>()

	const isCallLoading = ref(false)
	const isBackstage = ref<boolean>(false)
	const isBackstageSub = ref<Subscription | undefined>()
	const localParticipant = ref<StreamVideoParticipant | undefined>()
	const localParticipantSub = ref<Subscription | undefined>()
	const remoteParticipant = ref<StreamVideoParticipant | undefined>()
	const remoteParticipantSub = ref<Subscription | undefined>()

	const callRecordings = ref<Call[]>([])
	const endedCalls = ref<Call[]>([])
	const upcomingCalls = ref<Call[]>([])

	const { user } = useUser()
	const { toast } = useToast()
	/**
	 * createMeeting
	 * @param data
	 * @returns
	 */
	const createMeeting = async (data: any) => {
		const streamVideoClient = await useStreamVideoClient()
		if (!streamVideoClient || !user.value) return toast({ title: 'Not client or user' })

		try {
			if (!data.dateTime) {
				toast({ title: 'Please select a date and time' })
				return
			}
			const id = crypto.randomUUID()
			const newCall = streamVideoClient?.call('default', id)

			if (!newCall) throw new Error('Failed to create meeting')

			const startsAt = data.dateTime
				? new Date(data.dateTime.year, data.dateTime.month, data.dateTime.day).toISOString()
				: new Date(Date.now()).toISOString()

			const description = data.description || 'Instant Meeting'

			await newCall.getOrCreate({
				data: {
					starts_at: startsAt,
					custom: {
						description,
					},
				},
			})

			call.value = newCall
			if (!data.description) {
				navigateTo(`/meeting/${newCall.id}`)
			}
			toast({
				title: 'Meeting Created',
			})
		} catch (err) {
			console.error(err)
			toast({ title: 'Failed to create Meeting' })
		}
	}
	/**
	 * loadCall
	 * @param id
	 * @returns
	 */
	const loadCall = async (id: string) => {
		const streamVideoClient = await useStreamVideoClient()

		if (!streamVideoClient) return
		isCallLoading.value = true
		try {
			// https://getstream.io/video/docs/react/guides/querying-calls/#filters
			const { calls } = await streamVideoClient.queryCalls({ filter_conditions: { id } })

			if (calls.length > 0) {
				call.value = calls[0]

				localParticipantSub.value = call.value.state.localParticipant$.subscribe(
					(updatedLocalParticipant: any) => {
						localParticipant.value = updatedLocalParticipant
					}
				)
			}

			isBackstageSub.value = call.value?.state.backstage$.subscribe((backstage: any) => {
				isBackstage.value = backstage
			})
		} catch (error) {
			console.error(error)
		} finally {
			isCallLoading.value = false
		}
	}
	/**
	 * createCall
	 * @param id
	 */
	const createCall = async (id: string) => {
		isCallLoading.value = true
		// @ts-ignore
		const newCall = streamVideoClient.call('default', id)
		await newCall.camera.enable()
		await newCall.microphone.enable()
		await newCall.join({ create: true })

		// Subscribe to the local participant
		// TODO: unsubscribe
		localParticipantSub.value = newCall.state.localParticipant$.subscribe(
			(updatedLocalParticipant: any) => {
				localParticipant.value = updatedLocalParticipant
			}
		)

		isBackstageSub.value = newCall.state.backstage$.subscribe((backstage: any) => {
			isBackstage.value = backstage
		})

		// Update the local call value
		call.value = newCall
		isCallLoading.value = false
	}
	/**
	 * endCall
	 */
	const endCall = async () => {
		await call.value?.endCall()
		localParticipantSub.value?.unsubscribe()
		isBackstageSub.value?.unsubscribe()

		call.value = undefined
	}

	/**
	 * watchStream
	 * @param id
	 * @returns
	 */

	const watchStream = async (id: string) => {
		const streamVideoClient = await useStreamVideoClient()

		if (!streamVideoClient) return

		const newCall = streamVideoClient.call('default', id)
		await newCall.camera.disable()
		await newCall.microphone.disable()
		await newCall.join()

		remoteParticipantSub.value = newCall.state.remoteParticipants$.subscribe(
			(newRemoteParticipants) => {
				if (newRemoteParticipants && newRemoteParticipants.length > 0) {
					remoteParticipant.value = newRemoteParticipants[0]
				} else {
					remoteParticipant.value = undefined
				}
			}
		)

		call.value = newCall
	}

	/**
	 * leaveStream
	 */

	const leaveStream = async () => {
		await call.value?.leave()
		remoteParticipantSub.value?.unsubscribe()

		call.value = undefined
	}

	/**
	 * getCalls
	 * @returns
	 */
	const getCalls = async () => {
		const streamVideoClient = await useStreamVideoClient()

		if (!streamVideoClient || !user.value) return toast({ title: 'Not client or user' })

		try {
			const { calls } = await streamVideoClient.queryCalls({
				sort: [{ field: 'starts_at', direction: -1 }],
				filter_conditions: {
					starts_at: { $exists: true },
					$or: [{ created_by_user_id: user.value.id }, { members: { $in: [user.value.id] } }],
				},
			})

			if (calls) {
				callRecordings.value = calls
				const now = new Date()

				endedCalls.value = calls?.filter(({ state: { startsAt, endedAt } }: Call) => {
					return (startsAt && new Date(startsAt) < now) || !!endedAt
				})

				upcomingCalls.value = calls?.filter(({ state: { startsAt } }: Call) => {
					return startsAt && new Date(startsAt) > now
				})
			}
		} catch (err) {
			console.error(err)
		} finally {
			isCallLoading.value = false
		}
	}
	/**
	 * startRoom
	 * @returns
	 */
	const startRoom = async () => {
		const streamVideoClient = await useStreamVideoClient()
		if (!streamVideoClient || !user.value) return toast({ title: 'Not client or user' })

		const newCall = streamVideoClient?.call('default', user.value.id)

		if (!newCall) throw new Error('Failed to create meeting')

		if (!call.value) {
			await newCall.getOrCreate({
				data: {
					starts_at: new Date().toISOString(),
				},
			})
		}

		navigateTo(`/meeting/${user.value.id}?personal=true`)
	}

	return {
		call,
		isBackstage,
		localParticipant,
		remoteParticipant,
		createCall,
		endCall,
		watchStream,
		leaveStream,
		isCallLoading,
		loadCall,
		createMeeting,
		getCalls,
		callRecordings,
		endedCalls,
		upcomingCalls,
		startRoom,
	}
})
