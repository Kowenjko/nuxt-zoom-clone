export const useGetCallById = async (id: string) => {
	const call = ref()
	const isCallLoading = ref(true)

	const client = await useStreamVideoClient()

	const loadCall = async () => {
		if (!client) return
		try {
			// https://getstream.io/video/docs/react/guides/querying-calls/#filters
			const { calls } = await client.queryCalls({ filter_conditions: { id } })

			if (calls.length > 0) call.value = calls[0]

			console.log(call.value)
		} catch (error) {
			console.error(error)
		} finally {
			isCallLoading.value = false
		}
	}

	await loadCall()

	return { call, isCallLoading }
}
