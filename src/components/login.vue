<template>
  <div class="login">
    <h1 class="login__title">ИС Комплектация</h1>
    <div class="login__form">
      <input class="login__input" type="text" placeholder="E-mail" />
      <input class="login__input" type="password" placeholder="Пароль" />
      <button class="login__button" @click="login">Войти</button>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'Login',
  setup() {
    const router = useRouter();

    const login = () => {
      // Проверка наличия и валидности токена в localStorage
      const token = localStorage.getItem('token');
      if (token && isTokenValid(token)) {
        // Если токен есть и валиден, перенаправить на /main
        router.push('/main');
      } else {
        // В противном случае, выполнить логику аутентификации и сохранения токена
        authenticateAndSaveToken();
      }
    };

    const isTokenValid = (token) => {
      // Здесь вы можете выполнить проверку валидности токена,
      // например, проверить срок его действия и другие параметры.
      // Верните true, если токен валиден, и false в противном случае.
      // Пример:
      return true;
    };

    const authenticateAndSaveToken = () => {
      // Здесь вы можете выполнить логику аутентификации,
      // например, отправить запрос на сервер для проверки учетных данных.
      // Если аутентификация прошла успешно, сохраните токен в localStorage.
      const token = 'your_token';
      localStorage.setItem('token', token);
      router.push('/main');
    };

    return {
      login,
    };
  },
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  &__title {
    margin-bottom: 60px;
    color: white;
    font-size: 32px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    &__input {
      width: 300px;
      padding: 15px 5px;
      border-radius: 5px;
      font-size: 18px;
      outline: none;
    }
  }

  &__button {
    padding: 8px 35px;
    border-radius: 10px;
  }
}
</style>
