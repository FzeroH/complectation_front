<template>
  <header
    v-if="userStore.hasUser"
    class="layout-header w-100 p-2 d-flex justify-content-between align-items-center"
  >
    <h1 class="text-light">ИС Комплектация</h1>

    <nav>
      <ul class="layout-header__list d-flex">
        <li v-for="route in allRoutes" :key="route.title" class="layout-header__item p-2">
          <RouterLink
            class="layout-header__link fw-bold link-secondary"
            :to="route.to"
            active-class="link-light"
            exact
            >{{ route.title }}</RouterLink
          >
        </li>
        <li class="layout-header__item p-2">
          <input
            type="button"
            class="layout-header__link fw-bold link-secondary"
            value="Выход"
            @click="logout"
          />
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { HeaderRoute } from '@/types'

const userStore = useUserStore()

const teacherRoutes = computed<HeaderRoute[]>(() =>
  userStore.isTeacher
    ? [
        { title: 'Список', to: '/teacher' },
        { title: 'Профиль', to: '/profile' },
      ]
    : [],
)

const librarianRoutes = computed<HeaderRoute[]>(() =>
  userStore.isLibrarian
    ? [
        { title: 'Список', to: '/librarian' },
        { title: 'Прайс-лист', to: '/price-list' },
        { title: 'Заказ', to: '/order' },
      ]
    : [],
)

const adminRoutes = computed<HeaderRoute[]>(() => (userStore.isAdmin ? [] : []))

const allRoutes = computed<HeaderRoute[]>(() => [
  ...teacherRoutes.value,
  ...librarianRoutes.value,
  ...adminRoutes.value,
])

const logout = () => {
  userStore.logout()
}
</script>

<style lang="scss" scoped>
.layout-header {
  position: sticky;
  top: 0;
  background-color: var(--dark-blue);

  &__list {
    list-style: none;
    padding: 0;
  }

  &__item {
  }

  &__link {
    text-decoration: none;
    background-color: transparent;
    border: none;
  }
}
</style>
