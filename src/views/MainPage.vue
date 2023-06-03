<template>
  <RouterView />
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

;(async () => {
	await userStore.authUser();
})()
</script>
