import { StreamClient } from '@stream-io/node-sdk'
import { getAuth } from 'vue-clerk/server'

export default defineEventHandler(async (event) => {
	const { userId } = getAuth(event)

	const config = useRuntimeConfig()

	if (!userId) errorHandler(401, 'Unauthorized')

	const streamClient = new StreamClient(config.public.streamApiKey, config.streamSecret)

	const expirationTime = Math.floor(Date.now() / 1000) + 3600
	const issuedAt = Math.floor(Date.now() / 1000) - 60

	const token = streamClient.createToken(userId!, expirationTime, issuedAt)

	return { userId, token }
})
