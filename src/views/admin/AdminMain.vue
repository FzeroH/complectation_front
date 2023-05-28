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

    <admin-update-modal
      v-if="selectedItem && selectedTable"
      :item-table="selectedTable"
      :is-showing="true"
      :headers="tableHeaders"
      :old-item="selectedItem"
      @update="updateItem"
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
	isLoading.value = true;
    await AdminApi.updateItem(selectedTable.value.value.toString(), item)
	await updateDataTable();
	selectedItem.value = null;
	isLoading.value = false;
  }
}

async function updateDataTable() {
	if (selectedTable.value) {
		const data = await       AdminApi.getTableData({
        tableName: selectedTable.value.value.toString(),
		sorting: sorting.value
      });
	  tableData.value = data;
	}
}

function closeModal() {
  selectedItem.value = null
}

async function sortingChange(item: SortingItem | null) {
	if (sorting.value?.direction !== item?.direction || sorting.value?.field !== item?.field) {
		sorting.value = item;
		isLoading.value = true;
		await updateDataTable();
		isLoading.value = false;
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
</style>
