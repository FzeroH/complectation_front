<template>
  <div v-if="isLoading" class="loader-center">
    <custom-loader />
  </div>
  <section v-else class="teacher-table">
    <header class="d-flex mb-3">
      <div class="teacher-table__search flex-fill form-floating text-dark">
        <input type="text" class="form-control" id="search" placeholder="search" v-model="search" />
        <label for="search">Поиск</label>
      </div>

      <input type="button" value="Поиск" class="btn btn-light ms-5" @click="searchApply" />
    </header>

    <custom-table
      :headers="tableHeaders"
      :items="tableItems"
      :sorting-item="sortingItem"
      @click-action="clickAction"
      @sorting="changeSorting"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { SortingItem, TableHeader, TableItem } from '@/types/ui'
import { useRouter } from 'vue-router'
import { TeacherApi } from '@/api'
import CustomTable from '@/ui/table/CustomTable.vue'
import CustomLoader from '@/ui/loader/CustomLoader.vue'
const router = useRouter()

const search = ref('')
const isLoading = ref(true)

const tableHeaders = computed<TableHeader[]>(() => [
  {
    title: 'Автор',
    type: 'string',
    name: 'publication_author',
  },
  {
    title: 'Название',
    type: 'string',
    name: 'publication_title',
  },
  {
    title: 'Издательство',
    type: 'string',
    name: 'company_name',
  },
  {
    title: 'Год публикации',
    type: 'number',
    name: 'publication_year',
    isSorting: true,
  },
  {
    title: 'Цена',
    type: 'number',
    name: 'publication_cost',
  },
])

const tableItems = ref<TableItem[]>([])
const sortingItem = ref<SortingItem | null>(null)

async function changeSorting(item: SortingItem | null) {
  isLoading.value = true
  sortingItem.value = item
  await updateData()
  isLoading.value = false
}

async function searchApply() {
  isLoading.value = true
  await updateData()
  isLoading.value = false
}

function clickAction(id: string | number) {
  router.push(`/order/${id}`)
}

async function updateData() {
  tableItems.value = await TeacherApi.getPublications(sortingItem.value, search.value)
}

;(async () => {
  await updateData()
  isLoading.value = false
})()
</script>

<style scoped lang="scss">
.teacher-table {
  &__search {
    min-width: 300px;
  }
}
</style>
