<template>
	<table class="table table-light table-hover table-pointer w-100 table-">
		<thead>
		  <tr>
			<th v-for="header in props.headers" scope="col" :key="header.name" :title="header.title">{{ header.title }}</th>
		  </tr>
		</thead>
		<tbody>
		  <tr v-for="(item, indexRow) in processedItems" :key="indexRow" @click="clickAction(filteredItems[indexRow].id)" class="pointer">
			<td v-for="(header, indexCol) in props.headers" :title="item[indexCol]" :key="header.name">{{ item[indexCol] }}</td>
		  </tr>
		</tbody>
	  </table>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue'
import { TableHeader, TableItem } from "@/types/ui";

const emit = defineEmits<{
	(e: 'clickAction', id: number | string): void
}>()

const props = defineProps<{
	headers: TableHeader[]
	items: TableItem[],
}>()

const headerNames = computed<(keyof TableItem)[]>(() => props.headers.map(h => h.name));
const filteredItems = computed<TableItem[]>(() => props.items.filter((item) => headerNames.value.every((name) => Object.keys(item).includes(name))))
const processedItems = computed<string[][]>(() => filteredItems.value.map(item => headerNames.value.map(name => item[name].toString())))

function clickAction(id: string | number) {
	emit('clickAction', id);
}
</script>