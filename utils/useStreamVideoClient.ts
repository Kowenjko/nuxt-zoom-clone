import { StreamVideoClient } from '@stream-io/video-client'

export const useStreamVideoClient = async () => {
	const { streamApiKey } = useRuntimeConfig().public
	const data = await $fetch('/api/token')

	if (!data?.token || !data?.userId) return null

	const client: StreamVideoClient = new StreamVideoClient({
		apiKey: streamApiKey,
		token: data.token,
		user: {
			id: data.userId,
			name: data.userName || 'My Zoom',
			image: `https://getstream.io/random_svg/?id=${data.userId}a&name=${data.userName}`,
		},
	})

	return client
}
