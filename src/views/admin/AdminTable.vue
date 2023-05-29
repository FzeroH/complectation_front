<template>
  <table class="table table-light table-hover table-pointer w-100 table-">
    <thead>
      <tr>
        <th
          v-for="header in props.headers"
          scope="col"
          :key="header.name"
          :title="header.title"
          class="table__th"
        >
          <div class="d-flex table__cell justify-content-between align-items-center">
            <p class="m-0 table__header-title">{{ header.title }}</p>
            <div class="d-flex flex-column align-items-center">
              <svg
                v-if="header.name === sorting?.field && sorting.direction === 'asc'"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="currentColor"
                class="svg-tri bi bi-triangle-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="currentColor"
                class="svg-tri bi bi-triangle pointer"
                viewBox="0 0 16 16"
				@click="changeSorting(header.name, 'asc')"
              >
                <path
                  d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"
                />
              </svg>

              <svg
                v-if="header.name === sorting?.field && sorting.direction === 'desc'"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="currentColor"
                class="svg-tri bi bi-triangle-fill rotate-180"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="currentColor"
                class="svg-tri bi bi-triangle rotate-180 pointer"
                viewBox="0 0 16 16"
				@click="changeSorting(header.name, 'desc')"
              >
                <path
                  d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"
                />
              </svg>
            </div>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, indexRow) in processedItems"
        :key="indexRow"
        @click="clickAction(filteredItems[indexRow])"
        class="pointer"
      >
        <td v-for="(header, indexCol) in props.headers" :title="item[indexCol]" :key="header.name">
          {{
            header.list?.find((headerListItem) => headerListItem.value == item[indexCol])?.title ??
            item[indexCol]
          }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue'
import { AdminTableHeader, DirectionSorting, SortingItem, TableItem } from '@/types/ui'

const emit = defineEmits<{
  (e: 'clickAction', item: TableItem | null): void
  (e: 'sorting', item: SortingItem | null): void
}>()

const props = defineProps<{
  headers: AdminTableHeader[]
  items: TableItem[]
  sorting: SortingItem | null
}>()

const headerNames = computed<(keyof TableItem)[]>(() => props.headers.map((h) => h.name))
const filteredItems = computed<TableItem[]>(() =>
  props.items.filter((item) => headerNames.value.every((name) => Object.keys(item).includes(name))),
)
const processedItems = computed<string[][]>(() =>
  filteredItems.value.map((item) => headerNames.value.map((name) => item[name].toString())),
)

function clickAction(item: TableItem | null) {
  emit('clickAction', item)
}

function changeSorting(field: string, direction: DirectionSorting) {
  emit('sorting', { field, direction })
}
</script>

<style lang="scss" scoped>
.table {
  &__th {
    min-width: 250px;
  }

  &__header-title {
    text-overflow: ellipsis;
  }

  &__cell {
    gap: 10px;
  }
}

.svg-tri {
}
</style>
