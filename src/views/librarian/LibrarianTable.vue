<template>
  <div v-if="isLoading" class="loader-center">
    <custom-loader />
  </div>
  <main v-else>
    <custom-select
      :items="companyNames"
      :selected="selectedCompany"
      title="Издательство"
      class="mb-3"
      @change="selectCompany"
    />
    <section v-for="order in orders" :key="order.id" class="text-dark mb-4">
      <article class="libr__article p-1 bg-light">
        <publicate-card :is-large="false" :item="order" />
        <footer class="d-flex justify-content-end">
          <template v-if="order.status === statusInProcessing">
            <input type="button" value="Принять" class="btn btn-success" />
            <input type="button" value="Отклонить" class="btn btn-danger ms-2" />
          </template>
          <input
            v-else-if="order.status === statusAccepted"
            type="button"
            value="Добавить в заказ"
            class="btn btn-dark"
            @click="updateStatus(order.id)"
          />
        </footer>
      </article>
    </section>
  </main>
</template>

<script setup lang="ts">
import { LibrarianApi } from '@/api'
import { STATUS_ACCEPTED, STATUS_IN_PROCESSING } from '@/const'
import { PublicationFullInfo, PublicationStatus } from '@/types'
import { ref, computed } from 'vue'
import CustomSelect from '@/ui/select/CustomSelect.vue'
import { ListItem } from '@/types/ui'
import PublicateCard from '@/components/PublicateCard.vue'
import CustomLoader from '@/ui/loader/CustomLoader.vue'

const isLoading = ref<boolean>(true)
const orders = ref<PublicationFullInfo[]>([])
const companyNames = ref<ListItem[]>([])
const selectedCompany = ref<ListItem | null>(null)

const statusInProcessing = computed<string>(() => STATUS_IN_PROCESSING)
const statusAccepted = computed<string>(() => STATUS_ACCEPTED)

async function selectCompany(item: ListItem | null) {
  isLoading.value = true
  selectedCompany.value = item
  await updateData()
  isLoading.value = false
}

async function updateData() {
  orders.value = await LibrarianApi.getRequestList(selectedCompany.value)
}

async function updateStatus({ id, status }: PublicationFullInfo) {
  isLoading.value = true
  await LibrarianApi.changeStatus(id, status)
  await updateData()
  isLoading.value = false
}

;(async () => {
  companyNames.value = await LibrarianApi.getCompanyNames()
  await updateData()
  isLoading.value = false
})()
</script>

<style scoped lang="scss">
.libr {
  &__article {
    border-radius: 10px;
  }
}
</style>
