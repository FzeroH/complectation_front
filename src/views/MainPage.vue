<template>
  <RouterView />
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

;(async () => {
  if (userStore.isAdmin) await router.push('/admin')
  if (userStore.isTeacher) await router.push('/teacher')
  if (userStore.isLibrarian) await router.push('/librarian')
})()
</script>
