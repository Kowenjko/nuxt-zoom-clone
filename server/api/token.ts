import { StreamClient } from '@stream-io/node-sdk'
import { getAuth, clerkClient } from 'vue-clerk/server'

export default defineEventHandler(async (event) => {
	const { userId } = getAuth(event)

	const config = useRuntimeConfig()

	if (!userId) errorHandler(401, 'Unauthorized')

	const streamClient = new StreamClient(config.public.streamApiKey, config.streamSecret)

	const expirationTime = Math.floor(Date.now() / 1000) + 3600
	const issuedAt = Math.floor(Date.now() / 1000) - 60

	const token = streamClient.createToken(userId!, expirationTime, issuedAt)
	const user = await clerkClient(event).users.getUser(userId!)

	return { userId, token, userName: user?.firstName }
})
