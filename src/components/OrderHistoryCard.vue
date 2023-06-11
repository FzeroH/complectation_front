<template>
  <header class="d-flex justify-content-between">
    <h2>{{ publicateItem.publication_title }}</h2>
    <div class="m-3">
      <span class="ms-2">{{ date }}</span>
    </div>
  </header>
  <span :class="statusClass" class="fw-weight-bold ms-3 fs-5">{{ publicateItem.status }}</span>
  <div class="container">
    <div :class="props.isLarge ? '' : 'row'">
      <div class="col d-flex">
        <p class="fw-weight-bold">Кафедра:</p>
        <p class="ms-2">{{ publicateItem.cafedra_name }}</p>
      </div>
      <div class="col d-flex">
        <p class="fw-weight-bold">Издательство:</p>
        <p class="ms-2">{{ publicateItem.company_name }}</p>
      </div>
      <div class="col d-flex">
        <p class="fw-weight-bold">Год издания:</p>
        <p class="ms-2">{{ publicateItem.publication_year }}</p>
      </div>
    </div>

    <div :class="props.isLarge ? '' : 'row'">
      <div class="col d-flex">
        <p class="fw-weight-bold">Автор:</p>
        <p class="ms-2">{{ publicateItem.publication_author }}</p>
      </div>
      <div class="col d-flex">
        <p class="fw-weight-bold">Количество:</p>
        <p class="ms-2">{{ publicateItem.request_count }}</p>
      </div>
      <div class="col d-flex">
        <p class="fw-weight-bold">Стоимость заявки:</p>
        <span class="ms-2">{{ publicateItem.total_cost }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>

import {computed, defineProps} from 'vue';
import {PublicationFullInfo} from '@/types';
import {
  STATUS_DONE,
  STATUS_PUBLISHING,
} from '@/const';

const props = defineProps<{
  isLarge: boolean
  item: PublicationFullInfo
}>()

const publicateItem = computed<PublicationFullInfo>(() => props.item)
const date = computed<string>(() => new Date(publicateItem.value.date).toLocaleDateString())

const statusClass = computed<unknown>(()=>({
  ...publicateItem.value.status === STATUS_DONE && { 'status-done': true },
  ...publicateItem.value.status === STATUS_PUBLISHING && { 'status-publishing': true },
}))
</script>

<style scoped lang="scss">
.status-done {
  color: #9E9E9E;
}
.status-publishing {
  color: #2196F3;
}
</style>