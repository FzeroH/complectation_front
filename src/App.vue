<template>
  <div v-if="userStore.hasUser" class="container">
    <layout-header />
    <LayoutBody>
      <RouterView />
    </LayoutBody>
  </div>
  <UserLogin v-else />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import LayoutHeader from '@/components/layout/LayoutHeader.vue'
import LayoutBody from '@/components/layout/LayoutBody.vue'
import UserLogin from '@/views/UserLogin.vue'

import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
}
</style>
