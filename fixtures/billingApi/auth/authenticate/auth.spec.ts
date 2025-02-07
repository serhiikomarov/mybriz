import { test, expect } from '@playwright/test';
import { billingUserCredentials } from './auth.data';

// Функция для получения токена авторизации в биллинге
export async function getAuthToken(request) {
  const apiUrl = 'https://dev-bil-api.briz.ua/api/authenticate';

  // Отправляем POST-запрос с email и паролем
  const response = await request.post(apiUrl, {
    data: billingUserCredentials,
  });

  const responseBody = await response.json();
  const billingAuthToken = responseBody.data.token;
  expect(billingAuthToken, "Ошибка получения токена").toBeDefined();
  return billingAuthToken;
}

test('Проверка функции получения токена авторизации в биллинге', async ({ request }) => {
  // Получаем токен с помощью вашей функции
    try {
      expect(await getAuthToken(request)).toBeDefined()
      console.log('Токен получен');
    } catch (error) {
      console.log('--- ОШИБКА: Токен не получен! ---');
    }
});
