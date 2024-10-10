<script lang="ts" setup>
import { type HTMLAttributes, computed } from 'vue'
import { CalendarCellTrigger, type CalendarCellTriggerProps, useForwardProps } from 'radix-vue'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const props = defineProps<CalendarCellTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
	const { class: _, ...delegated } = props

	return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
	<CalendarCellTrigger
		:class="
			cn(
				buttonVariants({ variant: 'ghost' }),
				'h-9 w-9 p-0 font-normal',
				'[&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:text-accent-foreground text-selected',
				// Selected
				'data-[selected]:bg-blue-1 data-[selected]:text-primary-foreground data-[selected]:opacity-100 data-[selected]:hover:bg-blue-1 data-[selected]:hover:text-primary-foreground data-[selected]:focus:bg-blue-1 data-[selected]:focus:text-primary-foreground ',
				// Disabled
				'data-[disabled]:text-muted-foreground data-[disabled]:opacity-50',
				// Unavailable
				'data-[unavailable]:text-destructive-foreground data-[unavailable]:line-through',
				// Outside months
				'data-[outside-view]:text-muted-foreground data-[outside-view]:opacity-100 [&[data-outside-view][data-selected]]:bg-accent/50 [&[data-outside-view][data-selected]]:text-muted-foreground [&[data-outside-view][data-selected]]:opacity-30 ',
				props.class
			)
		"
		v-bind="forwardedProps"
	>
		<slot />
	</CalendarCellTrigger>
</template>
