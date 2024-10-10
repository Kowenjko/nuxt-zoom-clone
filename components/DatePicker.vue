<script setup lang="ts">
import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date'
import { Calendar as CalendarIcon } from 'lucide-vue-next'

const df = new DateFormatter('en-US', { dateStyle: 'long' })

const value = defineModel<DateValue>()
</script>

<template>
	<Popover>
		<PopoverTrigger as-child>
			<Button
				class="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
				:class="{ 'text-muted-foreground': !value }"
			>
				<CalendarIcon class="mr-2 h-4 w-4" />
				{{ value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date' }}
			</Button>
		</PopoverTrigger>
		<PopoverContent class="w-auto p-0 border-none rounded-lg bg-dark-3">
			<Calendar v-model="value" initial-focus class="bg-dark-3 rounded-lg" />
		</PopoverContent>
	</Popover>
</template>
