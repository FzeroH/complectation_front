<template>
  <div v-if="isLoading" class="loader-center">
    <custom-loader />
  </div>
  <form v-else class="price-list" ref="form" @submit.prevent="apply">
    <div class="d-flex mb-2">
      <h3>Выберите издательство:</h3>
      <custom-select
        name="company_name"
        :items="company_names"
        :selected="company_name"
        title="Издательство"
      />
    </div>
    <div class="price-list__down-file mb-3 d-flex justify-content-center align-items-center">
      <label
        for="formFile"
        class="form-label text-light pointer d-flex flex-column align-items-center"
      >
        <svg
          width="41"
          height="46"
          viewBox="0 0 41 46"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_50_368)">
            <path
              d="M19.8209 33.465C19.8642 33.513 19.9113 33.5564 19.9619 33.5944L20.0387 33.6411C20.0965 33.6826 20.1605 33.7119 20.2277 33.7273L20.3078 33.7525C20.4305 33.7796 20.5567 33.7796 20.6794 33.7525L20.7627 33.7238L20.8587 33.6914C20.8917 33.6743 20.9238 33.6551 20.9548 33.6339L21.0221 33.5908C21.0751 33.5509 21.1245 33.5051 21.1694 33.4542L29.7891 23.7942C29.8966 23.7004 29.9851 23.5819 30.0487 23.4467C30.1123 23.3116 30.1496 23.1628 30.158 23.0102C30.1665 22.8577 30.1459 22.7048 30.0977 22.5619C30.0495 22.4189 29.9747 22.2891 29.8784 22.181C29.7821 22.0729 29.6664 21.9891 29.5389 21.935C29.4115 21.8809 29.2753 21.8578 29.1393 21.8673C29.0034 21.8768 28.8707 21.9186 28.7503 21.99C28.6298 22.0613 28.5242 22.1606 28.4405 22.2813L21.4609 30.1013V1.07813C21.4609 0.792189 21.3597 0.517963 21.1795 0.315776C20.9993 0.113588 20.7549 0 20.5 0C20.2451 0 20.0007 0.113588 19.8205 0.315776C19.6403 0.517963 19.5391 0.792189 19.5391 1.07813V30.1013L12.5594 22.2813C12.3746 22.1198 12.1435 22.0398 11.9097 22.0561C11.6759 22.0724 11.4555 22.1839 11.2898 22.3698C11.1242 22.5556 11.0248 22.8029 11.0102 23.0653C10.9957 23.3276 11.0671 23.5868 11.2109 23.7942L19.8209 33.465Z"
            />
            <path
              d="M40.0391 31.625C39.7842 31.625 39.5398 31.7386 39.3596 31.9408C39.1794 32.143 39.0781 32.4172 39.0781 32.7031V40.6094C39.0781 41.4672 38.7744 42.2899 38.2338 42.8964C37.6931 43.503 36.9599 43.8438 36.1953 43.8438H4.80469C4.04012 43.8438 3.30686 43.503 2.76623 42.8964C2.2256 42.2899 1.92188 41.4672 1.92188 40.6094V32.7031C1.92188 32.4172 1.82063 32.143 1.64042 31.9408C1.46021 31.7386 1.21579 31.625 0.960938 31.625C0.706081 31.625 0.461663 31.7386 0.281452 31.9408C0.101241 32.143 0 32.4172 0 32.7031L0 40.6094C0 42.0391 0.506207 43.4102 1.40726 44.4211C2.30831 45.4321 3.53041 46 4.80469 46H36.1953C37.4696 46 38.6917 45.4321 39.5927 44.4211C40.4938 43.4102 41 42.0391 41 40.6094V32.7031C41 32.4172 40.8988 32.143 40.7185 31.9408C40.5383 31.7386 40.2939 31.625 40.0391 31.625Z"
            />
          </g>
          <defs>
            <clipPath id="clip0_50_368">
              <rect width="41" height="46" />
            </clipPath>
          </defs>
        </svg>

        <h2>Вставить файл</h2>
      </label>

      <input
        class="form-control d-none"
        type="file"
        id="formFile"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        name="file"
      />
    </div>

    <footer class="d-flex justify-content-end">
      <input type="submit" value="Загрузить" class="btn btn-light" />
    </footer>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CustomSelect from '@/ui/select/CustomSelect.vue'
import { ListItem } from '@/types/ui'
import { LibrarianApi } from '@/api'

const company_name = ref<ListItem | null>(null)
const company_names = ref<ListItem[]>([])
const isLoading = ref<boolean>(true)
const form = ref<HTMLFormElement | null>(null)

async function apply() {
  console.log('apply', new FormData(form.value!).get('file'))
  await LibrarianApi.savePriceList(new FormData(form.value!))
}

;(async () => {
  const res_company_names = await LibrarianApi.getCompanyNames()
  if (res_company_names) company_names.value = res_company_names

  isLoading.value = false
})()
</script>

<style scoped lang="scss">
.price-list {
  &__down-file {
    height: 150px;
  }
}
</style>
