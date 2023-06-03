<template>
  <div class="paginator d-flex justify-content-center align-items-center">
    <input
      v-for="item in aroundPages"
      :key="`page_${item}`"
      class="btn btn-primary"
      type="button"
      :value="item"
	  :disabled="props.page === item"
      @click="changePage(item)"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, defineEmits } from 'vue'

const emit = defineEmits<{
  (e: 'change', newPage: number): void
}>()

const props = defineProps<{
  limit: number
  page: number
  total: number
}>()

const lastPage = computed<number>(() => Math.ceil(props.total / props.limit))

function* generatorPages(page: number): Generator<number> {
  const minPage = page - 6 > 0 ? page - 6 : 1
  const maxPage = lastPage.value > page + 6 ? page + 6 : lastPage.value

  if (minPage > 1) yield 1

  for (let iter = minPage; iter <= maxPage; iter++) yield iter

  if (lastPage.value > maxPage) yield lastPage.value
}

const aroundPages = computed<number[]>(() => [...generatorPages(props.page)])

function changePage(newPage: number) {
  if (props.page !== newPage) emit('change', newPage)
}
</script>

<style scoped lang="scss">
.paginator {
  gap: 5px;
}
</style>
