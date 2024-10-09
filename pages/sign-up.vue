<script lang="ts" setup>
import { SignUp } from 'vue-clerk'

useHead({ title: 'Sign Up' })

definePageMeta({ layout: 'auth' })
</script>
<template>
	<SignUp />
</template>
