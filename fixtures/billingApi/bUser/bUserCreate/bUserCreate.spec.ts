import { test, expect } from '@playwright/test';
import { bUserCreateObj } from './bUserCreate.data';
import { getAuthToken } from '../../auth/authenticate/auth.spec';

// Функция создания пользователя в биллинге
async function createBUser(request) {
  const apiUrl = 'https://dev-bil-api.briz.ua/buser';

  const token = await getAuthToken(request);
  console.log(token);
  // Отправляем POST-запрос с email и паролем
  const response = await request.post(apiUrl, {
    headers: {
      "Authorization": `Bearer ${token}`,  // Используем стандартный заголовок Authorization
      "Content-Type": "application/json",
    },
    data: bUserCreateObj,
  });

  const responseBody = await response.json();
  expect(responseBody, "Пользователь не создан").toBeDefined()
  return responseBody.data;
}

test('Проверка функции создания пользователя в биллинге', async ({ request }) => {
  const responseBody = await createBUser(request)
  try {
    expect(responseBody).toBeGreaterThan(0);
    console.log(`Пользователь ${responseBody} создан.`);
  } catch (error) {
    console.log('--- ОШИБКА: Пользователь не создан! ---');
  }
});
