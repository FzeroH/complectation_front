<template>
  <header class="header" style="background-color: #363A44;" v-if="$route.path !== '/'">
    <div class="header__left">
      <router-link class="header__title" to="/main">ИС Комплектация</router-link>
    </div>
    <div class="header__right">
      <template v-if="isLibrarian">
        <router-link class="header__button" to="/add-price-list">Добавить прайс-лист</router-link>
        <router-link class="header__button" to="/order">Перейти в заказ</router-link>
      </template>
      <template v-else-if="isTeacher">
        <router-link class="header__button" to="/profie">Профиль</router-link>
      </template>
      <button class="header__button">Выход</button>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue';

export default {
  name:'header-component',
  setup() {
    const isTeacher = ref(false); // Переменная, указывающая на роль пользователя
    const isLibrarian = ref(true); // Переменная, указывающая на роль пользователя

    return {
      isTeacher,
      isLibrarian,
    };
  },
};
</script>

<style lang="scss" scoped>

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #363A44;
  color: white;

  &__left {
    margin-right: 14px;
   }

  a {
    font-size: 32px;
    margin: 20px 0;
    text-decoration: none;
    color: white;
   }

  &__right {
    display: flex;
    align-items: center;
   }

  &__button {
    margin: 0 !important;
    margin-left: 10px !important;
    padding: 6px 10px !important;
    border: none;
    border-radius: 4px;
    background-color: transparent;
    color: white;
    font-size: 15px !important;
    cursor: pointer;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
     }
  }
}

</style>
