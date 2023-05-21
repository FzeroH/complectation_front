<template>
  <div v-if="isLoading" class="loader-center">
    <custom-loader />
  </div>
  <section v-else v-for="order in orders" :key="order.id" class="text-dark mb-4">
    <article class="profile__article p-1 bg-light">
      <publicate-card :is-large="false" :item="order" />
    </article>
  </section>
</template>

<script setup lang="ts">
import { TeacherApi } from '@/api'
import { PublicationFullInfo } from '@/types'
import { computed, ref } from 'vue'

import PublicateCard from '@/components/PublicateCard.vue'
import CustomLoader from '@/ui/loader/CustomLoader.vue'

const isLoading = ref<boolean>(true)
const orders = ref<PublicationFullInfo[]>([])

;(async () => {
  const resOrders = await TeacherApi.getAllOrders()
  if (resOrders) orders.value = resOrders

  isLoading.value = false
})()
</script>

<style scoped lang="scss">
.profile {
  &__article {
    border-radius: 10px;
  }
}
</style>
