import { ref } from 'vue'
import { defineStore } from 'pinia'
import { StreamVideoClient } from '@stream-io/video-client'
import type { Call, StreamVideoParticipant } from '@stream-io/video-client'
import type { Subscription } from 'rxjs'

export const useStreamStore = defineStore('stream', () => {
	const call = ref<Call | undefined>()
	const isBackstage = ref<boolean>(false)
	const isBackstageSub = ref<Subscription | undefined>()
	const localParticipant = ref<StreamVideoParticipant | undefined>()
	const localParticipantSub = ref<Subscription | undefined>()
	const remoteParticipant = ref<StreamVideoParticipant | undefined>()
	const remoteParticipantSub = ref<Subscription | undefined>()

	const streamVideoClient = useStreamVideoClient()

	const createCall = async (id: string) => {
		// @ts-ignore
		const newCall = streamVideoClient.call('default', id)
		await newCall.camera.enable()
		await newCall.microphone.enable()
		await newCall.join({ create: true })

		// Subscribe to the local participant
		// TODO: unsubscribe
		localParticipantSub.value = newCall.state.localParticipant$.subscribe(
			(updatedLocalParticipant) => {
				localParticipant.value = updatedLocalParticipant
			}
		)

		isBackstageSub.value = newCall.state.backstage$.subscribe((backstage) => {
			isBackstage.value = backstage
		})

		// Update the local call value
		call.value = newCall
	}

	const endCall = async () => {
		await call.value?.endCall()
		localParticipantSub.value?.unsubscribe()
		isBackstageSub.value?.unsubscribe()

		call.value = undefined
	}

	const watchStream = async (id: string) => {
		// @ts-ignore
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

	const leaveStream = async () => {
		await call.value?.leave()
		remoteParticipantSub.value?.unsubscribe()

		call.value = undefined
	}

	return {
		call,
		isBackstage,
		localParticipant,
		remoteParticipant,
		streamVideoClient,
		createCall,
		endCall,
		watchStream,
		leaveStream,
	}
})
