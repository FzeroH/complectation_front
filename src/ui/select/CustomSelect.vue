<template>
  <select class="custom-select form-select" aria-label="select" :disabled="!!props.disabled" @change="change">
    <option>
      {{ props.title }}
    </option>
    <option
      v-for="item in props.items"
      :key="item.value"
      :selected="item.value === props.selected?.value"
	  :value="item.value"
    >
      {{ item.title }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { ListItem } from '@/types/ui'
import { defineProps, defineEmits } from 'vue'

const emit = defineEmits<{
  (e: 'change', item: ListItem | null): void
}>()

const props = defineProps<{
  title: string;
  items: ListItem[];
  selected: ListItem | null;
  disabled?: boolean;
}>()

function change(event: any) {
  emit('change', props.items.find(item => item.value == event.target?.value) ?? null)
}
</script>

<style scoped lang="scss"></style>
