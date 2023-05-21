<template>
  <input type="button" value="Фильтр" class="btn btn-light" @click="open" />

  <teleport to="body">
    <section v-if="isShowing" class="modal-window d-flex justify-content-center align-items-center" @click.stop="close">
      <section @click.stop class="filter-modal p-2 bg-light">
        <h2>Фильтры</h2>
      </section>
    </section>
  </teleport>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'
import { ModalComponent } from '@/types'

const isShowing = ref(false)

function open() {
  document.querySelector('body')!.classList.add('no-scroll')
  isShowing.value = true
}

function close() {
  document.querySelector('body')!.classList.remove('no-scroll')
  isShowing.value = false
}
</script>

<style scoped lang="scss">
.filter-modal {
  width: 1000px;
  border-radius: 10px;
}

.modal-window {
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
