<script lang="ts" setup>
import { CallingState } from '@stream-io/video-client'

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right'

const route = useRoute()
const store = useStreamStore()

const layout = ref<CallLayoutType>('speaker-left')
const showParticipants = ref(false)

const isPersonalRoom = computed(() => !!route.query.personal)
const callingState = computed(() => store.call?.state.callingState)
</script>
<template>
	<Loader v-if="callingState !== CallingState.JOINED" />
	<section class="relative h-screen w-full overflow-hidden pt-4 text-white">
		<div class="relative flex size-full items-center justify-center">
			<div class="flex size-full max-w-[1000px] items-center">
				<!-- <CallLayout /> -->
			</div>
			<div class="h-[calc(100vh-86px)] hidden ml-2" :class="{ 'show-block': showParticipants }">
				<!-- <CallParticipantsList /> -->
			</div>
		</div>
		{/* video layout and call controls */}
		<div class="fixed bottom-0 flex w-full items-center justify-center gap-5">
			<!-- <CallControls  /> -->

			<DropdownMenu>
				<div class="flex items-center">
					<DropdownMenuTrigger
						class="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]"
					>
						<IconLayoutList :size="20" class="text-white" />
					</DropdownMenuTrigger>
				</div>
				<DropdownMenuContent class="border-dark-1 bg-dark-1 text-white">
					<div v-for="(item, index) in ['Grid', 'Speaker-Left', 'Speaker-Right']" :key="index">
						<DropdownMenuItem @click="layout = item.toLowerCase() as CallLayoutType">
							{{ item }}
						</DropdownMenuItem>
						<DropdownMenuSeparator class="border-dark-1" />
					</div>
				</DropdownMenuContent>
			</DropdownMenu>
			<CallStatsButton />
			<button @click="showParticipants = !showParticipants">
				<div class="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
					<IconUsers :size="20" class="text-white" />
				</div>
			</button>
			<EndCallButton v-if="isPersonalRoom" />
		</div>
	</section>
</template>
