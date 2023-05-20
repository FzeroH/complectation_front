import jwtDecode from 'jwt-decode';

// Функция для проверки валидности JWT токена
export function isTokenValid (token) {
    try {
        const decodedToken = jwtDecode(token);

        // Проверяем срок действия токена
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
            return false;
        }

        // Дополнительные проверки валидности токена, если необходимо
        // Например, проверка прав доступа, проверка подписи и т.д.

        return true;
    } catch (error) {

        console.error('Invalid token:', error);
        return true;
    }
};

export default isTokenValid;
