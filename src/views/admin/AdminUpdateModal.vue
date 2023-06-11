<template>
  <teleport to="body">
    <section
      class="modal-window admin-modal d-flex justify-content-center align-items-center"
      @click.stop="close"
    >
      <section @click.stop class="admin-update p-2 bg-light">
        <h2>{{ props.itemTable.title }}</h2>

        <form v-if="newItem" class="admin-update__form" @submit.prevent>
          <template v-for="header in headers" :key="header.name">
            <div
              v-if="!header.list && header.type === 'string'"
              class="form-floating mb-2 text-dark"
            >
              <input
                type="text"
                class="form-control"
                :id="header.name"
                :placeholder="header.title"
                v-model="newItem[header.name]"
                :disabled="!!header.disabled"
              />
              <label :for="header.name">{{ header.title }}</label>
            </div>
            <div
              v-else-if="!header.list && header.type === 'number'"
              class="form-floating mb-2 text-dark"
            >
              <input
                type="number"
                class="form-control"
                :id="header.name"
                :placeholder="header.title"
                v-model="newItem[header.name]"
                :disabled="!!header.disabled"
              />
              <label :for="header.name">{{ header.title }}</label>
            </div>
            <custom-select
              v-else-if="header.list"
              :items="header.list"
              :title="header.title"
              :selected="newItem[header.name] === null ? null : { title: '', value: newItem[header.name]!.toString() }"
              :disabled="!!header.disabled"
              class="mb-2"
              @change="selectChange(header.name, $event)"
            />
          </template>

          <footer class="d-flex justify-content-end align-items-center">
            <input
              type="submit"
              :value="isCreating? 'Добавить' : 'Изменить'"
              class="btn btn-primary"
              :disabled="!hasUpdated"
              @click="apply"
            />
          </footer>
        </form>
      </section>
    </section>
  </teleport>
</template>

<script setup lang="ts">
import { AdminTableHeader, ListItem, TableItem } from '@/types/ui'
import { defineProps, ref, defineEmits, computed, watch } from 'vue'
import CustomSelect from '@/ui/select/CustomSelect.vue'

const props = defineProps<{
  itemTable: ListItem
  isShowing: boolean
  headers: AdminTableHeader[]
  oldItem: TableItem
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'update', item: TableItem): void
  (e: 'create', item: TableItem): void
}>()

const newItem = ref<TableItem | null>()

const isCreating = computed<boolean>(
  () => !!props.oldItem && Object.keys(props.oldItem).every((key) => !props.oldItem![key]),
)

const hasUpdated = computed<boolean>(
  () =>
    !!newItem.value &&
    ((isCreating.value &&
      props.headers.every(
        (header) =>
          !!header.disabled || !!newItem.value![header.name] || newItem.value![header.name] === 0,
      )) ||
      (!isCreating.value &&
        Object.keys(props.oldItem).some((key) => props.oldItem[key] !== newItem.value![key]))),
)

watch(
  props.oldItem,
  (newValue) => {
    if (!!newValue && (!newItem.value || newItem.value.id !== newValue.id))
      newItem.value = { ...newValue }
  },
  { immediate: true },
)

function selectChange(name: string, item: ListItem | null) {
  if (newItem.value && name in newItem.value) {
    newItem.value[name as keyof TableItem] = item === null ? item : item.value
  }
}

function close() {
  emit('close')
}

function apply() {
  if (isCreating.value && newItem.value) emit('create', newItem.value)
  else if (newItem.value) emit('update', newItem.value)
}
</script>

<style lang="scss" scoped>
.admin-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.admin-update {
  border-radius: 10px;
  min-width: 1000px;
  min-height: 300px;
  max-height: 500px;
  overflow-y: auto;

  &__form {
  }
}
</style>
