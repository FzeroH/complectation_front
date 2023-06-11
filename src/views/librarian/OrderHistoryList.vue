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
    <custom-select
        :items="ordersDateItems"
        :selected="selectedOrdersDate"
        title="Номер/Дата заявки"
        class="mb-3"
        @change="selectOrdersDate"
    />
      <section >
        <section v-for="order in orders" :key="order.id" class="text-dark mb-4">
          <article class="libr__article p-1 bg-light">
            <order-history-card :is-large="false" :item="order" />
            <footer class="d-flex justify-content-end">
              <input
                  type="button"
                  value="Подтвердить получение"
                  class="btn btn-success"
                  @click="updateStatus(order, STATUS_DONE)"
                  v-if="order.status !== STATUS_DONE"
              />
            </footer>
          </article>
        </section>
        <footer class="d-flex justify-content-end">
          <input
              type="button"
              value="Выгрузить заявку"
              class="btn btn-secondary"
              @click="apply"
              v-if="selectedOrdersDate && orders.length"
          />
        </footer>
      </section>
  </main>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
  import CustomLoader from "@/ui/loader/CustomLoader.vue";
  import { STATUS_DONE } from "@/const";
  import OrderHistoryCard from "@/components/OrderHistoryCard.vue";
  import { LibrarianApi } from "@/api";
  import {OrdersFullInfo, PublicationFullInfo, PublicationStatus} from "@/types";
  import CustomSelect from "@/ui/select/CustomSelect.vue";
  import {ListItem} from "@/types/ui";

  const isLoading = ref<boolean>(true)
  const orders = ref<OrdersFullInfo[]>([])
  const companyNames = ref<ListItem[]>([])
  const ordersDate = ref<ListItem[]>([])
  const selectedCompany = ref<ListItem | null>(null)
  const selectedOrdersDate = ref<ListItem | null>(null)

  const ordersDateItems = computed<ListItem[]>(()=> ordersDate.value.map(ordersDateItem => ({
    title: `${ordersDateItem.value}. ${new Date(ordersDateItem.title).toLocaleDateString()}`,
    value: ordersDateItem.value
  })))

  async function selectCompany(item: ListItem | null) {
    isLoading.value = true
    selectedCompany.value = item
    await updateData()
    isLoading.value = false
  }

  async function selectOrdersDate(item: ListItem | null) {
    isLoading.value = true
    selectedOrdersDate.value = item
    await updateData()
    isLoading.value = false
  }

  async function updateData() {
    orders.value = await LibrarianApi.getOrderHistoryList(selectedCompany.value, selectedOrdersDate.value)
  }

  async function updateStatus(order: OrderHistoryCard, status: PublicationStatus) {
    isLoading.value = true
    await LibrarianApi.changeStatus(order.id, status)
    await updateData()
    isLoading.value = false
  }

  async function apply() {
    isLoading.value = true
    await LibrarianApi.downloadOrderDocument(orders.value[0].finaly_request_id);
    await updateData();
    isLoading.value = false


  }

  ;(async () => {
    companyNames.value = await LibrarianApi.getCompanyNames()
    ordersDate.value = await LibrarianApi.getOrdersDate()
    await updateData()
    isLoading.value = false
  })()

</script>

<style scoped lang="scss">

</style>