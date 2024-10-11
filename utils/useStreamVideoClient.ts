import { StreamVideoClient } from '@stream-io/video-client'

export const useStreamVideoClient = async () => {
	const { streamApiKey } = useRuntimeConfig().public
	const { data } = await useFetch('/api/token')

	if (!data.value?.token || !data.value?.userId) return null

	const client = new StreamVideoClient({
		apiKey: streamApiKey,
		token: data.value.token,
		user: {
			id: data.value.userId,
			name: 'Vasy Kovenko',
			image: 'https://getstream.io/random_svg/?id=Vasya&name=Kovenko',
		},
	})

	return client
}
