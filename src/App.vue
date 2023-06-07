<template>
  <div v-if="isLoading" class="loader-center">
    <custom-loader />
  </div>
  <div v-else-if="userStore.hasUser" class="container">
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
import CustomLoader from "@/ui/loader/CustomLoader.vue";
import {ref} from "vue";

const userStore = useUserStore();
const isLoading = ref(true);

;(async ()=>{
  await userStore.authUser();
  isLoading.value = false;
})()
</script>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
}
</style>
