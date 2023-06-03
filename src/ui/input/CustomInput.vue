<template>
  <input :type="props.type" />
</template>

<script setup lang="ts">
import { InputType } from '@/types/ui'

const props = defineProps<{
  type: InputType
}>()
</script>

<style scoped lang="scss"></style>
