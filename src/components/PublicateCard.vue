<template>
  <h2>{{ publicateItem.publication_title }}</h2>

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
        <p class="fw-weight-bold">Стоимость:</p>
        <p class="ms-2">{{ publicateItem.publication_cost }}</p>
      </div>
    </div>
  </div>

  <p class="fw-weight-bold">Книга будет рекомендована студентам:</p>
  <custom-table :headers="headers" :items="tableItems" />
</template>

<script setup lang="ts">
import CustomTable from '@/ui/table/CustomTable.vue'
import { PublicationFullInfo } from '@/types'
import { defineProps, computed } from 'vue'
import { TableHeader, TableItem } from '@/types/ui'

const props = defineProps<{
  isLarge: boolean
  item: PublicationFullInfo
}>()

const publicateItem = computed<PublicationFullInfo>(() => props.item)

const headers = computed<TableHeader[]>(() => [
  {
    title: 'Дисциплина',
    type: 'string',
    name: 'discipline_name',
  },
  {
    title: 'Группа',
    type: 'string',
    name: 'students_group_name',
  },
  {
    title: 'Тип группы',
    type: 'string',
    name: 'students_group_type_name',
  },
  {
    title: 'Семестр',
    type: 'number',
    name: 'students_discipline_semester',
  },
])

const tableItems = computed<TableItem[]>(() =>
  publicateItem.value.recommend_list.map((item, index) => ({ ...item, id: index })),
)
</script>
