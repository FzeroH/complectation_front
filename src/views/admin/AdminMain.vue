<template>
  <div v-if="isLoading" class="loader-center">
    <custom-loader />
  </div>
  <section v-else>
    <custom-select
      :items="tableList"
      :selected="selectedTable"
      title="Таблицы"
      @change="changeTable"
      class="mb-3"
    />

    <div class="table-wrapper">
      <admin-table
        v-if="tableHeaders.length"
        :headers="tableHeaders"
        :items="tableData"
        :sorting="sorting"
        @click-action="clickItem"
        @sorting="sortingChange"
      />
    </div>

    <button class="btn-add" @click="addItemClick">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-plus add-icon"
        viewBox="0 0 16 16"
      >
        <path
          d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
        />
      </svg>
    </button>

    <admin-update-modal
      v-if="selectedItem && selectedTable"
      :item-table="selectedTable"
      :is-showing="true"
      :headers="tableHeaders"
      :old-item="selectedItem"
      @update="updateItem"
      @create="createTableItem"
      @close="closeModal"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, defineProps, watch } from 'vue'
import { useRouter } from 'vue-router'
import AdminTable from './AdminTable.vue'
import CustomSelect from '@/ui/select/CustomSelect.vue'
import AdminUpdateModal from './AdminUpdateModal.vue'
import { ListItem, TableItem, AdminTableHeader, SortingItem } from '@/types/ui'
import { AdminApi } from '@/api'

const props = defineProps<{ table: string }>()
const router = useRouter()

const isLoading = ref<boolean>(true)
const tableList = ref<ListItem[]>([])
const sorting = ref<SortingItem | null>(null)
const selectedTable = ref<ListItem | null>(null)
const selectedItem = ref<TableItem | null>(null)
const tableHeaders = ref<AdminTableHeader[]>([])
const tableData = ref<TableItem[]>([])

async function changeTable(item: ListItem | null) {
  if (item) {
    const [headers, data] = await Promise.all([
      AdminApi.getTableHeaders(item.value.toString()),
      AdminApi.getTableData({
        tableName: item.value.toString(),
      }),
    ])
    tableHeaders.value = headers
    tableData.value = data
    if (item.value !== props.table) {
      await router.push({ name: 'admin-table', params: { table: item.value } })
    }
  } else {
    tableHeaders.value = []
    tableData.value = []
    if (props.table) {
      await router.push({ name: 'admin-main' })
    }
  }

  selectedTable.value = item
}

function clickItem(item: TableItem | null) {
  if (item) selectedItem.value = item
}

async function updateItem(item: TableItem | null) {
  if (selectedTable.value && item) {
    isLoading.value = true
    await AdminApi.updateItem(selectedTable.value.value.toString(), item)
    await updateDataTable()
    selectedItem.value = null
    isLoading.value = false
  }
}

async function updateDataTable() {
  if (selectedTable.value) {
    const data = await AdminApi.getTableData({
      tableName: selectedTable.value.value.toString(),
      sorting: sorting.value,
    })
    tableData.value = data
  }
}

async function createTableItem(item: TableItem) {
  if (selectedTable.value && item) {
    isLoading.value = true
    await AdminApi.createItem(selectedTable.value.value.toString(), item)
    await updateDataTable()
    selectedItem.value = null
    isLoading.value = false
  }
}

function closeModal() {
  selectedItem.value = null
}

async function sortingChange(item: SortingItem | null) {
  if (sorting.value?.direction !== item?.direction || sorting.value?.field !== item?.field) {
    sorting.value = item
    isLoading.value = true
    await updateDataTable()
    isLoading.value = false
  }
}

function createField(newItem: TableItem, headerItem: AdminTableHeader): TableItem {
  if (headerItem.list) {
    return { ...newItem, [headerItem.name]: null }
  } else if (headerItem.type === 'string') {
    return { ...newItem, [headerItem.name]: '' }
  } else if (headerItem.type === 'number') {
    return { ...newItem, [headerItem.name]: 0 }
  } else {
    return newItem
  }
}

function addItemClick() {
  if (tableHeaders.value.length) {
    selectedItem.value = tableHeaders.value.reduce(
      (newItem, headerItem) => createField(newItem, headerItem),
      { id: 0 } as TableItem,
    ) as TableItem
  }
}

;(async () => {
  tableList.value = await AdminApi.getTableList()
  if (props.table) {
    const foundedItem = tableList.value.find((i) => i.value === props.table) ?? null
    changeTable(foundedItem)
  }
  isLoading.value = false
})()
</script>

<style lang="scss" scoped>
.table-wrapper {
  max-width: 100%;
  overflow-x: auto;
}

.btn-add {
  position: fixed;
  right: 50px;
  bottom: 50px;
  font-size: 12px;
  width: 6em;
  height: 6em;
  border-radius: 50%;

  & > .add-icon {
    width: 5em;
    height: 5em;
  }
}
</style>
