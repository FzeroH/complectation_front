<template>
  <section class="full-window grid-center">
    <form class="user-login__form">
      <h1 class="text-light text-center">ИС Комплектация</h1>

      <div class="form-floating mb-2 text-dark">
        <input
          type="email"
          class="form-control"
          id="users_email"
          placeholder="E-mail"
          v-model="users_email"
        />
        <label for="users_email">E-mail</label>
      </div>

      <div class="form-floating mb-5 text-dark">
        <input
          type="password"
          class="form-control"
          id="users_password"
          placeholder="Пароль"
          v-model="users_password"
        />
        <label for="users_password">Пароль</label>
      </div>

      <footer class="d-flex justify-content-center">
        <input class="btn btn-light" type="submit" value="Войти" @click.prevent="apply" />
      </footer>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const users_password = ref('')
const users_email = ref('')

function apply() {
  userStore.authUser(users_email.value, users_password.value)
}
</script>

<style lang="scss" scoped>
.grid-center {
  display: grid;
  justify-content: center;
  align-content: center;
}

.user-login {
  &__form {
    width: 600px;
    border-radius: 5px;
    padding: 15px;
  }

  &__foot {
  }
}
</style>
