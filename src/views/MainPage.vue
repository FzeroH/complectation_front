<template>
  <RouterView />
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

;(() => {
  if (router.currentRoute.value.fullPath === '/') {
    if (userStore.isTeacher) router.push('/teacher')
    else if (userStore.isLibrarian) router.push('/librarian')
    else if (userStore.isAdmin) router.push('/admin')
  }
})()
</script>
