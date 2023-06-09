<template>
  <div v-if="isLoading" class="loader-center">
    <custom-loader />
  </div>
  <section v-else>
    <section v-for="order in orders" :key="order.id" class="text-dark mb-4">
      <article class="libr__article p-1 bg-light">
        <publicate-card :is-large="false" :item="order" />
        <footer class="d-flex justify-content-end">
          <input
            type="button"
            value="Убрать  из заказа"
            class="btn btn-danger"
            @click="updateStatus(order, STATUS_ACCEPTED)"
          />
        </footer>
      </article>
    </section>

    <footer class="libr__footer w-100 d-flex justify-content-between p-3">
      <div class="d-flex">
        <p class="fw-weight-bold">Итоговая цена:</p>
        <span class="ms-2">{{ totalPrice }}</span>
      </div>
      <input type="button" value="Сформировать заказ" class="btn btn-light" @click="apply" />
    </footer>
  </section>
</template>

<script setup lang="ts">
import { LibrarianApi } from '@/api'
import {PublicationFullInfo, PublicationStatus} from '@/types'
import { ref, computed } from 'vue'

import CustomLoader from '@/ui/loader/CustomLoader.vue'
import PublicateCard from '@/components/PublicateCard.vue'
import {STATUS_ACCEPTED, STATUS_ORDER} from "@/const";

const isLoading = ref<boolean>(true)
const orders = ref<PublicationFullInfo[]>([])

const totalPrice = computed<number>(() =>
  orders.value.reduce((total, item) => total + item.publication_cost * item.request_count, 0),
)

async function updateData() {
  orders.value = await LibrarianApi.getOrderList(STATUS_ORDER)
}

async function updateStatus(order: PublicationFullInfo, status: PublicationStatus) {
  isLoading.value = true
  await LibrarianApi.changeStatus(order.id, status)
  await updateData()
  isLoading.value = false
}

async function apply() {
  isLoading.value = true
  const ordersIds = orders.value.map(order => order.id);
  const data = {
    order_ids: ordersIds,
    total_price: totalPrice.value,
  }
  const id = await LibrarianApi.formAnOrder(data);
  await LibrarianApi.downloadOrderDocument(id.finaly_request_id);
  await updateData();
  isLoading.value = false


}

;(async () => {
  await updateData()
  console.log(orders.value)
  isLoading.value = false
})()
</script>

<style scoped lang="scss">
.libr {
  &__article {
    border-radius: 10px;
  }

  &__footer {
    position: sticky;
    bottom: 0;
    background-color: var(--dark-blue);
  }
}
</style>
